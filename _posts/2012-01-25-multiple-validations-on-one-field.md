---
layout: post
title: Multiple Validations on One Field
year: 2012
---

I’m sure you’ve had situations in Rails where you had multiple
validations on a single field.

### Problem

Say you have a field with a value to be chosen from a select field or
radio button group where you need to make sure a value is selected
**and** it’s an allowed value. So you’d have some code like this:

{% highlight ruby %}
class User < ActiveRecord::Base
  validates_presence_of :gender
  validates_inclusion_of :gender, :in => %w(male female)

  # or with modern ActiveModel syntax:
  validates :gender, :presence => true, :inclusion => { :in => %w(male female) }
end
{% endhighlight %}

If a user submits the form without choosing a gender, they’d get two
error messages:

    Gender can't be blank.
    Gender is not included in the list.

I don’t like that for two reasons:

1.  The second errors is logically dependent on the first. In other
    words, it’s not in the allowed list because it’s blank.
2.  In this case, the second validation is just there for data validity:
    If we provide correct forms and the user doesn’t hack these forms,
    they will never even be able to submit an invalid value.

### Solution

So how do we get rid of the “dependent” validation? Simple: Rails has a
flag for that – <code>:allow_blank</code>. You can use it like this:

{% highlight ruby %}
class User < ActiveRecord::Base
  validates :gender, :presence => true, :inclusion => { :in => %w(male female), :allow_blank => true }

  # or with the old-style validations
  validates_presence_of :gender
  validates_inclusion_of :gender, :in => %w(male female), :allow_blank => true
end
{% endhighlight %}

The <code>:allow_blank</code> option works on most (if not all) other
validations (e.g. numericality, uniqueness etc.), too.

My advice would be to use it in a way that makes sense to the user.
Example: Password confirmation. Assuming that you have a presence
validation on the password itself, it is fairly obvious that an empty
password confirmation field doesn’t match the password (again: logically
dependent). In this case, you might as well tell the user that it
doesn’t match immediately rather than telling them to fill it in at all.

I hope this helps you if you happen to run into this use case in the
future.
