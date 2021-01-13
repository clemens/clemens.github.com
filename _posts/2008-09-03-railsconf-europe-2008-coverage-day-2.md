---
title: RailsConf Europe 2008 Coverage - Day 2
layout: post
permalink: /articles/2008/09/03/railsconf-europe-2008-coverage-day-2
year: 2008
---

Day 2 of RailsConf Europe 2008

### Keynote - David Heinemeier Hansson

(Missed the first 10 minutes - anything interesting happened?)

Legacy is not a technology and not an attribute to software or code.
David thinks it’s what is perceived as “old” some time after it has been
written. And, apparently, he now likes to draw graphs by hand! ;~~) Over
time, code goes from “This is the *best code ever*” over “Well, this
could be better” to “This sucks” and “I can’t take it anymore”. Finally,
of course, there’s always the last resort: Rewrite. In short, the code
stays the same but our perception of it changes~~ it’s use that change,
not the code. David says it’s a good thing because reflecting on old
code means becoming a better programmer.

*What you write today will become legacy.* We need to be prepared for
that and Rails won’t save us from that.

*The best programmers write the most legacy software* because it means
they are writing the most software. Switching to a newer, better
platform should help you become a better programmer even faster. David
argues that the process for “best code ever” becoming “biggest ball of
mud” runs faster as you get better as a programmer so, all in all, you
end up producing more legacy code over time.

*When you’re green, everything turns legacy over night* because when
you’re new to a technology or platform which David thinks to be the
“inherent dilemma of coming to Rails”. People are used to a certain pace
and when they come to Rails they experience a high level of euphoria -
followed by a crash because everything turns stale over night.

*Good software takes 10 years to write* (Joel Spolsky). David says that
it probably doesn’t take 10 years to write but 10 years to become
successful. The thing is that you have to deal with code over a long
period of time so it, again, comes down to always having to deal with
what you perceive to be legacy software. But: \_The single worst
strategic mistake that any software company can make: Rewrite the code
from scratch" (also Joel Spolsky).

David continued by showing some code pieces that he now considers to be
legacy or a *trash can for code*:

-   Basecamp’s Application Helper apparently has a couple dozen methods
    with over 500 lines of code because it was just easy to stuff
    everything in there when he didn’t have *helper :all* yet. David
    compares the Application Helper with train station: People are not
    supposed to stay at the train station but get on a train and leave.
    Same holds true for Application Helper: It should hold helper
    methods until you find a better place for them. The way to tackle
    refactoring a bloated Application Helper (or legacy code in general)
    is to not rewrite big chunks of code but instead work on it slowly
    and always leave the code better than it originally was.
-   Basecamp’s Person class seems to have accumulated quite a bunch of
    legacy code, such as old-style filters (*def before_create* and the
    like). David suggests extracting what he calls “concerns” out of a
    class and put it into modules. He proceeded to make his point by
    extracting a system notification service out of the Person class and
    putting it into a SystemNotice module and then including it in the
    Person class. He thinks that this increases the coherence of the
    code because the Person class becomes both, better structured and
    shorter. It’s less about reuse and more about structure.
-   Basecamp has a GlobalController (**chch**) because “it does global
    stuff” that David couldn’t “fit in somewhere else” and because
    before REST there wasn’t really any natural boundary for how bloated
    a controller could be.
-   Basecamp’s environment.rb was really bloated before the advent of
    initializers (note to self: Need to find a screenshot because I’ve
    definitely seen it in one of David’s presentation).

Things he learned by tackling these issues:

-   Extract concerns. Not because you want to reuse them but because
    they improve the structure and coherence of your code.
-   The DRY exception: Code that is ultra-DRY is really hard to extend
    and becomes unflexible. David says that sometimes it’s better to
    just split code across multiple files even if this means that there
    is going to be *some* duplication (not too much, mind you).

In short: Don’t get stuck worrying about legacy code because everything
becomes legacy at one point.

I think David gave a great talk and addressed a topic that really
affects pretty much every developer at some point during their career.
What especially amazed me is that David seemed to have changed some of
his strong notions of what is good and bad, and that he seemed to have,
dare I say it?, matured. I don’t think that he’s the same guy that was
once termed the [potty mouthed
Dane](http://blog.wekeroad.com/blog/imploding-rails-jesus-dhh-and-the-uncle-ben-principle/)
and showed big [fuck you
slides](http://blog.wekeroad.com/wp-content/uploads/2007/10/dhh-fu.jpg)
in his keynotes. Instead he impressed me (and probably some other folks)
by showing some Basecamp code where he pretty much said “Look at the
crappy code I once wrote”. Yes, there’s still some kind of Socratic
notion about his talk where he states that he writes or wrote bad code
but at least he *knows* it’s bad and others don’t know how bad their
code is. But if David - as a developer with an enormous amount of
influence on the whole development community over the last few years -
can’t have this bit of arrogance, then really, who can?

Resources:

-   [David Heinemeier Hansson’s blog](http://loudthinking.com)
-   [37signals](http://37signals.com)
-   [Joel Spolsky’s blog](http://www.joelonsoftware.com/)
-   [BaseCamp](http://basecamphq.com)

### Hacking the Mid-End: Unobtrusive Scripting and Advanced UI Techniques in Rails

*presented by Michael Bleigh and Chris Selmer*

(Again, missed the first few minutes. What’s it with me today?)

Michael explains that it’s important that your application is accessible
and that Rails isn’t necessarily ideal when it comes to being
unobtrusive and accessible (e.g. delete links with link_to). You also
want your app to be intuitive - which Michael thinks is an inherent
advantage of web applications because users are used to working with the
browser. Finally, Michael says that apps should be responsive and react
quickly to users’ actions.

Chris went on talking about solving mid-end problems using a toolset of
helpers, partials, jQuery (or Prototype) and LowPro. He likes to start
building an app without JavaScript, then abstract some UI into helpers
and partials and finally write unobtrusive JavaScript to enhance your
application.

The guys then went to do some live coding: The goal of the first example
was to improve a report that takes quite some time to generate and
doesn’t really provide any feedback to users. Users with JS disabled
should see an info message (“The report may take up to 10 seconds to
generate.”) plus a link to the actual report while users with JS enabled
should see a spinner and the report should automatically be displayed as
soon as it was created. As a second example, they showed how to build
tabbed navigation that, again, degrades gracefully for users with JS
disabled. (By the way, if you don’t know it: If you type “lorem” in
TextMate and hit tab, you get a full paragraph of Lorem ipsum. Life can
be so damn great.)

The guys from Intridea did a great job picking up where Jarkko Laine
stopped yesterday, so if you were at the tutorial yesterday like I was
and you missed the more advanced stuff in Jarkko’s content, this session
definitely acted as a great complement. I especially liked the live
coding where they showed how to use LowPro with jQuery since I’m
thinking about ditching Prototype in favor of jQuery but haven’t gotten
around to taking a closer look at jQuery just yet.

Resources:

-   [Presentation](http://intridea.com/2008/9/3/railsconf-europe-2008-hacking-the-mid-end)
-   [Michael Bleigh’s blog](http://www.mbleigh.com/)
-   [Chris Selmer’s blog](http://blog.betterendeavor.com/)
-   [Intridea blog](http://intridea.com/blog)
-   [LowPro](http://danwebb.net/lowpro)
-   [jQuery](http://jquery.com/)

### The One-Two Punch: jQuery with Rails

*presented by Yehuda Katz*

Yehuda explained jQuery’s core philosophy: “Get some elements. Do some
stuff.” (Jeez). jQuery uses lots of advanced CSS3 style selectors
(Yehuda termed them CSS3 Plus) to support really powerful selection of
elements. Example: table tr:nth-child(even) \> td -\> all tabe cells in
every even table row. jQuery supports method chaining by always
returning jQuery objects from methods. 5 parts of jQuery:

-   DOM: Yehuda showed a couple examples how to use different selectors.
-   Events: jQuery, like Prototype, has a unified event model in order
    to hide the issues with cross browser compatibility and, of course,
    support for handling custom events.
-   Effects
-   AJAX: jQuery has shortcuts for AJAX methods (load, $.get, $.post,
    $.getJSON) and one mighty $.AJAX method that seems to be pretty
    similar to Prototype’s Ajax.Request. It seems you can also set AJAX
    options directly on objects which looks very cool.
-   Metadata: Put JSON metadata directly in your HTML. Didn’t really get
    the advantage here.
-   LiveQuery: Didn’t really catch that either. (Btw. wasn’t this
    already the 6th part? ;-))

All in all, to me the presentation wasn’t quite as valuable as the other
sessions I’ve been to so far. Yehuda managed to give a quick overview
about the capabilities of jQuery but what was definitely missing was
some live coding so we could have seen the whole thing in action. Also
no mention of the jQuery plugin for Rails.

Resources:

-   [Presentation as
    PDF](http://assets.en.oreilly.com/1/event/13/The%20One-Two%20Punch_%20jQuery%20with%20Rails%20Presentation%201.pdf)
-   [Yehuda Katz’ blog](http://yehudakatz.com/)
-   [EngineYard](http://engineyard.com)
-   [jQuery](http://jquery.com/)

### RailsConf during off hours

One thing has to be said about this year’s RailsConf during break times:
It’s just plain awesome. People are engaging in interesting discussions
everywhere and the hotel’s staff and the catering are just amazing.
Let’s face it: Even for real conference hotels like the Maritim proARTE,
it’s still quite a challenge to cater lunch and coffee breaks for around
700 people. They do it well, they have good quality food and it seems
they have some LowPro-style backend: They’re always around but they’re
very unobtrusive.

EngineYard and Brightbox are giving away free t-shirts (although,
unfortunately, Brightbox has already run out of stock) and the shirts
are even suitable for wearing them on streets - not like last year’s
official RailsConf t-shirts, mind you. Speaking of official RailsConf
t-shirts: They finally arrived today and compared to last year’s fashion
disaster, they do really look okay this year. In fact, they look almost
as good as the EngineYard shirts. I’ll try to make a couple of pictures
and put them up on Flickr if I can manage - unfortunately, the WiFi
seems to be neither fast nor all that stable up until now.

### Intellectual Scalability: Solving a LArge Problem with Multiple Cooperating Rails Apps

*presented by Frederick Cheung and Paul Butcher*

Paul states that the least scalable component of every problem is the
human brain. The problem at Texperts is that they have about 30000 lines
of code in one of their apps and the tests take about 7 minutes to run.
One solution is using multiple apps that still should be seamless to the
user.

Texperts roll out their iterations in “lock-step” - i.e. they roll out
all of their applications at the same time. They use a simple directory
structure under a single root directory and share code through plugins.
They also have hacked Capistrano to support their style of deployment.
Finally, they use Selenium for cross-browser testing.

Each app runs its own database and they don’t communicate through
databases at all. Server-side communication is handled by RESTful APIs
and client-side communications via a special UI that makes the apps look
like a single application by using Apache to rewrite URLs (which also
resolves problems with the single origin policy). The whole application
is served by a single portal application and all other applications are
loaded as widgets.

Paul then handed over to Frederick who started doing some live coding to
show how to create a widget application with the underlying UI
framework. It seems to rely heavily on modern JS/CSS techniques so it
pretty much rules out the use of IE or real accessibility and graceful
degradation. However, all in all it seems to be a pretty neat framework
for creating an application by distributing the logic across multiple
small apps that are easier to maintain.

Texperts have been using the framework in production since June 2008
with 5 integrated applications. According to Paul, people who are using
the system say that it’s got a responsive UI and increases productivity.
However, it doesn’t seem to work well with high-latency connections
because there’s lots of tiny AJAX requests happening all the time.

Fred and Paul gave a good talk - maybe the live coding in this case was
a bit too expansive to be short and a bit too short to really display
the works of the actual framework. Paul also talked that there’s a
possibility that they might open-source it, so definitely be on the
lookout over the next few weeks and months.

Resources:

-   [Frederick Cheung’s blog](http://www.spacevatican.org/)
-   [Texperts](http://www.texperts.com/)
-   [Capistrano](http://capify.org)
-   [Selenium](http://selenium.openqa.org/)

### RESTful Everything - Towards a Complete Resource-oriented Workflow

*presented by Ingo Weiss*

I was a little late for Ingo’s talk and the room was really packed -
eventually they brought in additional chairs because 1/3 of all people
where just sitting in the back of the room - so I didn’t catch every
last bit that Ingo talked about.

His main statement was that Rails currently supports a REST-oriented
workflow pretty well in the model and controller layer but,
unfortunately, not in the views. Therefore, he developed a plugin on top
of Rails’ REST implementation that facilitates the integration of views
in the resource-oriented workflow. He then showed some example code to
make his point. It really looked kinda painful because I’m just used to
handling my views in the good old Rails way but after I got rid of my
reservations I really started to see some potential in his whole
approach. If I’d have to decide, I’d probably still stick with the
classic approach - but it definitely needs people with fresh ideas out
there so, personally, I’m grateful that Ingo seems to be one of these
fresh people.

Granted, Ingo is not the most captivating of speakers but the
interesting content definitely made up for the small deficits in
presentation and after all, we’re programmers: Let the code speak (and
speak it did - pretty well, as I said).

Resources:

-   [Presentation](http://assets.en.oreilly.com/1/event/13/RESTful%20Everything%20-%20Towards%20a%20Complete%20Resource-oriented%20Workflow%20Presentation.pdf)
-   [Ingo Weiss’ (empty) web site](http://ingoweiss.com/)
-   [Metaversum](http://metaversum.com/)
-   [ResourcefulViews
    plugin](http://agilewebdevelopment.com/plugins/resourceful_views)

### Security on Rails

*presented by Jonathan Weiss*

(A lot of Weiss action going on today …) Jonathan started with the topic
of information leaks. Convention over Configuration is good but it
indicates that an application is using Rails (e.g. default routes,
default javascripts, default 404/422/500.html error documents, etc.).
Sometimes you can even approximately deduce the Rails version that is
used. You can also gather lots of information from the HTTP response
headers, such as the HTTP server (e.g. Apache) and modules (e.g.
mod_rails) and application server (Mongrel) including their respective
versions. Capistrano usually also deploys .svn and .git directories so
you can just browse to .svn/entries or .git/whatever and can just read
unencrypted data. With all this information, potential attackers could
use the vulnerabilities to attack your site.

The Cookie Session Storage poses another security risk because the
contents of your cookies are only encrypted with Base64 and can pretty
easily be decrypted unless you use a secure (= long and random) session
key. Jonathan recommends to not store sensitive data in the session at
all or, if you really have to, at least use a different session store
(e.g. ActiveRecord Store).

Jonathan then went on talking about Cross-Site Scripting. Avoiding XSS
is easy if you don’t allow user content to be formatted - you can just
use the h helper method to escape HTML output. There are also two
plugins, safeERB and XSS shield plugin, that help you in that they raise
exceptions when output is not escaped (safeERB) or just inverse the
principe, i.e. all output is by default escaped and you have to
explicitly say that you want your output unescaped (XSS shield). If you
need to allow formatting of user content, Jonathan suggests using custom
filters (e.g. RedCloth) but he stresses that you still need to sanitize
the input/output and you should definitely use Rails 2.0 because the
sanitize method in older Rails versions used a blacklist approach
whereas newer versions of Rails use a whitelist approach so you have to
explicitly list the tags you want to allow in user content. Another
option would be to use Tidy.

Session fixation attacks are more rare with Rails applications than for
example with PHP because PHP often passes the session id along in the
URL. If you want to be really safe, Jonathan suggests resetting the
session after every login and logout. Unfortunately, according to
Jonathan, not even popular plugins like restful_authentication don’t do
this unless you manually add the respective command.

Cross-Site Request Forgery is usually exploited by inserting an image
with a URL to a server where the user has a valid and active session.
It’s also possible to use JavaScript, Java Applets, ActiveX, etc.
Protecting applications from CSRF is really easy because you only have
to use a protect_from_forgery call in a controller, preferably the
ApplicationController. Jonathan said that in his experience this is a
really underused measure in the wild. You really have to make sure that
you only use GET requests for safe and idempotent requests and you also
should ensure that session cookies are not persistent (i.e. they should
really expire at the end of the browser session or even earlier).

To avoid SQL Injection (I guess most people have at least heard about
the term), you should either use prepared SQL statements (e.g.
:conditions =\> \[“id \> ?”, params\[:id\]\]) or invoke the quote method
preferably on every table name, column name and value. In Rails versions
\<= 2.1 you also need to escape LIMIT and OFFSET parameters.

Jonathan then talked about JavaScript Hijacking which is especially
critical if you use JSON because JSON is actually valid JavaScript. It
can, for example, be done by hacking JavaScript’s default Array
definition. Ways around JavaScript Hijacking not putting important data
in JSON responses, using unguessable URLs (e.g. with MD5 hashes instead
of plain text IDs) and prefixing the JSON response with garbage, thus
making it invalid JavaScript. Of course, for the latter, you then need
to manually remove the garbage for your own application.

Jonathan names mass assignment as another popular security in current
Rails applications. If you’re not using attr_accessible/attr_protected
to avoid critical attributes being accesses through mass assignment -
think of an admin flag (true/false) for example. Jonathan definitely
recommends using attr_accessible because it makes your attributes save
by default (as opposed to attr_protected which only protects the fields
that use the attr_protected method).

Rails plugins also have their security problems - even plugins of
seasoned developers, like Rick Olson’s restful_authentication. Jonathan
states that you always should do code review before you start using a
plugin and keep them up to date (e.g. subscribe to the author’s blog or
watch their GitHub repository). You also should rely on svn:externals
and git submodules because you can’t deploy if the references repository
isn’t available. Jonathan recommends using Piston (svn) or Braid (git)
to manage your plugins.

Rails is susceptible to Denial of Service attacks because there usually
is a limited number of Rails instances (e.g. through Mongrel) running so
if you have expensive operations (like uploads of large files) they are
likely to block your whole application. There’s several ways around this
problem: Use the web server to serve static files (also cached files and
also private files, e.g. by using X-Sendfile) and use separate clusters
to handle expensive operations so they don’t block your main application
cluster.

As I indicated yesterday, I really love Jonathan’s talks because they’re
full of useful information and he presents it really well for both,
seasoned and less experienced developers. If you didn’t know about
Rails’ potential security issues (most of them, after all, are relevant
for web applications in general and not only Rails applications), this
talk definitely gave you a broad insight in the whole topic of securing
(Rails) web applications. Jonathan gave the same (I think) talk at 24C3
- you can view the video and check out the slides in [his
blog](http://blog.innerewut.de/2008/1/3/24c3-ruby-on-rails-security).
Thumbs up (again) for Jonathan!

Resources:

-   [Presentation](http://assets.en.oreilly.com/1/event/13/Security%20on%20Rails%20Presentation.pdf)
-   [Jonathan Weiss’ blog](http://blog.innerewut.de/)
-   [Peritor](http://www.peritor.com/)
-   [Ruby on Rails Security project](http://www.rorsecurity.info/)

### Keynote - Performance on Rails - Jeremy Kemper

Jeremy talked about Rails 2.2, especially the work that has been done
regarding performance for the upcoming Rails 2.2 release. The question
is: What does the term “performant” actually mean? Jeremy states that
performant actually means user experience. The user doesn’t see good
performance, they only see bad performance (i.e. if things are slow).

With Rails, the standard way seems to be to throw in more hardware - if
you can afford it. The problem, according to Jeremy, is that it’s really
hard to find out where your performance bottlenecks are because the log
file, after all, doesn’t tell you all that much.

He then went on talking about Steve Souders’ 10 rules and the related
YSlow plugin by Yahoo that gives you some guidelines as to how you could
potentially improve the overall performance of your application. You can
find the guidelines [over at
Yahoo](http://developer.yahoo.com/performance/rules.html).

Jeremy said, one way to improve performance is to just do less - meaning
that you should focus on the things you really need to do. Other ways
are caching assets (like images or stylesheets) and using asset hosts.
Using unobtrusive and/or asynchronous JavaScript can improve the
rendering time of a given page. The good news is: We can already use all
this stuff to improve our apps’ performance - very little work which can
result in a massive improvement of user experience.

The important thing is to identify performance bottlenecks. Jeremy
suggests using NewRelic’s RPM for finding these bottlenecks which
apparently prints out really cool graphs that show you where your
application spends a lot of time and which URL produce the most traffic.
It is important to mention, that you shouldn’t necessarily work on
improving long-running requests - if you speed up fast-running requests,
you end up freeing up more resources for the requests that take longer
to process and, finally, also manage to speed up your application.

Jeremy also mentioned FiveRuns’ TuneUp that helps you measure
performance of parts of your application. He also pointed us to
script/performance/request for executing integration tests but in his
opinion you tend to end up with unstructured code, especially when you
start changing your app - it’s a kind of one-off solution. This is the
reason why Rails 2.1 started shipping with performance tests which
behave pretty similarly to Test::Unit and Rails’ integration tests -
except that, of course, it doesn’t print out dots but instead shows you
metrics about the test, e.g. process time, memory allocation, number of
objects and garbage collector time.

RESTful thinking and awareness regarding the options HTTP provides you
with, according to Jeremy, help you a lot with improving the performance
of your site because it enables possibilities for caching and only
transmitting content that really has changed since the last time the
user visited your app. If you check for the “freshness” of a request
early enough during that request, you can cancel the request before
expensive stuff happens and just send the user a Not Modified header so
the browser uses its cached version.

A second big thing to Jeremy is garbage collection. He made his point by
showing the output of a performance test that had 86000 objects which
made the garbage collector run 18 times, amounting to more than 90% of
the total request process time. You can speed up Ruby’s garbage
collection by patching your Ruby with a patch by Stefan Kaes which you
can find in [his GitHub repository](http://github.com/skaes/railsbench).

Finally, it comes down to really dig into the app and profile it from
core - preferably with ruby-prof ([Jeremy’s fork at
GitHub](http://github.com/jeremy/ruby-prof) is compatible with Rails
2.2). With ruby-prof, profiling is just a simple rake test:profile away.
He also showed call graphs using an X11 tool named
[KCacheGrind](http://kcachegrind.sourceforge.net). Afterwards, he went
on demonstrating ways of fragment caching - which can be really hard
because of all the inter dependencies between views and helpers. Jeremy:
“Expect to get it wrong!” Nevertheless, you should design for
cacheability.

Jeremy states that he ended up not so much improving Rails itself but,
rather, its interaction with the browser and HTTP. He ended saying that,
after all, it’s about the user’s experience and happiness and,
ultimately, our own happiness as a programmer - if the user likes our
app (i.e. if they think it performs well), we’re equally happy.

### Resumé Day 2

In retrospective, I think the second day can be deemed a success. Last
years RailsConf was - in my opinion rightly - criticized for its
beginner level presentations and lack of advanced topics. From what I
saw myself and heard from others, this year’s conference has a balanced
mix of topics. Yes, there still aren’t that many really advanced topics
- but then again, that’s not why one goes to a conference, right?

On the other hand there’s networking opportunities en masse. As I
already mentioned, during coffee breaks and lunch break everyone is
mingling and people from all over Europe engage in interesting
conversations about Rails and the whole ecosystem around Rails. Plus,
there’s people from everywhere over Europe and the US which makes it
pretty damn interesting from a cultural perspective.

In short: So far, this year’s RailsConf is worth its money.
