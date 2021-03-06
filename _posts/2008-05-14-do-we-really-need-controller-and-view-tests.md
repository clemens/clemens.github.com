---
title: Do we really need Controller and View tests?
layout: post
permalink: /articles/2008/05/14/do-we-really-need-controller-and-view-tests
year: 2008
---

Every project has unique requirements but one requirement always stays
the same: It needs to be tested. Thoroughly.

In the last few projects, I’ve grown quite fond of Behavior Driven
Development, or, more specifically, [rspec](http://rspec.info). rspec -
when used with Rails - allows you to independently test your models,
controllers, views and even helpers. When used correctly, it serves as
both, test and documentation of your code and what it should or should
not do.

So rspec gives you the possibility to test every bit of your
application, including real user stories (using the *stories* feature).
If you want, you can (and maybe should) even sit down with and write the
specs and stories together with your customer. This helps you and the
customer to get a better understanding what the application should and
should not do.

But question is: What do you really **need** to spec?

(Note: Usually when I’m talking about “specs” in this article, the same
applies to unit/functional tests and vice versa.)

### Rules of thumb

Many popular (and less popular) Rails figureheads have posted their
opinions on what a well designed Rails application should look like.
Here’s the gist of it:

-   **Don’t overload controllers with responsibilities**. Put logic in
    your models instead. This approach is usually called “skinny
    controller / fad model” (Jamis Buck wrote about it
    [here](http://weblog.jamisbuck.org/2006/10/18/skinny-controller-fat-model)
    and
    [here](http://www.therailsway.com/2007/6/1/railsconf-recap-skinny-controllers),
    Courtenay of caboo.se also wrote an
    [article](http://www.therailsway.com/2007/6/1/railsconf-recap-skinny-controllers)).

<!-- -->

-   **Keep views clean of logic**. Instead, put logic in your models and
    helpers.

If you’re following these two rules, this leaves you with fat models and
helpers and skinny controllers and views. Obviously, something that has
got lots of logic in it should be tested thoroughly - so we should
definitely test models and helpers.

The question is, should we also put efforts into testing the -
comparatively - simple controllers and views?

### Specing controllers and views

If you’ve ever done it, you know that testing views and especially
controllers can be quite tedious. Let’s take a look at the specs that
rspec creates when using the rspec_scaffold command:

<code>./script/generate rspec_scaffold Product name:string
description:text</code>

Running rake stats gives me the following output:

    +----------------------+-------+-------+---------+---------+-----+-------+
    | Name                 | Lines |   LOC | Classes | Methods | M/C | LOC/M |
    +----------------------+-------+-------+---------+---------+-----+-------+
    | Controllers          |    95 |    64 |       2 |       7 |   3 |     7 |
    | Helpers              |     5 |     4 |       0 |       0 |   0 |     0 |
    | Models               |     2 |     2 |       1 |       0 |   0 |     0 |
    | Libraries            |     0 |     0 |       0 |       0 |   0 |     0 |
    | Model specs          |    11 |     9 |       0 |       0 |   0 |     0 |
    | View specs           |    90 |    68 |       0 |       0 |   0 |     0 |
    | Controller specs     |   374 |   288 |       0 |      11 |   0 |    24 |
    | Helper specs         |    11 |     7 |       0 |       0 |   0 |     0 |
    +----------------------+-------+-------+---------+---------+-----+-------+
    | Total                |   588 |   442 |       3 |      18 |   6 |    22 |
    +----------------------+-------+-------+---------+---------+-----+-------+
      Code LOC: 70     Test LOC: 372     Code to Test Ratio: 1:5.3

### Controller specs

As you can see, a fully RESTful default controller (i.e. it responds to
the 7 default REST actions) that serves two content types (HTML and XML)
takes up 288 lines of test code for only 64 lines of actual
implementation.

If you take a closer look at the generated specs, you can see that rspec
splits the controller test in two parts, namely specs of the controller
itself (./spec/controllers/products_controller_spec.rb, 313 lines) and
specs of the routing (./spec/controllers/products_routing_spec.rb, 61
lines). Bear in mind that we’re talking about a really **basic**
controller here.

What happens if we want to add other actions to the controller like -
say - a way to order our products list? What if we want to build an AJAX
interface? What if we want to support another content type (e.g. PDF)?
Every little addition to the controller bloats the spec a little more,
depending whether all actions need additions and therefore additional
specs (like adding AJAX support) or only to certain actions (like PDF
support for maybe the *show* and *index* actions).

### View specs

What about view specs? These tend to be a lot shorter. They usually
“mock” the controller by assigning some instance variables in the
*before* block and then test for the presence of certain HTML tags and
structures. Most people ([Geoffrey
Grosenbach](http://peepcode.com/products/rspec-controllers-and-tools)
among others) seem to agree that view specs makes sense as long as they
don’t get too specific. Geoffrey mentions in his screencast that he
usually only tests for things that really **matter**: If there needs to
be a form on a page (e.g. the *new* template), you should check that it
is present and maybe also check that all the fields are there:

{% highlight ruby %}
response.should have_tag("form[action=?][method=post]", products_path) do
  with_tag("input#product_name[name=?]", "product[name]")
  with_tag("textarea#product_description[name=?]", "product[description]")
end
{% endhighlight %}

What if we want to spec our AJAX stuff? rspec provides us with the
*have_rjs* matcher that basically wraps Rails’ *assert_select_rjs*. If
you’ve ever worked with assert_select_rjs, you know that everything
quickly gets out of hand, especially if a certain AJAX call updates
multiple elements on the page.

### So *should* we spec controllers and views?

This post is about whether or not - in my opinions - we should test
controllers and views and I haven’t answered that question yet. So here
it goes.

-   I tend to trust the framework a little: **I don’t test the standard
    stuff that everyone uses in their everyday application**. So if my
    *update* action only calls *update_attributes* on a certain model
    and then redirects to some page, I don’t write a spec for it. If I
    do, it tends to be short and to the point - compared to the rspec
    standard test that has over 50 lines of code!

<!-- -->

-   **When adding custom actions, it’s a good idea to test them**. So if
    you add an action to reorder your products list, you should
    definitely write a test for it. If you do, however, I’d suggest
    breaking one little rule of TDD/BDD: In controller specs, I don’t
    like mantra of having only one *assert* or *should* per test. You
    can do this because in controller specs you usually only test that
    certain instance variables were set and that a certain template is
    rendered or the user’s being redirected.

<!-- -->

-   **Test routing whenever you use anything more sophisticated than
    basic *map.resources***. Rails parses the routes file in the order
    the routes are defined, meaning if a URL is caught by two different
    routes, the first route wins. Testing all available URLs/routes in
    your application ensures that you don’t accidentally map one URL to
    multiple routes.

<!-- -->

-   **Testing views makes sense if you don’t go into too much detail**.
    It’s a good idea to test for the presence and basic structure of a
    form or an error/success message.

<!-- -->

-   **It makes plenty of sense to test parts of your page that have
    restricted access**. If your page has an admin area or some pages
    that only logged-in users can view, you should definitely test that
    this works correctly. It saves you the hassle to keep dozens of test
    accounts for every different user type and situation, especially if
    you also have some kind of role-based permission system where -
    theoretically - an infinite number of setups is possible.

<!-- -->

-   **You should absolutely test RJS templates**. It’s hard enough to
    debug applications that make heavy use of AJAX anyway. Rails’
    *assert_select_rjs* is one mighty tool to make it a little easier,
    once you’ve understood how to use it. Familiarize yourself with the
    options and test, test, test.

<!-- -->

-   \*If you provide an API, put every effort into specing and testing
    it. Especially if you want to charge people for using it! ;~~)\*
    Test that XML/JSON/whatever responses work correctly. Test for
    status codes. Test everything. And most importantly: Within your
    application you can change specs if a spec turns out to be incorrect
    and/or outdated. Don’t do this with APIs, once you’ve released them
    to the public unless you absolutely know what you’re doing! Your API
    should **always** be backwards compatible~~ that means, you
    shouldn’t change existing specs but only extend them.

<!-- -->

-   Since this is an article about controller and view tests, I haven’t
    really talked about testing models and helpers. That doesn’t mean
    you shouldn’t test them thoroughly. **Test *all* your models and
    helpers**. If you have a Code-to-Test-ratio over 1.0 (i.e. less
    lines of code in tests than in models/helpers), it’s quite likely
    that something’s terribly wrong.

### Check how well your code is covered with rcov

Finally, I’d like to recommend a tool that can be quite useful:
**rcov**. rcov basically tests how well your code is covered by your
specs or tests. It executes all specs/tests and analyzes which lines
have been executed and which haven’t. It then creates some neat HTML
documents that tell you exactly how well your code is covered by your
specs/tests and highlight the areas of your code that haven’t been
executed. Install the gem by typing

    $ gem install rcov

You can then run it using the following command:

    $ rake spec:rcov

This generates (or updates) a directory named “coverage” in your
application’s directory, containing multiple HTML files. Just open the
*index.html* in your browser of choice and take a look at the output.

### What do you think?

What are your opinions on specing/testing controllers and views or
BDD/TDD in general? Do you think I’m wrong? Do you want me to write a
more extensive article about BDD/refactoring/etc.?

Let me know what you think!
