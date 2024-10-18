---
layout: page
title: Data and code
menu-order: 40
hero-image-origin: 70% 10%
---

<div class="row">
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2" markdown="1">

In addition to our publications, we aim to make available models, data, and other useful information for our group and others to use. Please bear in mind that these are research-grade only; use them at your own risk and read the licence carefully before use.

{% assign lists = site.data.data-and-code -%}
{% for list in lists %}
<hr>
<h5>{{ list.group }}</h5>
<ol class="data">
{% for item in list.items %}
<li>
{% if item.image %}<img class="post-thumbnail" src="{{ site.baseurl }}/img/data-and-code/{{ item.image }}"{% if item.image-credit %} title="Image credit: {{ item.image-credit }}"{% endif %}>{% endif %}
{{item.details | markdownify }}
</li>
{% endfor %}
</ol>
{% endfor %}

</div>
</div>