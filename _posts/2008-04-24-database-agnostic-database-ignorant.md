---
title: Database agnostic != database ignorant
layout: post
permalink: /articles/2008/04/24/database-agnostic-database-ignorant
year: 2008
---

Every now and then I stumble across a blog post that triggers something
in me. Lately, this was the case for an article I read over at
[RubyFleebie](http://www.rubyfleebie.com) about a [Rails programmer
having trouble with the very basics when it comes to
databases](http://www.rubyfleebie.com/railers-need-to-stop-not-caring-about-the-database/).
While the resumee of the post was quite satisfying (he thinks that Rails
developers should start to care about the database they’re using,
despite relying on ActiveRecord), the content itself scared me: This
guy, so it seems, doesn’t know anything about foreign keys, indexes and
not even differences between outer and inner joins. I don’t mean to
insult him, but it really, **really** scared me.

Back when I started coding, a web developer had to be familiar with all
aspects of the whole application: database, HTML/CSS/JavaScript and the
code that links it all together. I don’t think that this requirement has
changed a lot - or in fact, it probably hasn’t changed at all. But
frameworks like Rails make it easy to hide some of the aspects behind
their mighty layers of abstraction.

Anyways, I’m not here to complain about that. Instead, I’d like to use
this post to give you a quick rundown of the most important database
related stuff, that I think is mandatory for **every** web developer,
whether they use Rails or not. While I’m certainly no potential DBA, I
know a thing or two about database design and I think, some things might
help you along the way.

### JOINs

In databases, joins are used to link multiple tables of a database
together so that multidimensional (so to speak) data can be retrieved
using just a single query. This is useful in two major aspects:

-   First of all, every database query is a - comparatively - time
    consuming operation. More often than not, you’ll find that reducing
    the number of queries in your application will give you a major
    performance increase. This is basically what Rails’ eager loading is
    all about:

{% highlight ruby %}
Person.find(:all, :include => :addresses)
{% endhighlight %}

This loads all people including their addresses in just one query.

-   Secondly, it depicts reality a little more accurately. Your data is
    hardly ever only two-dimensional. You’ll have people that have
    addresses, orders that consist of items, topics that have posts,
    etc. Using only one query to fetch all related data is not only more
    efficient, but also seems logical.

An important thing to know about joins is that a join always connects
**two** tables. You can, of course, chain multiple joins to fetch data
from more than one table. But a join, by itself, can only connect two
tables at a time. How the tables are connected is decided by the type of
join you apply: You can outer or inner join tables.

#### INNER JOINs

The probably more common way to join tables is the so-called **INNER
JOIN**. INNER JOIN connects all matching rows of both tables.

Let’s take another look at the people/addresses example I mentioned
earlier and assume that there’s two people, George (id = 1) and Alice
(id = 2). George has one address (i.e. there is one row in the
*addresses* table with a person_id = 1) and Alice has two addresses.
Let’s join them using an INNER JOIN:

{% highlight mysql %}
SELECT * FROM people INNER JOIN addresses ON addresses.person_id = people.id
{% endhighlight %}

This will output a set of three rows - one for George and two for Alice.
The set includes all rows where the join condition (*ON
addresses.person_id = people.id*) matches.

Now we add a third person, Bill, who doesn’t have an address. If we run
our query again, the output doesn’t change because the INNER JOIN only
includes rows with matches in **both** tables. If we want to have one of
the two tables included in the result set, regardless of whether there’s
a corresponding row in the second table or not, we have to use an
**OUTER JOIN**.

Note that the order in which you’re joining the tables doesn’t make any
difference with inner joins. You could write the following and the
result would be the same:

{% highlight mysql %}
SELECT * FROM addresses INNER JOIN people ON addresses.person_id = people.id
{% endhighlight %}

#### OUTER JOINs

An **OUTER JOIN** includes one of the two joined tabled tables
completely, even if it doesn’t find a matching row in the other table.
Which table is going to be complete (i.e. not all fields are *NULL*
values) and which may be incomplete is decided by adding kind of
“direction” to the join and make it a **LEFT OUTER JOIN** or **RIGHT
OUTER JOIN**. But let’s take a look at an example that makes this easier
to understand.

Let’s revisit George, Alice and Bob. If we change our INNER JOIN to a
LEFT OUTER JOIN, Bill is included in the result set and all fields of
the *addresses* table are set to *NULL*.

So, in short, the added keyword *LEFT/RIGHT* decides, which of the
joined tables will get fully included in the result set. Note that,
contrary to the INNER JOIN, with the LEFT/RIGHT OUTER JOIN the order of
the tables **does actually matter** - if you swap the tables, your
result set will usually change.

#### When to use what

When to use which kind of join largely depends on what you’re trying to
achieve. A general rule of thumb would be something like this:

-   If you can be sure that you only need records with corresponding
    rows in both tables or if you somehow enforce (at database or
    application level) that each record in one table **must** have a
    corresponding row in the other table, an **INNER JOIN** is the way
    to go, because it’s usually fast and doesn’t yield any NULL values
    you have to deal with.

<!-- -->

-   If what you’re trying to achieved doesn’t fall in the category
    mentioned above, use an **OUTER JOIN**. Using LEFT/RIGHT OUTER JOIN
    is mostly a matter of personal preference (I prefer to LEFT OUTER
    JOIN), unless you’re chaining lots of tables in one big query - then
    you might need to have some LEFT/RIGHT OUTER JOIN alternating.

### Indexes

Indexes (aka keys) are used to index records (who would have thought
that?!). Basically, using indexes can result in an enormous performance
boost if the indexes are applied correctly, because they help the
database server to find the desired results more efficiently. This can
be achieved because without an index, databases usually perform what is
called a full table scan. Consider the following query:

{% highlight mysql %}
SELECT * FROM people WHERE last_name = "Smith"
{% endhighlight %}

If there is no index on the *last_name* field, the database will go
through the whole table and filter every record with a last_name value
of “Smith”. While this is not a problem with only a few hundred records,
it quickly gets inefficient if you have multiple thousand records stored
in the table. An index, in this case, will build a kind of *virtual
table* that is ordered by last_name. When the database is queried like
above, it will find go in an search till it finds the first occurrence
of “Smith” and selects all records till it finds the first record where
last_name doesn’t equal “Smith”. Obviously, this can save a lot of time.

When and where to use indexes is a science by itself (contrary to what
people might tell you, DBA is actually **not** redundant job for all
those tech guys born before 1960), especially when it comes to combined
indexes (i.e. indexes across multiple fields). Nevertheless, here’s some
indicators when an index might be useful:

* Any field of a table that gets mentioned in _WHERE_ clauses may make a good index. Let's assume that you have a table containing blog posts and you want to filter all posts by a certain user, using something like {% highlight mysql %}SELECT * FROM posts WHERE author = 'Clemens'{% endhighlight %} In this case, _author_ would be a potential index. Same goes for fields used in _ORDER BY_ clauses - they're usually more efficient when indexes, especially with large amounts of data.

* Any field that is part of a join condition is *definitely* a good choice for an index. In other words: Index your foreign keys. *Always!* Example: {% highlight mysql %}SELECT * FROM people LEFT OUTER JOIN addresses ON addresses.person_id = people.id{% endhighlight %} In this example, _addresses.person_id_ should definitely be indexed. (Note: _people.id_ is, hopefully, indexed as primary key already.)

-   Any field that is used by an aggregate function like *SUM*, *COUNT*,
    etc. may be a good candidate as well. If you don’t write your own
    SQL and solely rely on ActiveRecord, you will hardly ever (if at
    all) use aggregate functions.

With most database engines, there are multiple types of indexes. For
example, in MySQL there are primary keys, unique indexes and “standard”
indexes. I think, this is really straight forward, but I’ll explain it
in short anyway.

-   There is only one primary key per table (hence the name) and is
    unique for the table (i.e. there is only one record with a certain
    value in this field). In Rails, this field will usually be called
    “id” and be an integer of some sort, that is auto incremented if a
    new record is inserted. Don’t change Rails’ behavior here - it’s a
    real pain!

<!-- -->

-   The “standard” index is the most common index. You’ll use it for
    most foreign keys and if you speed up your WHERE statements by
    indexing the fields that are part of the clause.

<!-- -->

-   A unique index can be used to make a second field (in addition to
    the primary key) unique for a table. A good example would be if you
    want to make sure that the *users* table in your application makes
    sure that a given e-mail address can only be used once - just make
    it unique. Of course, you always need some application logic
    (preferably in the model layer) to handle the unique violation if a
    second record with an already existing value is inserted.

<!-- -->

-   Combined indexes are strictly speaking not a separate type of
    indexes - you can have combined primary keys, combined uniques and
    combined “standard” indexes. Since combined indexes are - I think -
    a very difficult topic and could easily make a full-blown article, I
    decided to put them out of scope.

### Summing up

ActiveRecord and similar ORMs take a lot of pain and time consuming
tasks away from the developer. That doesn’t mean, though, that it
exempts the developer from learning and knowing what’s going on behind
the covers. I hope, my article gave some people an insight in the works
of a database. Maybe, some day I’ll write another article on how to
optimize your database.

Comments are much appreciated!

UPDATE: pjm suggested to write a little paragraph explaining **why** an
index may be helpful. I added a short section to the article - I hope
it’s clear enough. Further information can be found in the [MySQL manual
about how MySQL uses
indexes](http://dev.mysql.com/doc/refman/5.0/en/mysql-indexes.html) -
most of the stuff that is mentioned there isn’t MySQL-specific but can
be applied to other popular database engines as well.
