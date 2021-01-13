---
title: Ways of teaching/learning Rails
layout: post
permalink: /articles/2008/04/04/ways-of-teaching-learning-rails
year: 2008
---

I’ve had discussions with some lecturers at [my
university](http://www.mci.edu) lately whether or not Rails would fit
the needs of an Austrian University of Applied Science. One of the main
topics we discussed was the teaching method - is Rails more suitable for
bottom-up or top-down teaching? What do I mean by that?

### Bottom Up

When learning/teaching a topic in a bottom-up style, you start with the
very basics - meaning arithmetic operations, loops, basic OOP stuff
(instances, classes, methods, class-/instance-level) and so forth. What
this means for a student is that they don’t see anything “real” for the
first few weeks or even months of their training (depending on how tight
the schedule is). Instead they’re forced into learning stuff without
seeing the actual value of **what** they’re learning. Good thing is,
though, that probably nobody will be overwhelmed by the sheer complexity
of a programming language because they take everything in small steps.

### Top Down

Top down in the context of learning means that you define some things as
given - “God giveth thee arrays so thou shalt use them and ask questions
later”. Someone is walked through an application (say, the omnipresent
blog) and confronted with some **real** code (at least in parts). They
see some value in their work - and later, they can also ask questions.
Although that probably won’t be necessary since we’re doing a top-down
approach, meaning, after showing the whole thing we break it up in
little comprehensible units and explain them one by one (“This is a loop
that goes through all the posts - and here is how a basic loop works”).
This, of course, forces people to accept a whole lot of rules before
they even know any of the basic stuff. And it usually involves people
being overwhelmed and giving up because all that shit is way too complex
for them.

### Mixed style

Probably a mix style is the way to go. Let’s take the example of
teaching Rails, including the basic Ruby stuff. I’d probably give a
quick overview of Ruby, assuming that everyone in the class has at least
a vague background in any modern programming language. The overview
would probably be quite similar to what the [Agile
book](http://www.amazon.com/Agile-Web-Development-Rails-2nd/dp/0977616630/)
features as an appendix. I’d definitely do this bottom-up, doing stuff
like arithmetics and simple OOP in an IRB shell.

As soon as I’m switching over to Rails, I’d go for the top-down method
first, showing the students a small, but full-blown, project and then
making it into small units of specialized topics (Views, Controllers,
Models, Basics of Routing/REST, etc.) to make them understand how all
the elements of the framework are tied together to work flawlessly.

Oh, yeah, and I’d definitely make them do a **real** project with a
**real** customer (i.e. me), giving every team of, say, 4-8 developers a
real application and working on it step by step.

### What do you think?

I know we don’t have a real readership right now, but I’d be happy to
see some comments if you happen to stumble across this post! ;-)
