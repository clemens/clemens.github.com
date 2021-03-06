---
title: Template languages - the easier alternative?
layout: post
permalink: /articles/2008/03/06/template-languages-the-easier-alternative
year: 2008
---

I’ve been thinking about template languages lately.

Some years ago when I was still coding PHP, I decided to give
[Smarty](http://www.smarty.net/) a try. Why? Well, it seemed to have a
nice enough syntax. And if it’s not **real** code it sure is easier for
a designer without deep knowledge of PHP to edit it, right?

Turns out that it isn’t. If you’re working with a template language you
still need to grasp basic concepts of programming, such as loops and
output formatting. As soon as your structures become a little more
complex the once beautiful syntax quickly becomes cluttered and
error-prone.

The reason why I’ve been thinking about the use of template languages is
that I’ve stumbled across [Ruby Waves](http://rubywaves.com/) - which
apparently uses [Markaby](http://markaby.rubyforge.org/) and will also
support [HAML and SASS](http://haml.hamptoncatlin.com/) pretty soon. All
three allow you to write your view templates (and CSS files) in pure
Ruby code.

Don’t get my wrong here - I like what these guys do from a programmer’s
perspective. But I don’t think it’s a really DRY approach when it comes
to work flow. The designer (that usually doesn’t know the template
language of your choice) will build their stuff in plain old HTML and
hand it over to a programmer who then converts it into Ruby code - so
basically the same work is done twice, once by the designer and once by
the programmer. And I hear there’s still people out there that like to
design their web pages using a WYSIWYG editor - that of course only
speaks HTML.

Performance is yet another concern: Template languages need to be parsed
which will slow them down eventually, especially at servers with high
traffic or older hardware.

And if this isn’t enough already, you may just ask yourself: What is
**really** the big difference between these two:

{% highlight html %}
  <h2>My Title</h2>
{% endhighlight %}
{% highlight ruby %}
  h2 "My Title"
{% endhighlight %}

It’s subtle, isn’t it?
