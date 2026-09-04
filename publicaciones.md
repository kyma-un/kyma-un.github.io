---
layout: page
title: Publicaciones
menu-order: 40
---
<div class="row">
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2" markdown="1">

El grupo Kyma está registrado en el sistema **Hermes** de la Universidad Nacional de Colombia. Esta sección reúne artículos, preprints, ponencias y tesis asociadas a los proyectos.

{% assign pubs = site.data.publications.items %}
{% if pubs.size > 0 %}
<ol class="pub-list">
{% for item in pubs %}
<li>
  <strong>{{ item.title }}</strong><br>
  <span class="pub-meta">{{ item.authors }} · {{ item.venue }} · {{ item.year }}{% if item.type %} · {{ item.type }}{% endif %}</span>
  {% if item.url %}<br><a href="{{ item.url }}" rel="noopener noreferrer">Documento</a>{% endif %}
</li>
{% endfor %}
</ol>
{% else %}
<p>Las primeras publicaciones del grupo se están preparando. Mientras tanto, cada proyecto documenta su estado técnico en la <a href="{{ site.baseurl }}/projects">ficha correspondiente</a>.</p>
{% endif %}

#### Cómo citar al grupo
Kyma — Sensores, Control e IA. Universidad Nacional de Colombia, Sede Bogotá, Facultad de Ingeniería.

</div>
</div>
