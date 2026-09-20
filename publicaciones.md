---
layout: page
title: Publicaciones
menu-order: 40
hero-image-origin: 50% 40%
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
  <span class="pub-meta">{{ item.authors }} · {{ item.venue }} · {{ item.year }}{% if item.type %} · {{ item.type }}{% endif %}{% if item.session %} · {{ item.session }}{% endif %}</span>
  {% if item.project %}
  <br><span class="pub-meta">Proyecto: <a href="{{ site.baseurl }}/projects/{{ item.project }}">{{ item.project_title | default: item.project }}</a></span>
  {% endif %}
  {% if item.url %}<br><a href="{{ item.url }}" rel="noopener noreferrer">{% if item.url_label %}{{ item.url_label }}{% else %}Documento{% endif %}</a>{% endif %}
  {% if item.program %} · <a href="{{ site.baseurl }}{{ item.program }}">Programa del congreso</a>{% endif %}
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
