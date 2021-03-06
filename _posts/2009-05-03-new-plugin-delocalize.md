---
title: "New plugin: delocalize"
layout: post
permalink: /articles/2009/05/03/new-plugin-delocalize
year: 2009
---

It’s been a long time (again) since the [last blog
post](http://www.railway.at/articles/2009/02/07/dont-let-implementation-issues-affect-user-experience)
- lazy me, I know. But I’ve been crazily busy over the last couple of
weeks: The moving into my new flat still isn’t quite finished and there
are quite some projects I’ve been working on, most notably
[adva-cms](http://github.com/svenfuchs/adva_cms) which we’ve pushed to
[version
0.2](http://adva-cms.org/2009/4/28/out-now-adva-cms-0-2-0-the-accessibility-release)
last week, including a 100% rework of the whole admin interface. Since
there are many people asking questions on the [mailing
list](http://groups.google.com/group/adva-cms) and we still don’t have
any real documentation, you should check back over the next few weeks as
I’ll try to do some hands-on tutorials on adva-cms.

In the meantime let me announce my latest plugin effort:
[delocalize](http://github.com/clemens/delocalize).

### New plugin: delocalize

Here’s a rundown of how delocalize came into being.

A customer wanted a simple JavaScript datepicker for their website.
While I can see why some people might like them, personally, I’m not too
fond of them - especially in a localized context. Some datepickers offer
possibilities to localize dates in the sense that you can translate
month and day names - however, they still output dates in some good old
English format including English names which is, in my opinion, a
usability nightmare, but it’s the only way it can be properly parsed.
Some are even worse: They use English formats as their output but use
localized month and day names - thus not only sucking in terms of
usability but also nigh impossible to parse. A minority of more decent
solutions - like the [jQuery UI
Datepicker](http://jqueryui.com/demos/datepicker/) - do however support
displaying a different format from the one that’s actually submitted
behind the scenes. While this is a more than decent solution, I still
think that localized date parsing should also be supported on
application level.

Plus, there’s another issue to tackle (also in the same customer
project): Parsing of localized numbers. Not all countries use the
decimal point as the decimal separator - in fact, all of Europe except
the UK and all Latin American countries except Mexico use the decimal
comma (see the [Wikipedia
map](http://en.wikipedia.org/wiki/File:DecimalSeparator.png)).

So far, what I used to do - and I’m sure you did pretty much the same -
was to implement some custom attribute writer to handle the parsing:

{% highlight ruby %}
def price=(price)
  write_attribute(:price, price.gsub(/[^0-9,]/, '').gsub(',', '.'))
end

def publish_at=(publish_at)
  # ...
  # some more or less complex parsing logic
  # ...
  write_attribute(:publish_at, publish_at)
end
{% endhighlight %}

And, of course, if you wanted your forms to show localized output, you
had to play the same game in reverse. No more: Use delocalize instead!

### Below the Surface

delocalize mainly consists of a parser for localized dates and times and
a few Ruby and Rails hacks. I’ve tried to implement everything at the
lowest possible level to minimize side effects. Here are the hacks:

-   I use alias_method_chain on ActiveRecord’s
    `convert_number_column_value` which is called internally in
    `write_attribute` for all numeric columns. In this method, I do
    pretty much the same as I used to do in attribute writers: Replace
    everything except numbers and the decimal separator (this time, of
    course, looked up from the locale) and then replace the decimal
    separator with a decimal point.
-   The date/time hack consists of two parts: I alias_method_chain
    `write_attribute` to branch out for dates and times and call the
    parser from there. Unfortunately, thanks to Rails’ time zone
    implementation, I also need a rather icky hack to parse time zone
    aware dates and times as the time zone parsing takes place
    **before** the actual call to `write_attribute`.
-   Finally, I hacked ActionView’s (or InstanceTag’s, to be more
    specific) `to_input_field_tag` which is responsible for building
    text fields through a form builder. All this does is reverse the
    whole process, i.e. localize numbers and dates again.

Information on how to use delocalize can be found in the [GitHub
repository](http://github.com/clemens/delocalize) where you can, of
course, also download it.

### Feedback

This is still highly experimental stuff and I don’t know all facets
about all exotic languages and their special date and number rules. If
delocalize doesn’t support some of your locale’s specific requirements,
please let me know - ideally with a specific test case and (even better)
a working patch. Also note that I’m grateful for every hint as to how I
might be able to get rid of the ugly time zone-related hack I had to
use.

In the meantime: Test it and let me know what you think. Also check out
my other i18n plugins
[localized_dates](http://github.com/clemens/localized_dates) and
[LaterDude](http://github.com/clemens/later_dude). And if you like my
work and/or my blog, please subscribe and consider recommending me on
[WorkingWithRails](http://www.workingwithrails.com/person/8252-clemens-kofler).
