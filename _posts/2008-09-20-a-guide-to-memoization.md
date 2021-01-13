---
title: Memo-what? - A Guide to Memoization
layout: post
permalink: /articles/2008/09/20/a-guide-to-memoization
year: 2008
---

Today, I’m going to talk about a feature that’s not all new in Rails but
it’s still got the smell of a freshly unwrapped present: Memoization.
I’d like to thank [Josh Peek](http://joshpeek.com/) from the [Rails Core
team](http://rubyonrails.com/core) for giving feedback on the article
before I published it - thanks, mate!

### It Really Just Means Caching the Result

The concept behind it is actually fairly easy to grasp: Instead of
calling the same (possibly expensive to run) method that will return the
same result over and over again, why not just store the result of the
first method call and re-use it afterwards? Ryan Bates often refers to
this as *caching the result* in his [Railscasts](http://railscasts.com).
You can also read a more general description of the memoization pattern
over at
[Reference.com](http://www.reference.com/browse/wiki/Memoization).

Let’s take a look at a simple example. We have a City class that has a
zipcode and a name. We’ll usually use both of these in our application,
so we might write a method that looks like this:

{% highlight ruby %}
def zipcode_and_name
  "#{zipcode} #{name}"
end
{% endhighlight %}

### Memoize Away!

This is perfectly valid, however, every time we call this method during
one request it always re-constructs the resulting string. So let’s
memoize the call in the classic way that you might have already stumbled
across:

{% highlight ruby %}
def zipcode_and_name
  @zipcode_and_name ||= "#{zipcode} #{name}"
end
{% endhighlight %}

The \|\|= operator is a so-called conditional assignment that only
assigns the value on its right to the variable on its left if the
variable is not *true*. Since pretty much everything in Ruby evaluates
to *true* when coerced into a boolean (except *nil* and, of course,
*false*, as well as a couple of other things) this is exactly what we
want: The first call returns the actual string and from the second time
on, no matter how often the method is called on the same object, the
“cached” result will be used.

A little note on naming here: Some people seem to prefer prefixing the
memoizing variable’s name with an underscore to indicate that it’s not
meant to be used as an actual instance variable. To be honest, I don’t
think this is really necessary unless you define a whole bunch of
instance variables and memoized variables.

### Memoizable - The Macro-Style Way of Doing Memoziation

On July 15, 2008 Josh Peek [added the Memoizable module to Rails
core](http://github.com/rails/rails/commit/8a9934a9d9fc98b56c4566ae2e3fd4d83e505d3e).
Originally, this was only meant to be used internally in Rails to
prevent some annoying errors when manually memoizing methods in frozen
objects. Here’s how Josh Peek explains the reasons for including the
Memoizable module:

<blockquote style="font-style:italic; font-weight:normal;">
<p>

The initial motivation was to fix an issue with freezing memoizable
methods. If you do it the old way, and freeze the object before calling
the method first, the method will complain that it can’t modify the
instance var. The fix was to call all the memoized methods on freeze.

</p>
<p>

I found this pattern really useful for creating a class that could be
lazy loaded or eager loaded. So you write your classes up in a lazy load
stye, memoize the methods with the helper, and - if you need to eager
load - use freeze to transition the object to a final fully cached
state. I’m not sure if this is for everyone, but its been really useful
internal in Rails.

</p>
</blockquote>

Although it was meant for internal purposes, the inclusion of this
module initially [kick-started some discussion as to whether the
responsibilities for memoization should be taken away from the
programmer](http://ryandaigle.com/articles/2008/7/16/what-s-new-in-edge-rails-memoization)
by putting it in a module. However, Josh decided to take some of the
proposals and include them in the Rails core, so now all it does is
abstract the functionality in a - in my opinion - really clean way.

To cut a long story short, here’s the example we used earlier, rewritten
to use the Memoizable API:

{% highlight ruby %}
# somewhere inside the class
extend ActiveSupport::Memoizable

def zipcode_and_name
  "#{zipcode} #{name}"
end
memoize :zipcode_and_name
{% endhighlight %}

The *memoize* macro method then takes care of caching the method call
result and retrieving it as necessary.

Part of the initial criticism also where that there was no way to force
the cached result to be reloaded and that *memoize* wouldn’t work with
methods that accepted parameters. Both of these issues have been fixed
later - so methods with parameters can now be memoized as well:

{% highlight ruby %}
def some_method(*args)
  # some calculations
end
memoize :some_method
{% endhighlight %}

This roughly equals the following code (and is actually pretty much how
the Memoizable module handles it internally):

{% highlight ruby %}
def some_method(*args)
  @some_method ||= {}
  @some_method[args] ||= (
    # some calculation
  )
end
{% endhighlight %}

What happens here is that the cache is a hash instead of a mere scalar
and the hash is indexed by the parameters that are passed to the method.
So if I call a method twice with the same parameters, I’ll get the
cached result on the second call.

Reloading a cached result is pretty easy, too:

<code>object.some_memoized_method(:reload) \# or, less self-explanatory:
object.some_memoized_method(true)</code>

### Beware of the Dynamics!

I can already feel people finishing reading this article and then going
back to their code and doing something like this to their User class:

{% highlight ruby %}
def age
  today = Date.today
  today.year - birth_date.year + (today.month - birth_date.month + ((today.day - birth_date.day) < 0 ? -1 : 0) < 0 ? -1 : 0)
end
memoize :age
{% endhighlight %}

This may seem okay but imagine running this method one second before
midnight on the day before a user’s birthday: The memoized value will be
returned even if the process runs longer than midnight (two seconds,
say) and it’s already their birthday!

The point of this certainly simple example is as follows: If a method
uses data that is inherently dynamic, such as the current date/time,
random numbers, lambdas/procs and the like, it’s not really a good fit
for memoization. On the contrary - it might even lead to all kinds of
weird behavior and bugs!

### Tips and Tricks

Here are some tips and tricks that didn’t seem to fit anywhere else in
the article.

#### Memoizing Class Methods

Since *memoize* is already a class method, if you want to memoize a
class method, you have to put the *memoize* call in the class’
metaclass:

{% highlight ruby %}
def self.a_class_method
  # some code
end
class << self; extend ActiveSupport::Memoizable; self; end.memoize :a_class_method
{% endhighlight %}

As you can see, this is not really clean - so here’s a better way:

{% highlight ruby %}
class << self
  extend ActiveSupport::Memoizable

  def a_class_method
    # some code
  end
  memoize :a_class_method
end
{% endhighlight %}

Way better!

A little hint if you want to use the “old style” for memoizing class
methods: You have to use instance variables (with one \\@ rather than
two) to cache the results! This is because inside the context of a class
method the instance is the class itself rather than the instance. If you
don’t get what I’m talking about, you might want to check out [Dave
Thomas’](http://pragdave.pragprog.com) screencast series on [Ruby
Metaprogramming](http://www.pragprog.com/screencasts/v-dtrubyom/the-ruby-object-model-and-metaprogramming).

#### Enable Memoization For All Active Records

If you want to use memoize in a lot of your ActiveRecord models, you
might think about extending the Memoizable module inside
ActiveRecord::Base:

{% highlight ruby %}
# for memoizing instance methods:
ActiveRecord::Base.extend(ActiveSupport::Memoizable)

# for memoizing class methods:
ActiveRecord::Base.class_eval { class << self; extend ActiveSupport::Memoizable; end }
{% endhighlight %}

This way, every descendant of ActiveRecord (i.e. all of your models)
will be able to call *memoize* without having to extend the module
first.

#### Return Values Are Frozen!

There’s one more thing that tends to creates both, confusion and
controversy: Return values of memoized methods are
[frozen](http://ruby-doc.org/core/classes/Object.html#M000354) - which
basically means you can’t modify the return object itself but rather
have to dup it first. As Josh stated in the quote above, the freezing
problems where the reason behind the Memoizable module - so I guess,
frozen return values are a trade-off that we have to just accept.

#### When Should You Use *memoize* and When Should You Just Stick to the Classic Style?

You might also ask yourself how to decide when you should use *memoize*
and when to stick to the “old way” of storing the result in an instance
variable yourself. So here’s my rule of thumb: If you may need to reload
the cached result during a request, you might want to use *memoize*
because it offers a simple way for reloading - it’s way harder to
implement that yourself! Otherwise, I tend to look at the complexity of
the method: If the method is a simple one- or two-liner, I use the
classic style - if it involves more complex logic, I prefer *memoize*.

### What Do You Think?

I hope this article comes in handy for some of you who haven’t heard of
memoization yet or who just didn’t really understand what’s going on
there. As always, I’m looking forward to reading your comments - also,
feel free to ask questions if something remained unclear!
