---
title: Sidebars and other dynamic content
layout: post
permalink: /articles/2008/04/25/sidebars-and-other-dynamic-content
year: 2008
---

In [episode \#100 of his
screencasts](http://railscasts.com/episodes/100), [Ryan
Bates](http://railscasts.com) shows - among other things - how
dynamically fill elements of your layouts.

Imagine your layout contains a \<div id=“sidebar”\> where you want
different sidebar content, depending on the page the user’s currently
on. Ryan uses **content_for(:side)** which is definitely the way to go,
but I think his approach isn’t as DRY as it could be.

Instead of using content_for(:side) in every template, I’d suggest
extracting that bit in a helper method and put in in your
ApplicationHelper module like that:

{% highlight ruby %}
def sidebar(&block)
  content_for(:sidebar, &block)
end
{% endhighlight %}

After that, you can just call the newly created helper method in your
views:

{% highlight ruby %}
<% sidebar do %>
This goes in the sidebar!
<% end %>
{% endhighlight %}

This approach also gives you the opportunity to include some logic in
the helper. Consider the possibility of showing an admin area as a part
of the page if (and only if) the user has admin privileges. In one of my
projects, I used something the following code:

{% highlight ruby %}
def admin_area(section='', &block)
  if self.current_user.admin?
    concat(content_tag(:h2, "#{section.humanize} Admin", :class => "admin_options"), block.binding)
    concat(content_tag(:div, capture(&block), :class => "admin_options"), block.binding)
  end
end
{% endhighlight %}

In the views, it looks like this:

{% highlight ruby %}
<% admin_area('forum') do %>
... display the admin area ...
<% end %>
{% endhighlight %}

This way, you keep logic out of the view so it stays nice and clean.
