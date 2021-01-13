---
title: Guide to Unobtrusive JavaScript - Part 2
layout: post
permalink: /articles/2008/06/30/guide-to-unobtrusive-javascript-part-2
year: 2008
---

This is part 2 of my Guide to Unobtrusive JavaScript. It’s been over a
month since I published the [first
part](http://www.railway.at/articles/2008/05/19/guide-to-unobtrusive-javascript-part-1)
of the Guide to Unobtrusive JavaScript. As you can see from the date of
this article (btw. why does Typo show the article’s creation date
instead of its publication date? If anyone knows, drop me a line - I’d
appreciate it), riginally, I wanted to publish the second article just a
few days after the first but - as usual - projects got in the way. So
here it finally is. I hope the quality makes up for the delay. Sorry
again for keeping you waiting.

If you haven’t read part 1 and aren’t familiar with the term Unobtrusive
JavaScript and/or the basics of [Dan Webb’s](http://www.danwebb.net/)
[lowpro](http://www.danwebb.net/lowpro), I strongly recommend reading
part 1 before going on with this part.

### Taking it further - lowpro behaviors

Let’s re-visit the rollover example from part 1. We wanted to have a
simple rollover effect for all our images with the CSS class *rollover*.
Just for fun, I’ll start at the end and show you the code that results
from using a behavior before we implement the actual behavior:

{% highlight javascript %}
Event.addBehavior({ 
// expects image names to be in the following format: some_image.extension 
  'img.rollover': Rollover
});
{% endhighlight %}

Wow - we’ve compressed 20 lines compressed into a single line of code.
And it’s even more declarative than before! But of course this doesn’t
come for free - we still need to define the behavior ourselves:

{% highlight javascript %}
Rollover = Behavior.create({
  initialize: function() {
    this.split_src = this.element.src.split(/\./);
    this.parts = this.split_src.first().split(/_/); // split main part and extension
    this.extension = this.split_src.last();
  },
  onmouseover: function(e) {
    if(this.parts.last() != 'over') {
      this.parts.push('over');
      this.element.src = [ this.parts.join('_'), this.extension ].join('.');
    }
  },
  onmouseout: function(e) {
    if(this.parts.last() == 'over') {
      this.parts.pop();
      this.element.src = [ this.parts.join('_'), this.extension ].join('.');
    }
  }
});
{% endhighlight %}

Most of the code still looks the same as in part 1 but now we’ve
encapsulated the behavior into a separate behavioral class - which is
great, from an OO point of view. Every element on the page that suffices
the conditions (i.e. it is an image with class *rollover*) will
instantiate its own Rollover object that handles its events
(*onmouseover* and *onmouseout*).

Taking a closer look at the Rollover class, you’ll notice that there is
an *initialize* method that we haven’t had before. As usual in
Prototype, this is the constructor: It takes responsibility for setting
up a basic Rollover object. In this case, it initializes the *parts*
array and the extension for further use in the actual behavioral
methods.

We can go further and apply a namespacing strategy to keep our behaviors
neatly ordered: Just rename Rollover to Image.Rollover to be more
explicit.

For practice, let’s also rewrite the labeled form example from the first
article to be a behavior.

**NOTE: I had a little error in the code of the first part. I set the
value correctly (using .value for textfields and .innerHTML for
textareas) but when reading the values I only used the .value version.
This has been corrected for this article to use the $F utility method.
I’ve also internalized the hiding of the associated label.**

{% highlight javascript %}
Form.WithInlineLabels = Behavior.create({
  initialize: function() {
    this.label = this.element.previous('label');
    this.label.hide();

    this.labelText = this.label.innerHTML;
    this.element.tagName == 'TEXTAREA' ? this.element.innerHTML = this.labelText : this.element.value = this.labelText;
    this.element.addClassName('with_label');
  },
  onfocus: function(e) {
    if($F(this.element) == this.labelText) {
      this.element.removeClassName('with_label');
      this.element.tagName == 'TEXTAREA' ? this.element.innerHTML = '' : this.element.value = '';
    }
  },
  onblur: function(e) {
    if($F(this.element).blank()) {
      this.element.addClassName('with_label');
      this.element.tagName == 'TEXTAREA' ? this.element.innerHTML = this.labelText : this.element.value = this.labelText;
    }
  }
});
{% endhighlight %}

Yet again, this makes the call in *Event.addBehavior* dead easy:

{% highlight javascript %}
Event.addBehavior({ 
  // makes all textfields and textareas use inline labels
  'input[type=text], textarea': Form.WithInlineLabels
});
{% endhighlight %}

### Don’t rewrite - reuse!

So what’s the advantage of using this approach apart from saving a few
lines of code and making the body of *Event.addBehavior* way more
declarative and concise? Well, a behavior is a set of definition how a
certain element reacts to given events (e.g. when hovered with the
mouse, when clicked, etc.). So each behavior object encapsulates
functionality - and in OOP, encapsulated functionality usually means
that the functionality is reusable and maintainable.

It’s like that for lowpro behaviors: You can easily re-use the behavior
in other projects. Just put all your behaviors in a separate JavaScript
file. After that, you could have a setup like the following:

{% highlight html %}
<script src="/javascripts/prototype.js" type="text/javascript"></script>
<script src="/javascripts/lowpro.js" type="text/javascript"></script>
<script src="/javascripts/behaviors.js" type="text/javascript"></script>
<script src="/javascripts/application.js" type="text/javascript"></script>
{% endhighlight %}

*behaviors.js* keeps a collection of all your behavioral classes (you
could even split it into multiple files once you’ve defined a bunch of
behaviors that are related) and *application.js* connects them to DOM
elements using *Event.addBehavior*. Great and clean separation of
concerns!

If you find that you’ve created lots of behaviors, you can even split
them further and have *behaviors.image.js*, *behaviors.form.js* etc.

### Making it more dynamic - passing in arguments

Let’s look at an example where we extend our existing behavior because
this also gives us the opportunity of looking at the possibility to pass
in arguments to a behavior to make it a little more dynamic. Take a look
at the form with inline labels again and assume that you want some forms
to not hide the labels but instead show them together with the inline
labels.

{% highlight javascript %}
Form.WithInlineLabels = Behavior.create({
  initialize: function(options) {
    this.options = options || {};

    this.label = this.element.previous('label');

    if(!this.options["showLabels"]) {
      this.label.hide();
    }

    this.labelText = this.label.innerHTML;
    this.element.tagName == 'TEXTAREA' ? this.element.innerHTML = this.labelText : this.element.value = this.labelText;
    this.element.addClassName('with_label');
  },
  // ... onfocus and onblur definitions
});
{% endhighlight %}

Now the behavior takes an optional hash named *options* as a parameter.
Now we can use both variants, with and without labels (default is, of
course, without labels):

{% highlight javascript %}
Event.addBehavior({
  'form.withLabels input[type=text], form.withLabels textarea': Form.WithInlineLabels({ showLabels: true }),
  'form.withoutLabels input[type=text], form.withoutLabels textarea': Form.WithInlineLabels
});
{% endhighlight %}

Why did I use an options hash instead of just using a simple parameter?
After all, we’re only passing in one argument, right? Well, for now,
yes, there’s only one option: *showLabels*. But we don’t know what we
might add in the future: There might be other options as well and there
might be bugfixes. If we change methods without being careful, we might
break backwards compatibility - and if we do, we might have to hack our
bugfixes in if we want/need to use them. Wouldn’t it be nice if we could
just drop the behavior in an replace the old, buggy one?

Turns out that hashes are a great way to do that. If you had deployed
the first version of the behavior (the one without the *showLabels*
option) and then later added the new option to it (and maybe some
bugfixes), you could easily replace the old behavior. Why? Because
nothing changes for the existing code: The behavior can still be used
without a parameter and it defaults to the old behavior! If you make
sure that you’re backwards compatible, anytime you find that you need
new options or if you discover a bug, you can just go in, fix it and
deploy it to all your existing projects. Now that’s really cool!

And by the way: This is how most cool frameworks in pretty much every
programming language handle it, so it’s pretty much become some kind of
best practice. Think of Ajax.Request in Prototype, for example: It takes
the URL of the request as its first parameter (this makes sense - there
absolutely **needs** to be a URL - otherwise there’s not going to be a
request!) and all its options as its second parameter. If Sam Stephenson
decided that the class needs more options, he can just add them without
breaking existing installations.

### Pre-defined behaviors

Writing your own behaviors isn’t actually the only option. lowpro
actually ships with a couple of useful AJAX behaviors: *Remote.Link*,
*Remote.Form*, *Remote* and *Observed*. You can find some additional
(partly non-AJAX) behaviors in [Dan’s SVN
repository](http://svn.danwebb.net/external/lowpro/trunk/behaviours/).
Right now, only the DateSelector, Calendar and the drag&drop behaviors
are implemented. I also have to admit that I haven’t tested these yet,
so I don’t know whether they work correctly or not!

I’d give you an example of using *Remote.Link* but there’s already a
great example out there written by [Matt
Aimonetti](http://railsontherun.com/): In his article [AJAX pagination
in less than 5
minutes](http://railsontherun.com/2007/9/27/ajax-pagination-in-less-than-5-minutes)
he shows how to use the great [will_paginate
plugin](http://rock.errtheblog.com/will_paginate) with AJAX.

Speaking of AJAX: If your application relies heavily on AJAX, you’ll
find that quite often you add or modify elements of your page. Now
imagine, you add content to the DOM that contains one or more images
with class *rollover*. Since lowpro adds behaviors when the *dom:ready*
event fires, the behaviors won’t get attached to elements that are added
afterwards. Of course, Dan realized that and provided you with an option
to ensure that behaviors are assigned properly after AJAX requests:

{% highlight javascript %}
Event.addBehavior.reassignAfterAjax = true;
{% endhighlight %}

This triggers an additional *onComplete* handler for AJAX responders
that lowpro defined. When triggered, it reloads the behaviors and
reassigns them to the matching elements. This way, the behaviors you
define are applied to each and every element that shows up on the page -
either right from the start or after some AJAX requests.

One more thing while we’re talking about pre-defined behaviors. I
haven’t talked about extending existing behaviors by subclassing them.
If you take a look at the lowpro source you’ll find the following
implementation of the Remote behaviors:

{% highlight javascript %}
Remote.Base = {
  // code
}

Remote.Link = Behavior.create(Remote.Base, {
  // code
});

Remote.Form = Behavior.create(Remote.Base, {
  // code
});
{% endhighlight %}

I’ve left out the code for the sake of brevity.

What you can see here is that the *Remote.Link* and the *Remote.Form*
behavior both extend the behavior of *Remote.Base*. This behaves quite
similarly to Prototype’s *Class.create* - it’s just plain old
subclassing that you’ll find in every object-oriented language. Since I
assume that you understand the basics of OOP I won’t go into detail
here.

### Resumé

lowpro gives you the ability to easily define and apply behaviors for
given elements on the page. Compared to the approach of the first
article, this gives you not only a clear separation of concerns (i.e.
HTML for structure, CSS for design, JavaScript for functionality -
without them cluttering up each other) but also clearly encapsulates
functionality and makes it reusable and easily maintainable. If you
discover a bug or a browser incompatibility (mind you, IE8 is under way
…) you can just go in an fix the bug in one place (i.e. the behavior
class) and deploy the new behaviors for all your projects. Ideally, you
don’t even have to modify anything else - now that’s great, isn’t it?!

Finally, here are a few suggestions about using lowpro:

-   The first rule is easy: Whenever you’re defining how an element
    should react to certain events, use lowpro. It makes your code more
    maintainable and gives you a clear separation of concerns.
-   If you feel that you’re defining a behavior that you might in future
    projects, externalize it in a behavior class. After that, it’s best
    to put it in an extra JavaScript file (e.g. behaviors.js) to make it
    easier to use for other projects.
-   When defining behaviors, try to be as general as possible. It’s
    absolutely okay to make a few assumptions about page structure and
    CSS (remember: Convention over Configuration) but general
    applicability is what sets a really good behavior apart.
-   If you need to configure your behavior objects, use parameters. If
    there’s one or two arguments that your behavior absolutely needs
    (like Ajax.Request needs a URL), use scalars - otherwise use an
    options hash. If you want to ensure backwards compatibility, don’t
    ever change the method signature - only add new parameters at the
    end and make them optional.

### Resources

Some links that might be of interest for you:

-   [Jarkko Laine’s first post about moving from Rails AJAX helpers to
    lowpro](http://jlaine.net/2007/8/3/from-rails-ajax-helpers-to-low-pro-part-i)
-   [Jarkko Laine’s second post about moving from Rails AJAX helpers to
    lowpro](http://jlaine.net/2007/8/6/from-rails-ajax-helpers-to-low-pro-part-2)
-   [Dan Webb’s posts about lowpro](http://www.danwebb.net/lowpro)
-   [The lowpro Google Group](http://groups.google.co.uk/group/low-pro)
-   [Matt Aimonetti’s article on how to build AJAX-enabled pagination
    using
    lowpro](http://railsontherun.com/2007/9/27/ajax-pagination-in-less-than-5-minutes)

### What do you think?

As usual, I’d love to hear your comments and suggestions. Also, feel
free to ask any questions related to lowpro or JavaScript in general.
I’ll do my best to answer them if I find the time.
