---
title: Avoiding Rails 3 Dependency Hell With RVM
layout: post
year: 2010
published: true
---

You’ve probably read by now that the [Rails 3 beta has been released
last
week](http://weblog.rubyonrails.org/2010/2/5/rails-3-0-beta-release). I
have to admit that I didn’t actively follow the Rails’ development over
the last couple of months so I was quite excited to finally be able to
get my hands on the beta gem.

It turned out to not be so easy to get going with Rails 3 – hence this
post. I want to show you how to get going with Rails 3 without the
hassle that I had – by using [Ruby Version Manager aka
rvm](http://rvm.beginrescueend.com/).

### Don’t Mess With Your Current Environment

If you’re like me, you’ll still have a couple of Rails 2 projects you
need to maintain and it will probably stay that way for at least a
couple of months. Thus, one of your priorities should be to preserve
your environment’s – i.e. your gem setup’s – healthy state.

It turns out that RubyGems is quite a bitch when it comes to runtime
dependency management – which is one of the main reasons why Rails 3
recommends using [Bundler](http://github.com/carlhuda/bundler) over
RubyGems at least for runtime dependency management. However, you still
run into issues with multiple versions of the same gem – say,
ActiveSupport – installed. Or at least I did. You know, these annoying
errors like “Gem::LoadError: can’t activate activesupport (= 2.3.5,
runtime), already activated activesupport-2.3.4” (see Yehuda’s blog post
over on the [EngineYard
blog](http://www.engineyard.com/blog/2009/my-five-favorite-things-about-rails-3/)).

### RVM to the Rescue

These issues gave me a more than valid reason to finally test out rvm.
If you’ve read the post about [how I cleaned up my
system](/2010/01/10/clean-system/), you’ll know that I hitherto used
Ruby as it ships with Snow Leopard (1.8.7p72), putting my gems in my
home directory under a hidden .gem folder.

To have separate environments, I installed rvm together with the newest
Ruby 1.8.7 and activated it.

      ~% rvm use 1.8.7
      ~% gem list
      *** LOCAL GEMS ***
      rake (0.8.7)

Bingo – no gems except for rake (which gets installed with rvm)
installed in the current environment.

### Install the Rails 3 Gems

As the introductory post suggests, the next step is to install Rails’
dependencies manually (you won’t have to do this when the final gem is
released) and Rails itself:

      ~% gem install tzinfo builder memcache-client rack rack-test rack-mount erubis mail text-format thor bundler i18n
      ~% gem install rails --pre

You can verify that you have two properly separated environments by
checking gem lists and, for example, the rails command:

      ~% rvm 1.8.7
      ~% which rails  
      /Users/clemens/.rvm/gems/ruby-1.8.7-p249/bin/rails

      ~% rvm system
      ~% which rails
      /Users/clemens/.gem/ruby/1.8/bin/rails

Neat.

### Switching between Rails versions

rvm makes it really easy to manage your different workspaces. A simple
<code>\~% rvm use \[VERSION\]</code> will enable a given environment. So
whenever you’re working with Rails 3, you just activate the Ruby version
you installed it with. And if you’re maintaining your Rails 2 projects,
you just go back to another Ruby (or, as in my case, your system’s
original Ruby).

### Another Option: rvm’s Gem Sets

When I suggested on Twitter that by using different Ruby versions on rvm
you could circumvent dependency hell, [Prem
Sichanugrist](http://sikachu.com/) replied that you could also use
another rvm feature called [gem
sets](http://rvm.beginrescueend.com/gemsets/). This basically allows you
to have several different gem setups within the same Ruby installation.
You can do this with a slightly altered rvm command:

      # instead of ...
      ~% rvm 1.8.7

      # ... you use ..
      ~% rvm 1.8.7%rails3

This gives you a gem set called rails3 where you can keep your Rails 3
related gems safely tucked away from the rest.

And that’s it – Rails 3 without too many dependency issues.

### Update (13/2/2010)

rvm’s author [Wayne Seguin](http://beginrescueend.com/) just pointed out
that it is even easier to get going with rvm and Rails 3. You can read
more about it in [this gist](http://gist.github.com/296055). Note that
this uses Ruby 1.9.1 which might be a good idea, anyway – if you want to
use Ruby 1.8.7, just replace the relevant lines in the gist.
