---
layout: page
title: Publicaciones
menu-order: 30
hero-image-origin: 30% 20%
---

<div class="row">
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2" markdown="1">

A full set of publications may be found at [Google Scholar](https://scholar.google.co.uk/citations?hl=en&user=6-MOqkMAAAAJ&view_op=list_works&sortby=pubdate). As far as possible papers are made available for download as pre-prints (primarily through [ArXiv](https://arxiv.org/a/howey_d_1.html) and/or as open access through [ORA](http://ora.ox.ac.uk) or directly from the publisher, as required by our funders.

PhD theses may be accessed through the following ORA links (some are embargoed due to commercial sensitivity):
1. Taeho Jung - [Application of concentrated solution theory and core potential to ion exchange media](https://ora.ox.ac.uk/objects/uuid:7ff7fbe9-6e28-417e-b61c-75dc2cb1d52f), 2023.
2. Gosia Wojtala - [Degradation and thermal performance of Li-ion batteries: implications for electric vehicles](https://ora.ox.ac.uk/objects/uuid:f6233017-c578-4d70-b3d3-f13ea6e10a46), 2023.
3. Antti Aitio - [Bayesian methods for battery state of health estimation](https://ora.ox.ac.uk/objects/uuid:166af363-5849-4f3b-aa31-640fb3f41faf), 2022.
4. Sam Greenbank - [Data-driven battery state of health diagnostics and prognostics](https://ora.ox.ac.uk/objects/uuid:da0cf799-1489-4cb8-9214-4ed5be742275), 2022.
5. Trishna Raj - [The impact of path dependent degradation on the lifetime of Lithium-Ion batteries](https://ora.ox.ac.uk/objects/uuid:d975c41e-4406-42f3-aef9-beb54c60c11f), 2021.
6. Jorn Reniers - [Degradation-aware optimal control of grid-connected lithium-ion batteries](https://ora.ox.ac.uk/objects/uuid:e0a33cb5-93f5-4e34-9b17-996a9d40755b), 2020.
7. Pietro Romanazzi - [Fast and accurate hot-spot estimation in electrical machines](https://ora.ox.ac.uk/objects/uuid:099cea22-d184-4b2f-a648-23ae8c061f52), 2017.
8. Damien Frost - [Battery management systems with active loading and decentralised control](https://ora.ox.ac.uk/objects/uuid:27c8947d-967c-476a-b778-a0ad4d0a5f48), 2017.
9. Christoph Birkl - [Diagnosis and prognosis of degradation in lithium-ion batteries](https://ora.ox.ac.uk/objects/uuid:7d8ccb9c-1469-4209-9995-5871fc908b54), 2017.
10. Adrien Bizeray - [State and parameter estimation of physics-based lithium-ion battery models](https://ora.ox.ac.uk/objects/uuid:f326b332-b912-4bf6-a9b3-d5e61d3a9596), 2016.
11. Robert Richardson - [Impedance-based battery temperature monitoring](https://ora.ox.ac.uk/objects/uuid:be4393bf-d516-4cb4-8362-82ebe7e1b78d), 2016.
12. David Howey - [Thermal design of air-cooled axial flux permanent magnet machines](https://spiral.imperial.ac.uk:8443/handle/10044/1/5588), 2010.


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
