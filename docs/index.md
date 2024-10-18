---
layout: default
title: Home
menu-order: 5
hero-image-origin: 50% 25%
---
<style scoped>
.hero.{{ page.title | replace: ' ', '-' | replace: '&', 'and' | downcase }} {
	background-image: url({{ site.baseurl }}/img/hero/{{ page.title | replace: ' ', '-' | replace: '&', 'and' | downcase }}.jpg);
{% if page.hero-image-origin %}	background-position: {{ page.hero-image-origin }};{% endif %}
}
@media (min-width: 768px) {
	.hero.{{ page.title | replace: ' ', '-' | replace: '&', 'and' | downcase }} {
		background-image: url({{ site.baseurl }}/img/hero/{{ page.title | replace: ' ', '-' | replace: '&', 'and' | downcase }}@2x.jpg);
	}
}
</style>
<div class="banner-img"><img src="{{ site.baseurl }}/img/hero/{{ page.title | replace: ' ', '-' | replace: '&', 'and' | downcase }}@2x.jpg"></div>
<div class="intro-text">
<div class="container content">
<div class="row">
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2" markdown="1">

We design systems and develop diagnostics and control algorithms for electrochemical energy devices such as batteries and supercapacitors, in applications from electric cars to grid power systems.

<a href="{{ site.baseurl }}/research" class="btn">Find out more</a>

</div>
</div>
</div>
</div>
<div class="container content">
<div class="row">
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2">
<div class="row">
<div class="col-xs-12 col-sm-6 col-sm-push-6">
<img class="default-image" src="{{ site.baseurl }}/img/home-working.jpg">
</div>
<div class="col-xs-12 col-sm-6 col-sm-pull-6" markdown="1">

The group is led by [Professor David Howey]({{ site.baseurl }}/people/#david-howey) at the [Department of Engineering Science](http://www.eng.ox.ac.uk) in the [University of Oxford](http://ox.ac.uk).  	

Our aim is to improve performance and cost by predicting dynamics and lifetime, estimating temperatures and faults, and measuring how and why devices perform in the real world. This requires us to address fundamental issues in modelling, instrumentation and data processing.

</div>
</div>
</div>
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2" markdown="1">

---

#### News

{% assign posts = site.posts -%}
{% for post in posts %}
{% if forloop.index < 6 %}
<div class="post">
<h6 class="sm-bottom-margin"><span class="post-title">{{ post.title }}</span> <span class="post-info">{{ post.date | date: "%-d %B %Y" }}</span></h6>
{% if post.image %}<img class="post-thumbnail" src="{{ site.baseurl }}/img/{{ post.image }}"{% if post.image-credit %} title="Image credit: {{ post.image-credit }}"{% endif %}>{% endif %}
{{ post.content }}
</div>
{% endif %}
{% endfor %}

</div>
</div>
</div>