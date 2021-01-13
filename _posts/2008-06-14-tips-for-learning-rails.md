---
title: Tips for Learning Rails
layout: post
permalink: /articles/2008/06/14/tips-for-learning-rails
year: 2008
---

Most of you guys probably know [Working With
Rails](http://workingwithrails.com) - or even hang out at their forums
like I do. There’s a board with the suiting name of [Ask a Rails
expert](http://workingwithrails.com/forums/4-ask-a-rails-expert) where
beginning and slightly advanced Rails developers can ask the more
experienced ones questions. Lately, there seem to be too many beginners
for too few experts - this inspired me to write an article on some tips
for picking up and starting Rails.

### Experience = Pre-Requisite!

To start with: **Don’t pick up Rails or Ruby if you haven’t ever
programmed before or if you haven’t yet developed at least a couple of
sites that actually earned someone money and/or recognition.**

The reason is quite simple: Rails is a very complex and opinionated
framework that hides a lot under its covers. If you’ve never experienced
troubles with tainted user input (like SQL injection, CSS, CSRF, etc.)
first hand and know how to handle it by yourself (i.e. without a
framework doing it automatically) you’re quite likely to overlook some
details even if the framework does a good job at offering basic help.  
Moreover, Ruby, in my opinion, is a way too mighty language to be given
to a beginner. All its meta programming features and mighty
object-oriented features are hard to grasp if you’ve never dealt with
anything remotely as complex before.

[Obie Fernandez](http://blog.obiefernandez.com/) sums it up in an
[interview](http://www.vimeo.com/1104211) with [Gregg
Pollack](http://www.railsenvy.com) at [RailsConf
2008](http://www.railsconf.com), so hop over there if you’re interested.

In short: Unless you have a very good grasp of OOP and probably a few
years of experience in web development with other languages (PHP,
ASP (.NET), Java, etc.), Rails is - in my opinion - definitely **not**
right for you. You may get the job done eventually, but it’s quite
likely that you’ve written bad code - i.e. it may have security holes,
may not be tested thoroughly enough, etc.

### Book(s)/Screencast(s) -\> Real Project!

**Don’t learn by theory - use it in a real project!**.

After you’ve gotten familiar with the basics of Rails - by reading a
good book like [Agile Web Development with
Rails](http://www.pragprog.com/titles/rails2/agile-web-development-with-rails)
(2nd edition covers Rails 1.2, 3rd edition - to be released in October -
will cover Rails 2) or watching some screencasts over at
[PeepCode](http://peepcode.com) or
[Railscasts](http://www.railscasts.com) - get your hands dirty on a real
project. Toying with Rails isn’t fun if all you’re doing is “Hello
World” stuff - plus the progress you make is non-existent.

### Standard Project \> Highly Specialized Bulls$$t

**When I say “Use it in a real project”, I mean a project that is not
overly big and doesn’t require lots of “non standard” features.**

Lots of people at the forums say they’re totally new to Rails (or have
just started programming at all) ask about very specific topics: They
want ActiveRecord to generate some CSV or Excel spreadsheets, use task
scheduling, display pretty graphs and what not. If you test-drive
something (be it a new car or a new computer), you take it down a
familiar road … SLOWLY! Use it for your next small-scale business
application that has some basic user authentication and a few standard
features (but, of course, combined in a great and creative way) that can
be built without relying on too many plugins. After you’ve gotten comfy
with Rails, you can always move on to bigger and more demanding
non-standard tasks.

### Plugins You Don’t Understand = Plugins You Shouldn’t Use

Talking about plugins: **Never, NEVER rely on plugins without fully
understanding them.**

Every plugin comes with some kind of documentation - either a readme
file, some rDoc or even a full-blown website. If there’s no
documentation, don’t use it! With 99% certainty, it’s crap! Also, I’d
suggest only using plugins that are actively developed (unless there’s a
really good reason they’re not actively developed - like small-scale
plugins such as acts_as_list, acts_as_paranoid, etc. with only a few
files and practically no hacks) and preferring plugins developed by
established and experienced Rails developers like [Rick
Olson](http://svn.techno-weenie.net/projects/plugins/) and other
(former) Rails core developers.

That being said, you should be aware that even well-known and heavily
used Rails plugins from experienced developers, such as Rick Olson’s
popular [restful_authentication
plugin](http://svn.techno-weenie.net/projects/plugins/restful_authentication/)
have (or at least had) their
[flaws](http://www.rorsecurity.info/2007/10/28/restful_authentication-login-security/).
It’s a good idea to at least take a good look at the source code and try
to understand what it does before blindly installing it and providing
malevolent users with new security holes.

### Learning from Other People’s Codes

**Read other people’s codes.**

Of course, again, I would focus on people that have a certain reputation
in the Ruby/Rails community. Otherwise you’ll end up hacking away like
in the old days with JavaScript (hah, sweet nostalgia). Take a look at
some of the great open source projects you find at
[RubyForge](http://rubyforge.org). You should also try, step-by-step of
course, to get to know the code of Rails itself. It’s a complex
framework but the more you know about it, the better you’ll use it to
your advantage.

### Je ne comprends pas!

**Code in English, God damn it!**

Dozens of people at the WWR forums ask questions and post code snippets
in Spanish, Portuguese, French, German, … Don’t do that! First of all -
doesn’t it look wicked to you if you have your variables in your mother
tongue and all the language and framework keywords in English? Second,
having English code makes it easier to ask other people for help because
everybody knows at least a bit of English. Help others help you and
write your code (including database stuff and everything else that youc
an) in English - preferably American English.

### Test Your Ass Off!

**Use TDD or BDD!**

The first Rails application I put in production didn’t have a single
unit test or spec (and it still doesn’t). If you’re a beginner, that’s
even worse than when you’ve reached a certain expertise with Rails. Why?
You don’t know yet how the framework handles certain situations - it
might behave unexpectedly. Tests/specs to the rescue! Get in the habit
of testing your Rails code - and start with your first app! I’d
recommend using [shoulda](http://www.thoughtbot.com/projects/shoulda) or
[rspec](http://rspec.info) rather than the classic Test::Unit because I
think they’re easier to understand if you haven’t done TDD/BDD before.

### Two Weeks Back = Old!

**Keep up to date what’s going on in the Rails world!**

Everyday, there’s a lot going on out there that you should be aware of
and there are lots of resources that help keeping you up-to-date such as
the [Rails Weblog](http://weblog.rubyonrails.org) itself,
[Railscasts](http://www.railscasts.com), the [RailsEnvy
Podcast](http://railsenvy.com), [RubyFlow](http://www.rubyflow.com),
[Planet RubyOnRails](http://planetrubyonrails.org), [Ryan Daigle’s
Blog](http://ryandaigle.com/) (including his series *What’s new in Edge
Rails*), etc. You should definitely add these resources to your feed
readers.

### Rails Isn’t Always The Right Choice!

Last but not least: **A good Rails programmer not only knows how to get
a job done with Rails but also knows when Rails doesn’t fit!**

I see lots of people writing really tiny apps with Rails these days just
to be hip. By tiny I mean apps with only one or two models or even just
little scriptlets that focus on a single purpose. Considering Rails’
memory footprint (a Rails app with a couple of Mongrel instances can
easily use some 300-400 MB of RAM in heavy usage times) this is pure
overkill.

For small apps, plain old PHP may still be a good, maybe even the best,
choice. If you definitely want to do Ruby, maybe take a look at
[Merb](http://www.merbivore.com/) - it unites some of the things we love
about Rails in a much lighter framework.

Remember: If you’re a good programmer, you don’t select your jobs based
on the language you want to use but rather you pick the best
language/framework to get each job done - which may well mean you’ll
write some apps with Rails, some with Merb and some with PHP, Java or
ASP.NET (**gross**, did I really just suggest that?!).

### Conclusion

These are the best tips that come to my mind for learning how to use
Rails (or pretty much any framework). Take your time and learn
carefully. Keep up-to-date - Rails is moving along more patiently than
it did over the last few years but it’s still moving along quite rapidly
compared to other frameworks/languages.

And don’t ever forget when using Rails: Have a lot of fun! ;-)

PS: Some of my more regular readers might wonder why the second part of
my [Guide to Unobtrusive
JavaScript](http://www.railway.at/articles/2008/05/19/guide-to-unobtrusive-javascript-part-1)
still hasn’t been published. I’m sorry for the delay but I have been
busy over the last few weeks. The article is nearly finished and will
probably be published by the end of next week, so please stay tuned.
