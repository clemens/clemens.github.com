---
title: "Plugin: localized_dates"
layout: post
permalink: /articles/2008/08/07/localized-dates-plugin
year: 2008
---

After nearly two years of Rails development it’s more than time that I
released my first (official) plugin. So here it goes.

If you’ve watched Rails on
[Lighthouse](http://rails.lighthouseapp.com/projects/8994-ruby-on-rails/)
and [GitHub](http://github.com/rails/rails) lately, you’ve probably
noticed that I’ve proposed quite a number of patches, especially
regarding the new [Rails i18n plugin](http://rails-i18n.org/) (which by
the way got me the 2nd place in the [July 2008 Rails
Hackfest](http://hackfest.rubyonrails.org/2008/7) - congrats to Tarmo
Tänav at this point).

However, the date and time API got only partial i18n/l10n coverage -
date and time formatting wasn’t included - which is where my new plugin,
localized_dates, might come in handy.

The quickest way to get going is to simply install the plugin from its
GitHub repository:

    $ ./script/plugin install git://github.com/clemens/localized_dates.git

As part of its installation, this will copy two locale files (en-US.rb
and de-AT.rb) to your config/locales folder. en-US is basically there to
keep the current functionality and date definitions in place. de-AT
serves as a demo on how you can write your own locale.

If you need any further help, I suggest reading the [README over at
GitHub](http://github.com/clemens/localized_dates/tree/master/README).

If you like it, consider rating it at its [Agile Webdevelopment plugin
page](http://agilewebdevelopment.com/plugins/localized_dates).
