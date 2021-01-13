---
title: Three recurring challenges in web development
layout: post
permalink: /articles/2008/03/29/three-recurring-challenges-in-web-development
year: 2008
---

While there’s many things that keep us web developers busy, I think
there are three challenges that keep coming back and bugging us all the
time. I’m not talking about any special pitfalls when it comes to
programming itself here. Mostly, I’m talking about limitations that we
just can’t overcome - the user’s **choice**.

What do I mean by choice?

### Browsers

For starters a user can choose which **browser** they use. When I
started out coding some years back, usage logs showed us some 90%+
percent use of Internet Explorer 5(.5)/6. Although it was always good to
also think of those poor non-IE users, there were also considerations
whether or not it was actually worth the hassle (and the money) to fix
IE-induced bugs in other browsers.

Along came Firefox to make the world, err … web, a better place -
meaning that it all of a sudden made sense to actually stick to the
rules set by the [W3C](http://w3.org). And soon there were more than 25%
of users that actually **used** Firefox, going up to more than 35% right
now - that makes it the market leader if you calculate IE6 and IE7
separately (usage statistics taken from
[here](http://www.w3schools.com/browsers/browsers_stats.asp)).

Now, what does this mean for web developers (i.e. programmers **and**
designers)? Nowadays, we have to worry about satisfying (X)HTML/CSS
needs for all kinds of different browsers. Sites like [Position Is
Everything](http://www.positioniseverything.net/) keep us up-to-date
with the latest tricks how to trick IE into producing valid visual
output. Today’s web developer really **needs** multiple environments to
validate that their code produces acceptable results in Windows, Linux
and Mac OS X with all their different browsers. Günther probably spends
a good third of his time making his perfectly valid HTML and CSS work in
IE6 and IE7.

### JavaScript

I’ve had **huge** discussions about using JavaScript, especially since
AJAX surfaced and made our lives on the web more interactive. While one
can safely assume that a good deal of people have JavaScript activated
in their browsers, it is still mandatory to think of those few souls
that don’t - either because they don’t want to have it active or because
they’re for example using a mobile device to surf the web.

I’ve got used to a certain approach when it comes to relying on
JavaScript. My answer is: **don’t**. When developing a site, I usually
start out developing it for use **without** JavaScript. As soon as the
basic stuff works, I start adding AJAXy stuff (if I use it at all) and
some things to make a user’s life easier, such as pre-filled form fields
that automatically reset their values when being clicked. This way,
people with JavaScript deactivated can still use the site while others
are rewarded with some fancy effects and added functionality. I would
generally suggest sticking to that rule when building a site that is
being used by a user base you can hardly determine or instruct upfront.

The case is different for stuff like admin areas. With backends and
admin stuff, you can usually rely on the fact that there’s only few
people using it and you can set up a constraint telling them that they
need to have JavaScript enabled to use it. While it may still be a good
idea to maintain a fallback for use without JavaScript (say, the user is
on a business trip and uses a computer in an Internet Café or logs in
using their iPhone), I think in this case it acutally **is** valid to
require JavaScript for functionality.

### Cookies

While fixing browser bugs is a necessity due to market shares and
incompatibilities and the whole JavaScript-optimization doesn’t
necessarily include lots of extra work if done properly (especially when
using Rails), dealing with users that have their cookies deactivated can
quickly become a real pain in the ass. Most users think of cookies as
[ways of advertising and other crazy
stuff](http://en.wikipedia.org/wiki/HTTP_Cookie#Misconceptions), they
don’t realize that even a simple thing such as a shopping cart usually
relies on cookies. Even if the site doesn’t store the shopping cart
itself in cookies, it most definitely uses cookies to store the user’s
session ID.

Of course, there’s alternatives like PHP’s way of adding its wicked
[PHPSESSID](http://www.php.net/session) to each and every URL. This
doesn’t only look ugly but also bears some crucial security issues - all
of a sudden, you have to validate that the supplied session ID is
actually used by the user it was generated for (i.e. storing session IDs
and their corresponding user IP addresses in the database), expire the
session manually and whatnot. This usually just gives me a headache and
isn’t worth the fuzz.

I tend to be harsh when it comes to users disabling their cookies - I
just don’t allow them to view the site. I’d have the [standard
approach](http://www.webmonkey.com/06/26/index3a.html) to check whether
or not cookies are enabled and then redirect the non-cookie users to a
site that politely ask them to accept cookies for the site. I do this
because I simply think it’s not economic to spend hours just to pave the
way for some 0.something per cent of extra-paranoid users (especially
since these users are - in my humble experience - usually the ones that
buy/use the services least and complain about it in the forums/support
area most … so you don’t even really want them to **use** your site).

### Summing up

These are three recurring issues that I see in my every day work. As I
said, I’m strongly in favor of ensuring cross-browser compatibility
(although you should really take a peek at Andy Clark’s [Transcending
CSS](http://www.amazon.com/Transcending-CSS-Design-Voices-Matter/dp/0321410971/ref=pd_bbs_1?ie=UTF8&s=books&qid=1206832799&sr=8-1)
where he makes some valid arguments **against** hacking HTML/CSS just to
make sure web pages look the same in every browser). I usually also
agree when people are saying that a page should be functional without
JavaScript. But: I definitely don’t want to spend hours fixing security
holes just because some paranoid users deactivated their cookie support.

That being said, I’m looking forward to hearing your opinions about it.
