---
title: Code with me! – continued
layout: post
year: 2011
---

The overall response to my offer to [Code With
Me](/2011/04/23/code-with-me) was very positive – lot’s of retweets and
encouragement. I also got about two dozen emails from people wanting to
code with me – which may not sound like a lot but I was very happy with
the amount.

Anyway, before I share some details about the first 4 sessions, I just
want to announce that **until further notice and unless I’m otherwise
engaged, the offer continues every Sunday afternoon/evening**. I will do
**one or two sessions** (mostly depending on interest on your side)
roughly between **1pm and 8pm Central European (Summer) Time** (that’s
currently UTC+2) (check out [Every Time Zone](http://everytimezone.com/)
to find out what time this is in your time zone) so everyone between
Hawaii and New Zealand can take the offer if they want to. ;-)

So the next session(s) will be on **Sunday 8 May between 1pm and 8pm
Central European Summer Time (UTC+2)**.

The story will basically stay the same:

-   We can talk via Skype or iChat.
-   We can use TeamViewer, iChat or Skype for sharing your screen
    (please ensure that your firewall/security settings permit this).
-   Please ensure that you have a working Ruby environment and a text
    editor/IDE. I use TextMate – if you don’t have it and/or prefer
    another editor, that’s fine, of course, as long as you don’t make
    fun of me for my low Vim/Emacs/whatever skills. ;-)
-   If you want to work on code for your company, please doublecheck
    with your superior if it’s okay to work on the code with me.
-   Some written feedback (positive, negative, neutral) after the
    session would be much appreciated but, of course, isn’t required.
-   If you’re interested, send me an email at “clemens at thisdomain”.
    Please include some relevant details about you (Ruby/Rails/general
    programming experience), how you would like to spend the time
    (topic(s) to talk about, project information etc.) and which date(s)
    and time(s) would be good for you (you should also include your time
    zone/UTC offset so we can work out times easily). Regarding
    projects: The first few sessions showed that it really pays to use
    an actual project as a basis for work/discussion. I don’t mind
    whether this is a personal or company project or what the current
    status is – the only requirement (of sorts) is that you have an idea
    what you want to work on.

I will definitely respond to every email I get – if I’m busy, that might
take 1 or 2 days.

Now, let me share a few details about the first 4 sessions with you.

### Andrea Singh

Andrea had a concrete problem with using Sphinx in the open source
application she’s been working on for the last couple of months ([the
Zurich University of Arts’ media
archiv](https://github.com/psy-q/madek)). She’s been using [Thinking
Sphinx](http://ts.freelancing-gods.com) – which has been tedious, mainly
because owing to the application’s architecture they had decided to use
[XML rather than SQL data
sources](http://sphinxsearch.com/docs/manual-1.10.html#xmlpipe2).

The main point we’ve figured out is that she probably wants to use
[Riddle](http://riddle.freelancing-gods.com) (the Sphinx library
underlying Thinking Sphinx) rather than Thinking Sphinx to query the
indexes: While you could theoretically use Thinking Sphinx, it really is
optimized on being used solely with ActiveRecord. Take a look at [the
gist](https://gist.github.com/924493) that I’ve written for [a
discussion on making Thinking Sphinx’ facets faster in newer versions of
Sphinx](http://groups.google.com/group/thinking-sphinx/browse_thread/thread/af85d59e6f66c53d)
to get an idea of how to build a search (or facet) interface that is
similar to Thinking Sphinx’ API but uses pure Riddle. The payoff is that
you have full control about what’s going on.

Here’s Andrea’s feedback:

> I had a great pair programming session with Clemens yesterday. I was
> grappling with a problem that I’ve been working on for some time. I
> was quite impressed by his ability to grasp the scope and details of
> the project after just a brief introduction. It was also very
> interesting for me to see how another developer would approach the
> same issue. The code samples we discussed opened up a whole new
> perspective. Clemens was altogether very approachable and pleasant to
> work with. I would definitely like to keep contact in the future.

If you’re interested, [follow her](http://twitter.com/madebydna) and
check out her [blog](http://blog.madebydna.com/). She told me that she’s
starting freelancing again – from what I’ve seen, she definitely knows
how to code – so hire her (that is, if you decide to not [hire
me](/hire) instead ;-)).

### Chris Floess

Chris wanted to work with me because he had difficulties deciding where
(model? view? controller?) to put a form generator (think
[Wufoo](http://wufoo.com/) but simpler) and how to test it.

We discussed that in my opinion it *should* go into the model (after
all, it’s business logic) – however, since Rails’ form helpers aren’t
available to models (and trying to hack them in usually results in a
mess – as does manually generated HTML), the most pragmatic choice would
be to put it in a helper method because all Rails helpers are available
there and it’s also easy to test. So we went ahead and extracted the
logic that had been a partial before into a helper method and wrote a
proper test for it.

Overall, Chris and I had some interesting things we discussed in terms
of application architecture – it often boiled down to how Rails
interprets the [Model-View-Controller
pattern](http://en.wikipedia.org/wiki/Model_View_Controller) (which
isn’t everybody’s cup of tea) and the classic problem of having too much
logic in your (procedural) views.

If you’re interested, he twitters as
[@flooose](http://twitter.com/flooose).

### Alejandro Cadavid

Alejandro had a couple of specific questions. The first was a “classic”.
Consider this code:

{% highlight ruby %}
# products_controller.rb
def create
  @product = Product.new(params[:product])
  brand = Brand.find_by_name(params[:brand_name])
  brand ||= Brand.create(:name => params[:brand_name])

  # ...
end
{% endhighlight %}

While it’s fairly clear what this code does, it’s not ideal. First of
all, Rails has the `find_or_create_by` shortcut method to do these two
things in one go. Second, the better solution in my opinion would be to
use a virtual attribute:

{% highlight ruby %}
# product.rb
def brand_name
  brand.try(:name)
end

def brand_name=(brand_name)
  self.brand = Brand.find_or_create_by_name(brand_name)
end
{% endhighlight %}

With that code you can just treat `brand_name` as another attribute of
the product model in the form – no additional code in the controller is
needed. If you’re unfamiliar with virtual attributes, I suggest you
check out the
[Railscasts](http://railscasts.com/episodes?utf8=%E2%9C%93&search=virtual+attributes)
on that topic.

Another cool thing that we discussed was the use case where you use the
same form to generate different models – for example with [Single Table
Inheritance](http://api.rubyonrails.org/classes/ActiveRecord/Base.html)
or nested forms that contain an object from a [Polymorphic
Association](http://railscasts.com/episodes/154-polymorphic-association).
Alejandro had something like this:

{% highlight erb %}
<%# view %>
<%= select_tag 'type', options_for_select('Audio' => 'audio_file', 'Video' => 'video_file', 'Text' => 'text_file') %>
<fieldset id="fields_for_audio_file" style="display:none;">
  <%= file_field_tag 'audio_file[file]' %>
  ...
</fieldset>
{% endhighlight %}

{% highlight ruby %}
# controller
case params[:type]
when 'audio_file'
  @file = AudioFile.new(params[:audio_file])
when 'video_file'
  @file = VideoFile.new(params[:video_file])
when 'text_file'
  @file = TextFile.new(params[:text_file])
end
{% endhighlight %}

The relevant fieldset is toggled via JavaScript when the select field
changes. Due to the fine [Convention over
Configuration](http://en.wikipedia.org/wiki/Convention_over_Configuration)
Alejandro had already intuitively used, we could cut down the controller
code to something like this:

{% highlight ruby %}
valid_types = %w(audio_file video_file text_file) # or something like AbstractFile.subclasses.map { |klass| klass.name.underscore }
if valid_types.include?(params[:type])
  klass      = params[:type].classify.constantize
  attributes = params[params[:type]]
  @file      = klass.new(attributes)
end
{% endhighlight %}

Note the explicit whitelisting of allowed types to avoid both errors and
misuse. The code hasn’t become that much shorter in terms of lines of
code (unless you have many different types) but in my opinion it’s
clearer, more flexible and more extensible.

There might have been something else that we’ve discussed but if so,
both Alejandro and I forgot. ;-)

Alejandro twitters at [@acadavid](http://twitter.com/acadavid).

### Chris Berkhout

Chris had a question regarding caching and one regarding screen scraping
and how to test it.

Chris had a KML file to render an overlay on a Google Map. There’s be
one KML file for all users that changes only once per day. The first
option in this case would be to use [Rails’ page
caching](http://railscasts.com/episodes/89-page-caching): Cache the page
when it’s accessed so it’s persisted on disk, then use a cron job to
remove it as often as you want or need. A second – and more flexible but
less performant – approach is to use fragment caching with dynamic,
self-invalidating cache keys. Consider this:

{% highlight ruby %}
# show.kml.builder
cache("#{Date.current.strftime('%Y/%m/%d')}/overlay") do
  # ...
end
{% endhighlight %}

As soon as the date changes, you’ll have a cache miss and a new fragment
is cached. There’s more to this approach – I’ll try to publish a blog
post on it soon because I think it’s worth sharing.

Regarding screen scraping, I had two hints for Chris and now for you:

-   If you only do simple scraping, you can use
    [open-uri](http://www.ruby-doc.org/stdlib/libdoc/open-uri/rdoc/)
    together with a simple HTML/XML library like
    [REXML](http://www.ruby-doc.org/stdlib/libdoc/rexml/rdoc/index.html),
    [Hpricot](https://github.com/hpricot/hpricot) or
    [Nokogiri](https://github.com/tenderlove/nokogiri) (depending on
    your preference and/or performance needs). [Ilya
    Grigorik](http://twitter.com/igrigorik) has written a cool [tutorial
    for using open-uri and Hpricot to scrape
    pages](http://www.igvita.com/2007/02/04/ruby-screen-scraper-in-60-seconds/).
-   For more complex projects (and/or if you prefer more declarative
    code), consider using a dedicated screen scraping library like
    [scRUBYt!](https://github.com/scrubber/scrubyt) or
    [scrAPI](https://github.com/assaf/scrapi) or even writing your own
    (most libraries I’ve seen don’t seem to be actively maintained).
    I’ve worked with scrAPI in a pet project and it works reasonably
    well.

Both are problems he ran into when looking at mapping travel safety
advice. The source code is [available on
GitHub](https://github.com/chrisberkhout/cango) and deployed to
[CanGo.to](http://cango.to).

Chris then showed me (awesome! – shows that my idea goes both ways!)
some stuff regarding server administration and deployment. Definitely
check out [babushka](http://babushka.me/) which seems to be a great tool
for quickly setting up test/demo servers (for production, I still prefer
another tool: [the good old system
administrator](http://www.youtube.com/watch?v=FE_p5N89XQI) ;-)). The
[author’s](https://github.com/benhoskings/babushka-deps/) and [Chris’
own](https://github.com/chrisberkhout/babushka-deps/) deps can both be
found on GitHub. Chris’ rake-based deployment solution called [RAG
Deploy](https://github.com/chrisberkhout/rag_deploy) is also on GitHub.
It seems to have some features similar to Capistrano as well as more
direct version control integration (think [Heroku](http://heroku.com)).
To be honest, I’m not sure what to think about it but I think it’s great
that people are constantly working on making the tedious process of
deployment easier.

Here’s what Chris said:

> Thanks for taking the time to chat and look at some code. There are a
> lot of great resources out there, but having a real person give some
> advice and talk through the issues is always helpful, and with you it
> was a pleasure!

Overall, I was very pleased with how the sessions turned out – which is,
of course, why I’m continuing the offer.
