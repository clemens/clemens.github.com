---
title: Towards a Really Clean System
layout: post
year: 2010
published: true
---

Some time ago, [Yehuda Katz](http://yehudakatz.com/) posted some ideas
on how to keep [his
system](http://yehudakatz.com/2009/05/15/quest-for-a-clean-machine/) and
[his code
directories](http://yehudakatz.com/2009/05/30/my-code-directory/) clean.
When I had issues with my MacBook Pro lately (which was still on
Leopard), I finally decided to just erase everything and start a clean
Snow Leopard setup like I did with my iMac a couple of months ago.

### How I Fucked it up - Big Time

I bought my MBP back in 2007 and it was my first Mac - and although I
had used Linux for a while before and compiled some things every now and
then, I didn’t know a whole lot about compiling, let alone about Mac OS
X’s internals and just followed tutorials. So, naturally, everything got
a bit messy quite soon - and even more messy after I stumbled across
[MacPorts](http://www.macports.org/) and decided that it might suit me
just fine. So I ended up with probably 3 different version of MySQL,
Ruby etc. - scattered in /Library, /usr/local and /opt.

Pretty much the same thing held true for my code, documents, etc.:
Everything was all over the place and while it had **some** kind of
structure, it certainly wasn’t organized all that well. Finally, when I
started to do full-time freelancing, I became increasingly frustrated by
the fact that my code was in some place and specifications, examples
etc. that I had received from my client were somewhere else entirely.

### Towards a Better Environment

A couple of weeks ago, I used my iMac as a kind of test environment for
better organization. I did this because I use my MBP every day at work
and can’t really risk having issues with it. The iMac, on the other
hand, is my home computer and while I do use it for development at home,
I still have my MBP as a fallback if something goes wrong.

I had a couple of iterations where I tried out different things and
switched to the next idea whenever I was unhappy with the result of the
last iteration. After some iterations, I think I’ve finally found a
setup that works for me.

### My Clean Setup

Disclaimer: My environment suits me - that’s why it’s **my**
environment. If it doesn’t suit you, it might at least give you some
ideas for your own perfect setup. However, I’m glad to hear some
opinions on what I might want to change to further improve it!

#### Basic Setup

First of all, of course, I installed Snow Leopard. Since I had messed up
my setup so badly, I decided to completely erase my disk (after doing a
full Time Machine backup, of course) and set up a clean OS X.

Next, I needed Xcode. I decided to get the [newest version
online](http://developer.apple.com/tools/xcode/) instead of installing
the older one from the Snow Leopard DVD.

Finally, since I use the shell a lot, I needed some decent setup there
as well. I use [zsh](http://www.zsh.org/) like pretty much every (Rails)
developer I know because it’s awesome. Taking a shortcut with
configuration, I went with [Ryan Bates’](http://railscasts.com)
[dotfiles](http://github.com/ryanb/dotfiles) as they provide a good
starting place.

#### Homebrew

Thanks to some recommendations via Twitter, I tried out
[Homebrew](http://github.com/mxcl/homebrew). Apparently, it’s **the**
new cool thing in terms of package management - at least if you believe
[the hype](http://twitter.com/#search?q=%40machomebrew). One of the
things that really ate up disk space when I was still using MacPorts was
that it always installed a real shitload of unnecessary stuff - mostly
optional packages and stuff I already had installed by hand or via a DMG
(and MacPorts doesn’t care about anything but itself). Homebrew
significantly decreases this overhead and it’s really clean.

After first having it installed in <code>/usr/local</code> (just as the
README suggests), I decided to move it to my home directory -
<code>$HOME/local</code>, to be more exact, because I wanted it to be
separated from the rest of my home folder’s contents. I decided against
<code>/usr/local</code> not because I anticipated that someone else
might use my laptop (I’d have to kill them) but rather because some
intrusive pieces of software occasionally dump their stuff in
<code>/usr/local</code> (e.g. the LaTeX packages for OS X). I just want
to keep an eye on what I installed and be able to easily remove it
without thinking about potentially breaking other software. Another plus
is that I can leave <code>/usr/local</code> as being owned by root and
still can install everything via Homebrew without sudo-ing.

Don’t forget to add <code>$HOME/local/bin</code> and
<code>$HOME/local/sbin</code> to your path.

#### Gem setup

Another thing I needed to avoid sudo-ing was setting gems to be
installed in my home directory. [Pat
Allan’s](http://freelancing-gods.com)
[gist](http://gist.github.com/217895) shows you how to do that. After
that, it’s just <code>gem install whatever</code> to install any gem you
might need - no sudo, thank you very much.

You should also add <code>$HOME/.gem/ruby/1.8/bin</code> to your path so
binaries of any gems are executable.

#### Documents

Although I don’t really **need** to share my documents between my iMac
and my MBP, I still **want** to - and I don’t want to do it manually.
After toying a bit with symlinking my iDisk contents on both machines, I
decided that it was too slow and - even more importantly - wasn’t
suitable because it doesn’t keep local copies which would have basically
ruled out offline usage - not good.

Thus, I decided to use [Dropbox](http://www.dropbox.com/). I don’t need
to sync a whole lot of stuff, so the free plan with 2GB is more than
enough for me at the moment (by the way, if you sign up because you’re
reading this, I’d appreciate it if you could use [my referral
link](https://www.dropbox.com/referrals/NTMyMjM2Mjc5) - thanks!). I then
symlink folders where they belong - say, I have presentations, I’d keep
all local-only presentations in <code>Documents/Presentations</code> and
symlink <code>Dropbox/Presentations</code> to
<code>Documents/Presentations/Shared</code>.

#### Code

As I mentioned earlier, I’ve lost track on all my local repositories
because they were just everywhere.

With my new setup, everything (with the exception of Homewbrew) now sits
in a hidden folder called <code>.repositories</code> in my home folder.
Seeing what code I have on my machine is now just a matter of calling
<code>ls \~/.repositories</code>.

Flat structures don’t scale very well, obviously, so I added some
structure. I placed a <code>Development</code> folder in my home
directory and created some suitable subfolders like <code>Rails</code>
and <code>Ruby</code>. In these, there are subfolders like
<code>Plugins</code> and similar which contain symlinked directories
that point to their respective repository in <code>.repositories</code>.

#### Projects

I already indicated that one of the things I didn’t like about my old
setup was that a project’s code was in one place and specs, documents
and other non-code stuff was somewhere in my <code>Documents</code>
folder.

Now I have a <code>Projects</code> folder in my home directory that
contains subdirectories for clients which in turn contain subdirectories
for every single project. These projects then usually contain two
symlinked folders, <code>Code</code> (pointing to some folder in
<code>Development</code>) and <code>Documents</code> (pointing,
obviously, to some subfolder of my main <code>Documents</code> folder).
You can take the whole thing to the extreme and drag all your clients’
emails, relevant weblinks etc. to their respective project’s
<code>Documents</code> folder and really have **everything** in one
place.

I haven’t done this yet, but obviously it would be easy to write a
little shell script or alias that would enable you to just type
something like <code>project PROJECT_NAME</code> which would then open
the <code>Documents</code> folder in the Finder and the
<code>Code</code> folder in TextMate.

#### Miscellaneous

Speaking of TextMate: I don’t like shell scripts like <code>mate</code>
or <code>gitx</code> lurking around in <code>/usr/local</code>, so I
created a <code>bin</code> folder in my home directory, moved these
scripts there and added <code>$HOME/bin</code> to the path.

If you use [Passenger](http://www.modrails.com/) for development, you
can keep your Apache’s <code>httpd.conf</code> clean by keeping the
Passenger stuff in a separate file in
<code>/private/etc/apache2/other/passenger.conf</code>. The [Passenger
Preference
Pane](http://www.fngtps.com/2008/09/passenger-preference-pane-v1-1) does
this too by keeping the vhost configurations in
<code>/private/etc/apache2/passenger_pane_vhosts</code>.

### The New Workflows

Installing packages:

      brew install PACKAGE_NAME

Installing a gem:

      gem install GEM_NAME

Adding a new code repository:

      git clone REPOSITORY_URL ~/.repositories/REPOSITORY_NAME
      ln -s ~/.repositories/REPOSITORY_NAME ~/Development/some/path/REPOSITORY_NAME

Adding a new project (after setting up the repository):

      mkdir ~/Projects/some/path/PROJECT_NAME
      ln -s ~/Development/some/path/REPOSITORY_NAME ~/Projects/some/path/PROJECT_NAME/Code
      ln -s ~/Documents/some/path/PROJECT_NAME ~/Projects/some/path/PROJECT_NAME/Documents

Sharing documents across my computers:

      cp /some/folder/or/file ~/Dropbox/Documents/some/folder/or/file
      # if it belongs to some existing folder:
      ln -s ~/Dropbox/Documents/some/folder/or/file ~/Documents/some/folder/Shared

### Where Does it Go From Here?

The possibilities are endless. You could, for example,

-   create shell scripts and aliases that facilitate either of the tasks
-   symlink the logs of applications to their project’s folder so that
    you can view them more easily
-   buy more Dropbox space and also use it for music, movies, IRC
    transcripts, …
-   etc.

Personally, I’m happy with my setup for now. I can’t say that I’ll
always be happy with it but at the moment it seems to be exactly what I
want.

### Update (13/2/2010)

As I’ve run into a real dependency hell while toying with Rails 3, I
recently installed [Ruby Version Manager
(rvm)](http://rvm.beginrescueend.com/). I can now warmly recommend using
this awesome piece of software if you have (or want) to juggle with
multiple Ruby versions and (gem) environments. You can read some details
of what made me install it in my post on [Avoiding Rails 3 Dependency
Hell With RVM](/2010/02/13/avoiding-rails-3-dependency-hell-with-rvm/).
