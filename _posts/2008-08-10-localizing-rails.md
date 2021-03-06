---
title: Localizing Rails
layout: post
permalink: /articles/2008/08/10/localizing-rails
year: 2008
---

After releasing the [localized_dates
plugin](http://www.railway.at/articles/2008/08/07/localized-dates-plugin),
I thought that it’s about time that someone wrote a comprehensive
tutorial on how to fully leverage the power of the current [Rails i18n
implementation](http://rails-i18n.org/).

Granted, Trevor Turk wrote a pretty cool [tutorial that shows simple
localization in
Rails](http://almosteffortless.com/2008/07/21/simple-localization-in-rails-22/),
but it’s missing details on how number formats, dates, etc. can be
localized. This is where my tutorial starts.

For a change, I decided not to write a long article about it. Instead, I
created a demo app that uses the i18n features (plus my localized_dates
plugin) **and** has all the tutorial texts in the app itself. We’ll see
if this kind of tutorial works - if so, I’ll probably continue working
this way in the future.

Here’s what you do:

    $ git clone git://github.com/clemens/i18n_demo_app.git
    $ cd i18n_demo_app
    $ ./script/server

Then fire up your browser and go to localhost:3000 - the index page
should be loaded automatically.

For now, this tutorial app includes info on how to localize:

-   Date and Time Formats
-   DateHelper (forms)
-   NumberHelper
-   ActiveRecordHelper (incomplete)

Feedback, as usual, is appreciated!

### Translations/Forks

[Fabio Akita](http://www.akitaonrails.com/) has forked the demo app on
GitHub and translated it to Portuguese. If you want to translate it to
other languages, that’s perfectly fine by me! Leave me a note in the
comments and I’ll add your translation to the list.

Translations:

-   Australian English by [Dr Nic Williams](http://drnicwilliams.com)
-   Portuguese (Brazilian) by [Fabio Akita](http://www.akitaonrails.com)
-   Spanish (Argentinean) by [Leandro Marcucci](http://leanucci.com.ar)
-   Japanese and content translation by [Masayuki Nakamura and Simon
    Tokumine](http://www.japancentre.com)
-   Thai by [Prem Sichanugrist](http://sikachu.com)
