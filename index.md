---
layout: default
title: Home
---

<div id="latest_posts" class="content_box span-16">
<div class="content_wrapper">
<h2>

Latest posts

</h2>
<ul>

{% for post in site.posts limit:5 %}

<li>

<span>{{ post.date | date: "%d.%m.%Y" }}</span> »
<a href="{{ post.url }}">{{ post.title }}</a>

</li>

{% endfor %}

</ul>
<p style="margin-top:1em;">

You can read all posts in my <a href="/blog">blog</a> or subscribe to the <a href="/articles.atom">Atom Feed</a>.

</p>

</div>
</div>

<div id="note" class="content_box span-8 last">
  <div class="content_wrapper">
    <h2>Important note</h2>
    <p>As you might have noticed, I haven't updated this website in quite a while. My CV/main website is now at <a href="https://clemenskofler.com">https://clemenskofler.com</a>. I'm keeping this website up more for archiving purposes – so please don't expect any updates.</p>
  </div>
</div>

<div id="about" class="content_box span-12">
<div class="content_wrapper">
<h2>

About

</h2>
<p>

<b>railway</b> is me, Clemens Kofler, a web developer currently based in
Innsbruck, Austria.  
I’ve specialized in developing web applications with Ruby on Rails since
2006 and doing consulting in that area but I also offer some other web
development-related services.

</p>
<p style="margin-top:1em;">

Read more <a href="/about">about me</a> and check out <a href="/services">services I offer</a> and my <a href="/rates">rates</a>. You can also take a look at <a href="/portfolio">my portfolio</a> and read what <a href="/praise">others are saying about me and my work</a>.

</p>

</div>
</div>
<div id="github" class="content_box span-12 last">
<div class="content_wrapper">
<h2>

Github

</h2>
<p>

You can find code I’ve authored, co-authored or regularly contributed to
on Github:

</p>
<ul class="bullets">
  <li>
    <a href="http://github.com/svenfuchs/adva_cms">adva_cms</a> (core developer)
  </li>
  <li>
    <a href="http://github.com/svenfuchs/steam">Steam</a> (co-author)
  </li>
  <li>
    <a href="http://github.com/svenfuchs/i18n">Ruby i18n</a> (core committer)
  </li>
  <li>
    <a href="http://github.com/clemens/later_dude">LaterDude</a> (author)
  </li>
  <li>
    <a href="http://github.com/clemens/delocalize">delocalize</a> (author)
  </li>
</ul>
<p>

… and <a href="http://github.com/clemens">others</a>.</p>

</div>
</div>
<div id="archive" class="content_box span-24">
<div class="content_wrapper">
<h2>

Archive

</h2>

<h3>2013</h3>

<ul>
  {% for post in site.posts %}  
    {% if post.year == 2013 %}
      <li><span>{{ post.date | date: "%d.%m." }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>

<h3>2012</h3>

<ul>
  {% for post in site.posts %}  
    {% if post.year == 2012 %}
      <li><span>{{ post.date | date: "%d.%m." }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>

<h3>2011</h3>

<ul>
  {% for post in site.posts %}  
    {% if post.year == 2011 %}
      <li><span>{{ post.date | date: "%d.%m." }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>

<h3>2010</h3>

<ul>
  {% for post in site.posts %}  
    {% if post.year == 2010 %}
      <li><span>{{ post.date | date: "%d.%m." }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>

<h3>2009</h3>

<ul>
  {% for post in site.posts %}  
    {% if post.year == 2009 %}
      <li><span>{{ post.date | date: "%d.%m." }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>

<h3>2008</h3>

<ul>
  {% for post in site.posts %}  
    {% if post.year == 2008 %}
      <li><span>{{ post.date | date: "%d.%m." }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>

</div>
</div>
