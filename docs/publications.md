---
layout: page
title: Publications
menu-order: 30
hero-image-origin: 30% 20%
---

<div class="row">
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2" markdown="1">

A full set of publications may be found at [Google Scholar](https://scholar.google.co.uk/citations?hl=en&user=6-MOqkMAAAAJ&view_op=list_works&sortby=pubdate). As far as possible papers are made available for download as pre-prints (primarily through [ArXiv](https://arxiv.org/a/howey_d_1.html) and/or as open access through [ORA](http://ora.ox.ac.uk) or directly from the publisher, as required by our funders.

PhD theses may be accessed through the following ORA links (some are embargoed due to commercial sensitivity):
1. Jorn Reniers - [Degradation-aware optimal control of grid-connected lithium-ion batteries](https://ora.ox.ac.uk/objects/uuid:e0a33cb5-93f5-4e34-9b17-996a9d40755b), 2020.
1. Pietro Romanazzi - [Fast and accurate hot-spot estimation in electrical machines](https://ora.ox.ac.uk/objects/uuid:099cea22-d184-4b2f-a648-23ae8c061f52), 2017.
2. Damien Frost - [Battery management systems with active loading and decentralised control](https://ora.ox.ac.uk/objects/uuid:27c8947d-967c-476a-b778-a0ad4d0a5f48), 2017.
3. Christoph Birkl - [Diagnosis and prognosis of degradation in lithium-ion batteries](https://ora.ox.ac.uk/objects/uuid:7d8ccb9c-1469-4209-9995-5871fc908b54), 2017.
4. Adrien Bizeray - [State and parameter estimation of physics-based lithium-ion battery models](https://ora.ox.ac.uk/objects/uuid:f326b332-b912-4bf6-a9b3-d5e61d3a9596), 2016.
5. Robert Richardson - [Impedance-based battery temperature monitoring](https://ora.ox.ac.uk/objects/uuid:be4393bf-d516-4cb4-8362-82ebe7e1b78d), 2016.
6. David Howey - [Thermal design of air-cooled axial flux permanent magnet machines](https://spiral.imperial.ac.uk:8443/handle/10044/1/5588), 2010.


---

##### Recent article highlights

{% assign article_list = site.data.articles -%}
<ol class="articles">
{% for article in article_list %}
<li>
{% if article.image %}<img class="post-thumbnail" src="{{ site.baseurl }}/img/articles/{{ article.image }}"{% if article.image-credit %} title="Image credit: {{ article.image-credit }}"{% endif %}>{% endif %}
{{article.details | markdownify }}
</li>{% endfor %}
</ol>

</div>
</div>