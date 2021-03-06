---
title: Using Cucumber to test a multilingual app
layout: post
permalink: /articles/2009/09/12/using-cucumber-to-test-a-multilingual-app
year: 2009
---

Last week I gave [my i18n
talk](http://www.slideshare.net/clemensk/rails-i18n-from-the-trenches)
from [Rails Underground](http://www.rails-underground.com/) (slightly
updated) at our local [Ruby Usergroup Berlin
(RUG-B)](http://www.rug-b.com/). After the talk, a question came up that
raised quite a bit of discussion: How do you test translations in
Cucumber or - in general - integration tests. While
[Henning](http://www.netalive.org/swsu/) has already [summarized what
was
said](http://www.netalive.org/swsu/archives/2009/09/should_i_test_for_translated_strings.html),
I want to take on the opportunity to take a closer look at this issue.

### The Problem

To illustrate the problem, let’s look at the example that Henning uses
in his blog post:

    When I go to my bookings page
    And I press "Delete booking"
    Then I should see "Booking deleted"

So far, nothing special - pretty much your average Cucumber scenario.
Assume that you have a multilingual page, say, English and German, so
you have extracted all localized strings with some kind of translation
API (hopefully [Rails i18n](http://rails-i18n.org) ;-)). Looking a bit
closer, the problem here is twofold:

1.  You can’t change the English translations for “Delete booking” and
    “Booking deleted” (and there’s probably a couple of hundred more
    strings in your app anyway).
2.  You can’t run your Cucumber stories with any other locale but
    English (but you should!).

Some people might dismiss the first issue because this also holds true
for monolingual apps (especially if Cucumber stories are written by
developers and texts come from the marketing department or similar) but
the latter is a real and undeniable issue: Not being able to run your
app in all locales provided means that you can’t prove that your app
actually works for all locales.

While Cucumber provides us with the possibility to write our tests in
our language of choice, there doesn’t seem to be a way to cleanly test
multilingual apps across all its locales (yet). So let’s look at some
potential solutions that were discussed after my talk.

### Solution \#1 - Using a separate testing locale

One of the first solutions we discussed was using a separate locale for
testing (think en-testing instead of just en). Advantages: You’re still
able to use good old strings in your scenarios and nothing breaks when
translations in the “real” locales are changed. Disadvantages: Still no
way to run your features across different locales and you’ll still break
your tests if you change your keys. Plus you have to maintain an
additional (unnecessary) locale.

In short: From my perspective, the only acceptable scenario for using
this approach could be a monolingual app that still uses i18n so that
translators don’t have to mess with your files directly - but even then,
it’s hard to justify the additional effort of maintaining the otherwise
useless testing locale.

### Solution \#2 - Use i18n keys instead of strings

[Nico](http://www.hagenburger.net/) suggested the following approach to
circumvent the problem:

    When I go to my bookings page
    And I press "bookings.index.delete"
    Then I should see "bookings.index.deleted"

The corresponding steps would look something like this:

{% highlight ruby %}
When /^I press "([^\"]*)"$/ do |key|
  click_button(I18n.t(key)) # or even I18n.t(key, :default => key) if you want to be able to use the key itself as the default
end

Then /^I should see "([^\"]*)"$/ do |key|
  response.should contain(I18n.t(key))
end
{% endhighlight %}

This has two obvious advantages: First of all, it works across different
locales. Moreover, you only ever need to touch your scenarios if you
change your i18n key structure (and if you need to do this, you probably
have way bigger problems on your plate than fixing a couple dozen
steps).

However, apart from my personal distaste - I think, it just looks
artificial and weird - this effectively takes away one of Cucumber’s
biggest advantages over other integration testing approaches: its
natural language look. This also means it gets more difficult to discuss
your scenarios with non-technical people (“What the heck does
bookins.index.deleted mean?”). Without that, why not just use plain
Rails Integration Tests with Webrat?

If you’re fine with the (subjective) ugliness of using keys in your
scenarios, I’d only recommend using this approach if you use Cucumber
exclusively as a means to integration testing and if it’s not an
important part of the communication with your (non-technical) customer.

### Solution \#3 - Use your old friend, the DOM

Finally, let’s take a look at the approach I suggested: using the DOM
instead of relying on strings. What I had in mind actually slightly
differs from the example Henning uses in his post - I thought of
something like the following:

    When I go to my bookings page
    And I click the delete button for booking with title "My booking"
    Then I should see a confirmation message

The corresponding steps would look like this:

{% highlight ruby %}
When /^I click the (.+) button for (.+) with (.+) "([^\"]+)"$/ do |action, model, field, value|
  model = model.gsub(' ', '_')                    # so "forum topic" becomes "forum_topic"
  field = field.join(' ', '_')                    # same same
  klass = model.classify.constantize
  object = klass.send("find_by_#{field}", value)

  click_button("#{action}_#{model}_#{object.id}") # e.g. delete_booking_1
end

Then /^I should see a (.+) message$/ do |type|
  response.should have_tag("#flash.#{type}")
end
{% endhighlight %}

Note: I haven’t tested this code.

We do something similar in [adva-cms](http://adva-cms.org) - albeit
without Cucumber, we use good old Rails Integration Tests - which is, I
would guess, one of the bigger i18n-powered apps out there. After first
also relying on labels and texts, we pretty soon figured out that we
broke our build whenever we decided to change some small and seemingly
insignificant text (imagine changing “Upload »” to “Upload” because you
use an additional image instead of »). After quite a bit of (heated)
discussion, we decided to sacrifice test readability for robustness and
switched to (mostly) using DOM ids instead of texts/labels. The problem
with decreased readability doesn’t really apply to Cucumber, though,
since it abstracts away the actual stories from the code that implement
their steps.

Here’s what I see as advantages:

-   The Cucumber scenarios still read natural. I would even argue that
    saying that I “click the delete button” is more expressive than
    saying that I “follow/press Delete”.
-   No arguments with the customer about wording at this point (“The
    message should say ‘We are sorry that you cancelled your booking’
    instead of ‘Booking deleted’, that’s just too blunt.”) - it’s just a
    confirmation message (whatever that may mean).
-   Relies on the DOM which - at least in terms of CSS ids and classes -
    isn’t likely to change quite as easily as translations. This holds
    true even more if your app relies heavily on JavaScript/AJAX because
    if you change your DOM that also means JavaScript stuff (and who
    wants to do that, really?). Plus, in my opinion you get improved
    markup for free.
-   The only string the steps depend on is, in this case, the booking’s
    title which is most probably set up in some kind of fixture or
    scenario Background and therefore not likely to change.
-   With a little tweaking and sticking to some conventions of your
    choice, this should work flawlessly across models …
-   … and more importantly across locales. Let the translators do their
    harm, err, work without having to worry about them breaking your
    tests. And, of course, you’re able to run your stories in any
    locale.

Disadvantages:

-   Obviously doesn’t validate that the delete button and the
    confirmation actually contain texts. On the other hand, you can set
    up i18n so that it raises exception if it can’t find a translation.
-   Of course, this diversion from the “Cucumber way” is debatable and
    definitely a matter of taste.
-   Some steps might need some additional logic and therefore be a
    little more brittle than they probably should be.
-   Most Cucumber steps have to either be tweaked or be completely
    rewritten.

So, if you are keen on getting maximum test robustness in terms of i18n
and you are willing to slightly change your usual way of using Cucumber,
I think this (or something based on this) definitely is the way to go.

### What Do You Think?

I’m curious what you think - even more than usual because i18n is one of
my favorite topics. I’m especially keen on getting some thoughts from
people who might have already come up with solutions for the mentioned
problem - please do share your insights!
