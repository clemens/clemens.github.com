---
title: RailsConf Europe 2008 Coverage - Day 1
layout: post
permalink: /articles/2008/09/02/railsconf-europe-2008-coverage-day-1
year: 2008
---

As I mentioned [a couple of hours
ago](http://www.railway.at/articles/2008/09/02/railsconf-europe-2008)
I’m at RailsConf Europe 2008. So far, I’ve had a good time and the Conf
seems to be better organized than last year (for starters, all the
microphones worked from the start ;-) and the registration took only \~5
minutes). Unfortunately, O’Reilly seems to have cut back on the goodies:
No RailsConf T-shirts this year and as far as I’ve seen there’s only one
magazine that we got (last year it was, like, 10?!). But hey, as long as
the talks are good, who cares about a TYPO3 magazine anyways?

So here it goes for today’s talks:

### Accessible AJAX on Rails

*presented by Jarkko Laine & Geoffrey Grosenbach*

On of the three morning tutorials was about how you can make AJAX and
JavaScript in general less obtrusive and therefore also more accessible.
Jarkko showed some basic techniques of progressive enhancement (really
necessary, since most of the people didn’t seem even know the term let
alone what it’s about) and introduced Dan Webb’s lowpro pretty early in
the game. In my opinion, it was very important that he really elaborated
on using the right markup in order to be able to access elements using
their respective class name, id or even other CSS3-style selectors.
Jarkko also did not only talk but did live coding and a couple of short
“try it yourself”-sessions where the participants got little tasks that
they should implement. Finally, he showed delegating event handling with
*Event.delegate* which is hidden very well beneath the covers of lowpro
and thus probably not used quite as often as it should be used (because
it’s good!).

All in all, since I’ve written
[two](http://www.railway.at/articles/2008/05/19/guide-to-unobtrusive-javascript-part-1)
[articles](http://www.railway.at/articles/2008/06/30/guide-to-unobtrusive-javascript-part-2)
about unobtrusive javascript myself, the talk was a bit too basic for
me. Jarkko presented well, though, and Geoffrey (who replaced Dan Webb,
who unfortunately seems to be missing from this years’ Conf) chimed in
every now and then and shared his experiences with several things
related to the topic.

Ressources:

-   [Presentation as
    PDF](http://assets.en.oreilly.com/1/event/13/Accessible%20Ajax%20on%20Rails%20Presentation.pdf)
-   [Jarkko Laine’s blog](http://jlaine.net/)
-   [Geoffrey Grosenbach’s blog](http://nubyonrails.com)
-   [LowPro](http://www.danwebb.net/lowpro)

### Deploying and Monitoring Ruby on Rails

*presented by Mathias Meyer & Jonathan Weiss*

Jonathan started the talk and explained about different ways of serving
Rails apps: FastCGI, Mongrel and Phusion Passenger (aka mod_rails). He
explained the differences, advantages and disadvantages really well and
elaborated on the issue of load balancing. Jonathan said he thinks that
Phusion Passenger will become the default way of hosting Rails
application over the next few months. He also discussed
JRuby/Glassfish/WAR files for deploying Rails applications into existing
Java environments.

Jonathan then went on to explain load balancing across multiple physical
servers using Apache 2.2’s mod_proxy_balancer, nginx, lighttpd and
HAProxy (and other pure web proxies), and their respective pros and
cons. Here are his recommendations for some use cases:

-   Small sites (with only one physical/virtual server): Apache 2.2 with
    Phusion Passenger
-   Medium sites (with multiple servers): Apache 2.2 as frontend proxy
    and static host, Mongrel (or Phusion Passenger) as the backend.
-   Large sites: redundant load balancers, redundant proxies and static
    file hosts, plus Mongrel or Phusion Passenger
-   Heavy focus on static files: Static requests handled by nginx or
    Lighttpd, dynamic requests routed through Apache to Mongrel/Phusion
    Passenger.
-   Java: WAR files with Glassfish/Tomcat/etc.

He closed the first part of the presentation talking about Ruby
Enterprise Edition, Thin/Ebb/Evented Mongrel (although he doesn’t seem
to have favorable opinions on Thin & Co.) and up and coming technologies
like Fuzed (Erlang-based load balancer), JRuby and, of course, Phusion
Passenger.

The talk was handed over to Mathias who talked about deploying Rails
applications with Capistrano. He especially focused on recipes and more
advanced techniques like using callbacks, namespaces, Capistrano
variables and the deprec gem.

Jonathan took over again and introduced Webistrano, the web GUI he
created to facilitate deployment with Capistrano and Macistrano, a
little tool written by Mathias, to have deployment tools handy on our
Aqua desktops.

Afterwards, it was time to get our hands dirty. Jonathan and Mathias had
brought a mighty quad-core machine with 40 virtual servers so people
could try out deploying the Railscasts website by Ryan Bates. Jonathan
also showed how to configure Apache with mod_proxy_balancer to proxy
dynamic requests to a cluster of Mongrels. Finally, they demonstrated
how to deploy the same application with Phusion Passenger (great for
people like me who are thinking about switching to PP for production).
After some initial difficulties (turns out an AirPort Express isn’t
really suited for servicing a couple dozen synchronous connections) I
think all folks took away a lot from the practical part.

In the last part, Jonathan gave a brief overview about tools for
monitoring Rails. It was especially cool to see how easily you can
configure Monit with its ultra-easy DSL for basic monitoring on Rails
(and other services).

Lastly, it was Q&A. Jonathan said that in his opinion memcached is the
best caching solution available for Rails if you need really fast
caching. He also likes God as an alternative to Monit (which has
readable syntax because it’s Ruby) but prefers Monit since it is “older”
and therefore has a proven track record.

All in all, this was a really valuable talk and Jonathan and Mathias
have a great way of presenting and also engaging with the audience
during the practical part. Thumbs up.

Resources:

-   [Presentation as
    PDF](http://assets.en.oreilly.com/1/event/13/Deploying%20and%20Monitoring%20Ruby%20on%20Rails%20Presentation.pdf)
-   [Jonathan Weiss’ blog](http://blog.innerewut.de/)
-   [Mathias Meyer’s blog](http://www.paperplanes.de/)
-   [Capistrano](http://capify.org)
-   [Macistrano](http://github.com/mattmatt/macistrano)
-   [Phusion](http://phusion.nl),
    [Mongrel](http://mongrel.rubyforge.org/)
-   [Monit](http://www.tildeslash.com/monit/)
-   [Apache](http://httpd.apache.org), [nginx](http://nginx.net/),
    [lighttpd](http://www.lighttpd.net/)

### Panel discussion

*David Heinemeier Hansson, Jeremy Kemper, Michael Koziarski*

David started the panel discussion with talking about three upcoming
releases that are due to be released *during* RailsConf (2.0.4 and
2.1.1, which will, among other things, contain REXML fixes, and also a
2.2 beta). We also found out that most of the folks at RailsConf use
Rails 2 now and it’s only a few people who are still, dare I say, stuck
with Rails 1.2 - which is good because the core team wants to cut back
the efforts on 1.2 so they don’t really know how long it’s going to be
supported.

#### What’s good and what’s bad about the way that the whole Rails system is moving?

David especially likes that the ecosystem is growing and that people are
blogging about Rails and sharing their stuff. At the same time, he
thinks there’s lots of companies and individuals with lots of great code
just sitting in their lib and vendor directories and rotting away.

#### Future of Test::Unit in Rails, because there’s rspec and others?

David would like to get rid of long underscored test names and he’d like
to see the word “should” more often. In fact, some of the new stuff in
Rails edge even started using the “new style” where you supply the test
name as a string. Jeremy, Koz and David agree that the learning curve of
Test::Unit is more user-friendly than rspec because you don’t need to
wrap your head around the whole idea of behavior driven development.
David thinks that, after all, everybody should use what suits them best.

#### Future of web apps - Sproutcore/MVC in the browser?

David is not a big fan of the idea of pushing more logic onto the
browser. “The more stuff you take out of the application, the more stuff
you have to write in a language other than Ruby - not good!” (Couldn’t
agree more ;-)). Jeremy thinks that Sproutcore is the framework that has
evolved best and has actually done some *real* integration and bridging
the gaps between the server and the browser.

#### Are Gems the best way to publish and manage plugins?

Jeremy thinks that lots of plugins are actually very small and
independent of each other so they don’t really need to be Gems and
probably *shouldn’t* be. So he thinks that plugins will stick around in
the future but the bigger plugins should be distributed as Gems.

#### Influence of Merb on Rails? (thread safety, performance, etc.)

Jeremy thinks that there’s definitely light competition going on and
Rails does definitely learn a thing or two from Merb (and vice versa).
Koz says that Rails still tries to build the best web application
framework there is. As far as performance goes, he hates “Hello World”
benchmarks because they don’t show the real world performance.

#### Which Ruby implementation should be used?

Koz’ customers mostly use the current MRI (1.8.6) but thinks that JRuby
is coming along really well and that it’s important. Jeremy agrees and
also mentions MagLev as a future possibility. RubySpec is the future
because it shows how far and how well Ruby has been implemented by the
respective implementation.

#### Other frameworks that are interesting to the core members and what are they playing with?

Koz evades the question (“I’m a *Rails* consultant”) but states that
he’s definitely interested in alternative data stores and persistence
technologies such as object-oriented DBs and CouchDB. David is
interested in clouding and distributed system technologies (“Having your
own machine is like carrying your own electricity”). Jeremy thinks that
Sysadmins should pick up convention over configuration to achieve this
(**chch**).

#### Differences between European and US conferences and other ones?

Koz likes smaller conferences because it’s less frantic and you can have
conversations with people. He also likes that it gives new people
opportunities to speak. David loves that RailsConf US is a special
experience because it’s about being part of the crowd which has a
different kind of energy and atmosphere (“It has the big, block-buster
kind of mentality.”). He likes that big conferences have lots of
applications for talks which, all in all, increases the quality.

#### Sweet spots for Rails applications (apart from the whole scaling debate)?

Koz thinks that Rails usually fits the problem from a technical
perspective but it doesn’t always fit the *business* - if the team or
the company doesn’t accept Rails, it’s not right for them (“It’s not
about technology, it’s about culture.”). David agrees and adds that he
sometimes thinks that he’d sometimes like if people wouldn’t force Rails
on people.

Resources:

-   [David Heinemeier Hansson’s blog](http://loudthinking.com)
-   [Jeremy Kemper’s (empty) website](http://bitsweat.net/)
-   [Michael Koziarski’s blog](http://www.koziarski.net/)
-   [Blog post about Rails 2.0.4
    release](http://weblog.rubyonrails.org/2008/9/3/rails-2-0-4-maintenance-release)
-   [Blog post about Rails 2.1.1
    release](http://weblog.rubyonrails.org/2008/9/5/rails-2-1-1-lots-of-bug-fixes)
-   [CouchDB](http://incubator.apache.org/couchdb/)
-   [Merb](http://merbivore.com/)
-   [RubySpec](http://rubyspec.org/)
-   [JRuby](http://jruby.codehaus.org/), [Rubinius](http://rubini.us/),
    [MagLev](http://ruby.gemstone.com/)
-   [RailsConf US](http://railsconf.com)
