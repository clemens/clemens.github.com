---
title: Guide to Unobtrusive JavaScript - Part 1
layout: post
permalink: /articles/2008/05/19/guide-to-unobtrusive-javascript-part-1
year: 2008
---

This is the first of two parts in this series about Unobtrusive
JavaScript. The second part can be found
[here](http://www.railway.at/articles/2008/06/30/guide-to-unobtrusive-javascript-part-2).

Way back in March 2005 (shortly after [Jesse James Garrets giving birth
to the term
AJAX](http://www.adaptivepath.com/ideas/essays/archives/000385.php))
Rails fast probably the first framework to introduce built-in
AJAX-support: Sam Stephenson wrote the now famous
[Prototype](http://prototypejs.org/) library and together with David
included helper methods in Rails’ ActionView. Then, it was called the
JavaScriptHelper which was later refactored and split into 3 separate
helpers - **JavaScriptHelper**, **PrototypeHelper** and
**ScriptaculousHelper**. No doubt, the early and tight integration of
AJAX capabilities in the framework was one of Rails’ great USPs that
helped push it to where it’s now.

### AJAX on Rails

Roughly said, the PrototypeHelper provides you with ways to create
AJAX-backed forms, links, buttons, etc.. More specifically, it uses
basic HTML elements and adds the relevant attributes (*onclick*,
*onsubmit*, etc.) to them. In 2005, this was an acceptable way (but even
then, it wasn’t quite great) whereas nowadays it’s considered a really
bad thing to mix JavaScript in your HTML. People call it Obtrusive
JavaScript. It’s bad because, like with MVC, concerns should be
separated: HTML builds the basic page structure, CSS provides style and
layout and JavaScript adds some behavior on top of everything else.
Wherever possible, mixing these three should be avoided (a good example
for an exception from this rule would be the inclusion of
*style:“display:none;”* in some tags because some browsers don’t get it
right if it’s not an inline style). It’s also bad because it tends to
make refactoring a real nightmare (unless you’re coding very carefully -
and let’s admit it: Who really does code carefully with JavaScript?
;-)).

This article will be the first of a few to come that cover the topic how
to make your web application use the power of unobtrusive JavaScript.
It’s basically an introduction to the topic - we’ll start out simple and
more complex AJAX topics will follow in later articles. Also note that
this first part is not Rails-specific and can be applied for pretty much
every website you might develop.

### UJS4Rails and lowpro

Some people realized the problem with Rails’ inline JavaScript and did
something about it: [Dan Webb](http://www.danwebb.net/) started the
[UJS4Rails project](http://ujs4rails.com/) that provided helper methods
to use his Prototype-based library
[lowpro](http://svn.danwebb.net/external/lowpro/) in Rails. He went as
far as saying that *link_to_remote* and other remote functions that
produce inline JavaScript should be removed from the Rails core (can’t
find the link right now - does anyone have it at hand?).

However, UJS Rails turned out not to fit Dan’s plans for lowpro so it
was ditched and has now been unmaintained for quite some time. However,
lowpro is actively developed and can be used quite effectively to remove
JavaScript from HTML.

### Meet Event.addBehavior

lowpro’s key feature is a method named *addBehavior* that’s added to the
*Event* class. Let’s take a look at what an addBehavior call could look
like in your *application.js*. We’ll add a simple rollover function:

{% highlight javascript %}
Event.addBehavior({
  // expects image names to be in the following format: some_image.extension
  'img.rollover:mouseover': function(event) {
    src = this.src.split(/\./); // split main part and extension
    parts = src.first().split(/_/);
    if(parts.last() != 'over') {
      parts.push('over');
      this.src = [ parts.join('_'), src.last() ].join('.');
    }
  },
  'img.rollover:mouseout': function(event) {
    src = this.src.split(/\./); // split main part and extension
    parts = src.first().split(/_/);
    if(parts.last() == 'over') {
      parts.pop();
      this.src = [ parts.join('_'), src.last() ].join('.');
    }
  }
});
{% endhighlight %}

What this does is basically split the *src* attribute of the image tag
in multiple parts and checks whether the last part is over. This is a
little convention over configuration: When using this, I usually have
two icons, e.g. *add_product.png* and *add_product_over.png*. Two things
worth mentioning here before I show you how to use it in your HTML:

-   Inside a behavior, *this* refers to the element the event is bound
    to, in this case an image.
-   Behaviors are applied to CSS-style selectors. In the example above
    we add the rollover behavior to every image that has the CSS class
    *rollover*. The event is attached at the end after a colon and by
    leaving out the *on* (so *onsubmit* becomes *submit*, etc.). If you
    don’t specify an event, behaviors are applied to the referenced
    elements when the DOM is ready (we’ll use this in the next example
    and in later articles a lot).

To use the rollover functionality you’ll have something like the
following in your HTML:

{% highlight html %}
<img src="/images/icons/ok.png" class="rollover" />
{% endhighlight %}

Quite simple, huh? No JavaScript cluttering up your HTML - just plain
old HTML with a little CSS class definition. I’d have to lie if I told
you that this wasn’t possible without using lowpro. In fact, just with
Prototype itself you can get the same functionality with a little *less*
code:

{% highlight javascript %}
$$('img.rollover').each(function(element) {
  src = element.src.split(/\./); // split main part and extension
  parts = src.first().split(/_/);
  element.observe('mouseover', function(event) {
    if(parts.last() != 'over') {
      parts.push('over');
      element.src = [ parts.join('_'), src.last() ].join('.');
    }
  });
  element.observe('mouseout', function(event) {
    if(parts.last() == 'over') {
      parts.pop();
      element.src = [ parts.join('_'), src.last() ].join('.');
    }
  });
});
{% endhighlight %}

So why use lowpro if it makes you use *more* code instead of less? My
reason is simple: In this case (and in many others) I favor clarity over
mere brevity. The pure Prototype way - at least in my eyes - focuses on
the element whereas the lowpro approach stresses the *behavior* of the
element by adding the element to the selector itself. You’ll have to
find out for yourself which style you prefer in which case - I promise
there’ll be more than enough reasons to use lowpro in the next episode
of this series.

### Unobtrusive *and* accessible!

Anyway, let’s take at a more complex example. We want to build a fancy
form that doesn’t use labels but instead help the user by writing the
field name *inside* the text fields and text areas. Additionally, we
want to make sure that users that have JavaScript disabled can still
handle the form (ever heard of
[Accessibility](http://en.wikipedia.org/wiki/Web_Content_Accessibility_Guidelines)
and [Progressive
Enhancement](http://en.wikipedia.org/wiki/Progressive_Enhancement?) I
certainly hope so!). Let’s take a look at the JavaScript first:

{% highlight javascript %}
Event.addBehavior({
  'label.text': function(e) {
    this.hide();
  },
  'input[type=text], textarea': function(e) {
    label = this.previous('label').innerHTML;
    this.addClassName('with_label');
    (this.tagName.toLowerCase() == 'input') ? this.value = label : this.innerHTML = label;
  },
  'input[type=text]:focus, textarea:focus': function(e) {
    label = this.previous('label').innerHTML;
    if($F(this) == label) {
      this.removeClassName('with_label');
      (this.tagName.toLowerCase() == 'input') ? this.value = '' : this.innerHTML = '';
    }
  },
  'input[type=text]:blur, textarea:blur': function(e) {
    label = this.previous('label').innerHTML;
    if($F(this).blank()) {
      this.addClassName('with_label');
      (this.tagName.toLowerCase() == 'input') ? this.value = label : this.innerHTML = label;
    }
  }
});
{% endhighlight %}

Wooha - getting a little more complicated here …

Our first two code blocks don’t use an Event selector - this means they
are applied to the matching elements as soon as the *dom:loaded* fires.
First, we hide all labels with *class=“text”*. Second, we select all
text fields (note the CSS3 selector!) and text areas, read their labels,
add them as their value/innerHTML (depending on the *tagName* attribute
we decide whether it’s a text field or a text area) and add the CSS
class name *with_label*.

The last two code blocks handle the selection/deselection of text fields
and text areas. We want to make sure that user input is preserved -
that’s what the *if* clauses are for: When focused, only empty the text
field/area if the text equals the label’s text, when blurred, only
restore the label’s text if the field is blank. Moreover, we add/remove
the *with_label* class as appropriate. If you want, you could also
remove whitespaces from the fields using *strip()*.

Let’s take a look at the HTML:

{% highlight html %}
<form action="/products" method="post">
<p>
  <label class="text" for="product_name">Name</label>
  <input id="product_name" name="product[name]" size="30" type="text" />
</p>
<p>
  <label class="text" for="first_name">First name</label>
  <textarea id="product_description" name="product[description]"></textarea>
</p>
<p>
  <input id="product_submit" name="commit" type="submit" value="Create!" />
</p>
</form>
{% endhighlight %}

Not much going on here - we define a form with two items (a text field
for the product name and a text area for the description) and their
respective labels.

The interesting thing happens when you view the page in your browser: As
intended, none of the labels are there and both form fields have their
respective label value as their content. If you click on one of the
fields, it will be emptied. If you leave the field without changing its
value, the value will be reset to its label text.

The other interesting thing happens when you deactivate JavaScript in
your browser (pretty easy if you’re using Firefox with [Chris
Pederick’s](http://chrispederick.com/) great [Web Developer
Toolbar](https://addons.mozilla.org/en-US/firefox/addon/60) - just click
on Disable \>\> JavaSript \>\> All JavaScript): All of a sudden the
labels are there and the form items don’t carry their values anymore! So
deactivating JavaScript pretty much produces the output you’d expect
from the above HTML snippet: We only hid the labels and wrote their
values to their corresponding elements using JavaScript, so no
JavaScript means no action.

### Upcoming

That’s it for the first part of the series. I know the two examples I’ve
shown you don’t really show why it’s a good idea to take a good look at
lowpro. Still, I’ve used them as examples to get you familiar with the
syntax and basic ways of using lowpro. In the next part of the series
which I’ll release in a few days (it still needs some love), I’ll show
you how to use lowpro more efficiently so you’ll see how great it
actually is.

### What do you think?

Let me hear your opinions on lowpro and unobtrusive JavaScripts. I’d
also love to hear from people that use lowpro and would like to share
their experiences.
