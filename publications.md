---
layout: page
title: Publicaciones
menu-order: 30
hero-image-origin: 30% 20%
---

<div class="row">
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2" markdown="1">

#### Esta página es un ejemplo mockup de como se vería el grupo con publicaciones

**Disclaimer:** Los datos y publicaciones a continuación son completamente inventados y se proporcionan únicamente como ejemplo para ilustrar cómo se vería esta sección en la página web del grupo Kyma.

Un conjunto completo de publicaciones se puede encontrar en [Google Scholar](https://scholar.google.co.uk/citations?hl=en&user=6-MOqkMAAAAJ&view_op=list_works&sortby=pubdate). Siempre que sea posible, los artículos están disponibles para descarga como preprints (principalmente a través de [ArXiv](https://arxiv.org/a/howey_d_1.html) y/o como acceso abierto a través de [ORA](http://ora.ox.ac.uk) o directamente desde el editor, según lo requieran nuestros financiadores.

Las tesis de doctorado pueden ser accesibles a través de los siguientes enlaces de ORA (algunas están embargadas debido a sensibilidad comercial):

1. **Taeho Jung** - [*Aplicación de la teoría de soluciones concentradas y potenciales centrales a medios de intercambio iónico*](https://ora.ox.ac.uk/objects/uuid:7ff7fbe9-6e28-417e-b61c-75dc2cb1d52f), 2023.
2. **Gosia Wojtala** - [*Degradación y rendimiento térmico de baterías Li-ion: implicaciones para vehículos eléctricos*](https://ora.ox.ac.uk/objects/uuid:f6233017-c578-4d70-b3d3-f13ea6e10a46), 2023.
3. **Antti Aitio** - [*Métodos bayesianos para la estimación del estado de salud de baterías*](https://ora.ox.ac.uk/objects/uuid:166af363-5849-4f3b-aa31-640fb3f41faf), 2022.
4. **Sam Greenbank** - [*Diagnóstico y pronóstico del estado de salud de baterías basado en datos*](https://ora.ox.ac.uk/objects/uuid:da0cf799-1489-4cb8-9214-4ed5be742275), 2022.
5. **Trishna Raj** - [*El impacto de la degradación dependiente del camino en la vida útil de baterías de Litio-Ion*](https://ora.ox.ac.uk/objects/uuid:d975c41e-4406-42f3-aef9-beb54c60c11f), 2021.
6. **Jorn Reniers** - [*Control óptimo con conciencia de degradación para baterías Li-ion conectadas a la red*](https://ora.ox.ac.uk/objects/uuid:e0a33cb5-93f5-4e34-9b17-996a9d40755b), 2020.
7. **Pietro Romanazzi** - [*Estimación rápida y precisa de puntos calientes en máquinas eléctricas*](https://ora.ox.ac.uk/objects/uuid:099cea22-d184-4b2f-a648-23ae8c061f52), 2017.
8. **Damien Frost** - [*Sistemas de gestión de baterías con carga activa y control descentralizado*](https://ora.ox.ac.uk/objects/uuid:27c8947d-967c-476a-b778-a0ad4d0a5f48), 2017.
9. **Christoph Birkl** - [*Diagnóstico y pronóstico de la degradación en baterías de litio*](https://ora.ox.ac.uk/objects/uuid:7d8ccb9c-1469-4209-9995-5871fc908b54), 2017.
10. **Adrien Bizeray** - [*Estimación del estado y parámetros de modelos físicos de baterías Li-ion*](https://ora.ox.ac.uk/objects/uuid:f326b332-b912-4bf6-a9b3-d5e61d3a9596), 2016.
11. **Robert Richardson** - [*Monitoreo de temperatura de baterías basado en impedancia*](https://ora.ox.ac.uk/objects/uuid:be4393bf-d516-4cb4-8362-82ebe7e1b78d), 2016.
12. **David Howey** - [*Diseño térmico de máquinas de flujo axial con imanes permanentes refrigeradas por aire*](https://spiral.imperial.ac.uk:8443/handle/10044/1/5588), 2010.


---

##### Artículos recientes

> Estos artículos tambien son ejemplos de mockup

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
