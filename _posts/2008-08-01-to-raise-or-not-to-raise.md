---
title: To Raise or Not To Raise
layout: post
permalink: /articles/2008/08/01/to-raise-or-not-to-raise
year: 2008
---

Disclaimer: I’ve taken the [Rails i18n
implementation](http://rails-i18n.org/) because I’ve worked with it
lately and because I think it serves as a good case study here.
Personally, I think that all the guys have done a great work in
realizing this i18n interface and with this article I don’t want to
attack them in any way. You may want to read Sven Fuchs’ [writeup on the
Rails i18n
features](http://www.artweb-design.de/2008/7/18/the-ruby-on-rails-i18n-core-api)
first in order to better understand some parts of the article.

### The Stumbling Block

A few days ago when I tried to implement the i18n functionality for
Rails’ Date and Time classes I stumbled across an interesting part in
the i18n source or, to be more specific, in the [simple
backend’s](http://github.com/svenfuchs/i18n/tree/master/lib/i18n/backend/simple.rb)
*localize* method:

{% highlight ruby %}
def localize(locale, object, format = :default)
  raise ArgumentError, "Object must be a Date, DateTime or Time object. #{object.inspect} given." unless object.respond_to?(:strftime)
  
  type = object.respond_to?(:sec) ? 'time' : 'date'
  formats = translate(locale, :"#{type}.formats")
  format = formats[format.to_sym] if formats && formats[format.to_sym]
  # TODO raise exception unless format found?
  format = format.to_s.dup

  format.gsub!(/%a/, translate(locale, :"date.abbr_day_names")[object.wday])
  format.gsub!(/%A/, translate(locale, :"date.day_names")[object.wday])
  format.gsub!(/%b/, translate(locale, :"date.abbr_month_names")[object.mon])
  format.gsub!(/%B/, translate(locale, :"date.month_names")[object.mon])
  format.gsub!(/%p/, translate(locale, :"time.#{object.hour < 12 ? :am : :pm}")) if object.respond_to? :hour
  object.strftime(format)
end
{% endhighlight %}

What this code does is basically take a format, look it up in the
dictionaries and use it as a format string for *strftime*. If it can’t
find the format it will just convert the format parameter to a string
and then use it in *strftime* directly.

Notice the comment! It’s basically a note from one developer to the
other developers where they ask whether or not they should raise an
[exception](http://en.wikipedia.org/wiki/Exception_handling) if the
format can’t be translated. And well, they should!

### Why and When Raise Exceptions?

Over the years I’ve come up with a little rule of thumb for exceptions:

**Libraries Should Raise, Applications Should Not Raise.**

Yes, it’s as simple as that. To understand the reasons for my rule of
thumb, we have to switch to the world of compiled programming languages
for a second.

Lots of libraries in C/C/Java/etc. come to you as [compiled
source](http://en.wikipedia.org/wiki/Compiler) which basically means you
can’t just look at the implementation and figure out what the code does
and how it behaves in different situations. This, on the one hand,
forces library developers to write good documentation for their code
and, on the other hand, also means they must provide sensible error
handling since the developer can’t just - like in Ruby - re-open a class
and change a method according to their needs.

Ask yourself a little question: If you pour water in [a glass that’s
already
full](http://en.wikipedia.org/wiki/Is_the_glass_half_empty_or_half_full),
would you expect the glass to react to that all by itself or would you
rather take it into your own hands and stop pouring or maybe empty the
glass (you don’t like what’s in it anyway)?

In other words: The tool should not decide about error handling but
instead delegate it to its user. At the moment of its inception, a
programmer basically just can’t know how it’s going to be used and thus
can’t make decisions about how errors should be handled.

Plus, the programmer of the library should apply the principle of least
surprise: If I, as a user of the library, throw in an invalid value
(i.e. a value that can’t be found in the dictionary), I don’t
automatically expect that my value is just pushed into *strftime* no
matter what.

### Dynamic Typing and Error Handling

How do you actually define what’s valid or invalid for a given
parameter?

Well, as long as you work with only one type of values, it’s usually
pretty straightforward. Imagine a car with a pre-defined maximum speed
and a setter for its current speed. If the setter is invoked with a
speed that exceeds the defined maximum speed it is invalid and it can
trigger error handling like setting the current speed to the maximum
speed instead of raising an exception.

However, if you allow a parameter to have different types, things get a
little more complicated in a dynamically typed language like Ruby. Where
you would have interfaces and polymorphic methods in Java to ensure that
all types are handled correctly, you need a full blown control structure
in Ruby:

{% highlight ruby %}
def method(param)
  case param
  when Symbol
    # do some symbol specific things
  when String
    # do some string specific things
  # etc.
  end
end
{% endhighlight %}

With lots of different options, this quickly gets a bit bloated but it’s
a thing we accept because we get added flexibility that comes with
dynamic typing.

The real challenge in this case is to conceive error handling that
**works**. Where in Java each polymorphic method usually has its own
validation rules, we’d have to throw them inside the code blocks in
Ruby.

{% highlight ruby %}
def method(param)
  case param
  when Symbol
    raise ArgumentError, ":default is not a valid option" if param == :default
    # do some symbol specific things
  when String
    raise ArgumentError, "param is too long - use max. 5 characters" if param.strip.length > 5
    # do some string specific things
  # etc.
  end
end
{% endhighlight %}

Sidenote: Premshree Pillai has written a very good [Introduction to
Static and Dynamic
Typing](http://www.sitepoint.com/article/typing-versus-dynamic-typing)
over at SitePoint, so check it out if you want.

### Apply it to Some Real Code

To cut a long story a little shorter, let’s take a look at why I don’t
like the current implementation of Simple\#localize. Here’s the code
that I’d need to write in order to support both, Rails’ existing
behavior and i18n capabilities:

{% highlight ruby %}
def to_formatted_s(format = :default)
  return DATE_FORMATS[format].respond_to?(:call) ? DATE_FORMATS[format].call(self).to_s : strftime(DATE_FORMATS[format]) if DATE_FORMATS.keys.include?(format)

  type = self.respond_to?(:sec) ? 'time' : 'date' # could be TimeWithZone so I need to even check that in date
  # neet to check first if the format is defined - if not, fall back to default to_s
  I18n.translate(:"#{type}.formats") ? I18n.localize(self, format) : to_default_s
end
{% endhighlight %}

To shortly explain the flow: Rails looks up standard formats in its
*DATE_FORMATS* constant first. If it can find it it either calls it if
it’s a proc or uses the format as a format string for *strftime*. If it
can’t find the format in the constant it does localization. The
*I18n.translate* is necessary because *localize* doesn’t raise an
exception if it can’t find the supplied format but instead uses it as a
string for *strftime*. We can’t have that since Rails falls back to
*to_default_s* if it can’t find the format.

Here’s what it would look like if *localize* raised an exception if it
can’t find a format:

{% highlight ruby %}
def to_formatted_s(format = :default)
  # fall back to default to_s if localize raises an exception
  DATE_FORMATS.keys.include?(format) ? strftime(DATE_FORMATS[format]) : I18n.localize(self, format) rescue to_default_s
end
{% endhighlight %}

Here’s the implementation for *localize* that I’ve [proposed to the i18n
team](http://groups.google.com/group/rails-i18n/browse_thread/thread/7b042fffe6b40e3d):

{% highlight ruby %}
def localize(locale, object, format = :default)
  raise ArgumentError, "Object must be a Date, DateTime or Time object. #{object.inspect} given." unless object.respond_to?(:strftime)
 
  format = case format
  when Symbol
    type = object.respond_to?(:sec) ? 'time' : 'date'
    translate(locale, :"#{type}.formats.#{format}") # raises I18n::MissingTranslationData if format isn't found
  when Proc
    # allows for something like :long_ordinal => lambda { |date| "%B #{date.day.ordinalize}, %Y" }, # => "April 25th, 2007"
    # similar to current Rails functionality, see ActiveSupport::CoreExtensions::Date
    format.call(object)
  else
    format
  end.to_s
  
  format.gsub!(/%a/, translate(locale, :"date.abbr_day_names")[object.wday])
  format.gsub!(/%A/, translate(locale, :"date.day_names")[object.wday])
  format.gsub!(/%b/, translate(locale, :"date.abbr_month_names")[object.mon])
  format.gsub!(/%B/, translate(locale, :"date.month_names")[object.mon])
  format.gsub!(/%p/, translate(locale, :"time.#{object.hour < 12 ? :am : :pm}")) if object.respond_to? :hour
  object.strftime(format)
end
{% endhighlight %}

What happens here, exception-wise? First of all, I kept the
*ArgumentError* that is raised if the object that is passed in doesn’t
respond to *strftime*.

The code then makes an assumption about the value of *format* that is
pretty common in Rails and also Ruby: If it’s a Symbol it’s most likely
some kind of Hash key - therefore we try to look it up in our
translations. If it can’t find the translation, the *translate* method
correctly raises an exception which is passed back to the caller - in
this case the *to_formatted_s* method in the Date/Time classes.

The second option is to use a Proc - also fairly common in both Rails
and Ruby itself - to evaluate a closure.

Finally, the default behavior is just to return the format parameter
converted to a String (notice the *to_s* at the end). Both options rely
on Ruby’s internal error handling so if an error is raised it will -
again - be passed back to the caller.

We’ve also opened the possibility to add other options later in the game
so we could, say, treat an Array differently.

In short, we’ve basically set up a copule of rules for any programmer
who wants to use the library:

-   You can pass in any parameter as an object as long as it has a
    *strftime* method.
-   The type of format you pass in affects how it’s going to be handled
    by the library.
-   We delegate all error handling to y so you, yourself, are
    responsible for handling all errors.

So now whoever uses the library can again decide whether they want to
re-raise the error or provide a sensible default behavior - like Rails
does by falling back to the original *to_s* method.

### Why Applications Should Not Raise

Now that I’ve explained why I think that libraries **should** raise it’s
time to explain why application code should **not** raise.

First, let me explain what I mean by application code. Roughly speaking,
everything that you write yourself and (usually) exclusively for one
application is what I consider application code. So your models,
controllers and views are application code. Some stuff in the *lib*
folder, although considered a library, might be application code, too.
Even some plugins might be considered application code: Rick Olson’s
popular restful_authentication plugin, for example, generates a user
model and some other stuff for you that sits directly in your
application and can - and usually even *should* - be changed.

I’ve seen some code lately that raises a comparatively high amount of
application code exceptions. I think this is due to the [rescue_from
method that was added to Rails core in September
2007](http://ryandaigle.com/articles/2007/9/24/what-s-new-in-edge-rails-better-exception-handling)
because it makes it really easy to unify error handling.

Do I think that this is a valid approach for handling errors? Yes,
absolutely. Do I think that it’s the *best* approach? **Absolutely
not**.

While it may [DRY up your code](http://en.wikipedia.org/wiki/DRY) it
usually also obfuscates it. If you look at code that raises an exception
and the handling of the exception is handled somewhere else you’ll
either have to think how you implemented the error handling or even look
at the code again.

While this is perfectly acceptable and even *natural* for libraries
because they don’t know anything about the code that’s going to use it,
it feels awkward in application code. When you write application code
that can potentially cause errors you already *know* how these errors
are going to be handled which - by my definition - is a clear case
against raising an exception.

Don’t get me wrong - I think DRY is a hell of a good rule. However, when
it comes to handling application code errors [DAMP code is just a lot
more readable and
meaningful](http://blog.jayfields.com/2006/05/dry-code-damp-dsls.html).

### What Do You Think?

I’ve told you about my opinions and my rule of thumb so now it’s time
that you tell me about your experience with exceptions. Do you
always/never raise exceptions? Is it merely a question of style or is it
important to raise exceptions, especially in libraries that other people
are going to use?

I look forward to hearing from you!
