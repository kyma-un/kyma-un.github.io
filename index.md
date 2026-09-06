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
<div class="banner-img"><img src="{{ site.baseurl }}/img/hero/{{ page.title | replace: ' ', '-' | replace: '&', 'and' | downcase }}@2x.jpg" alt="Kyma, grupo de investigación"></div>
<div class="intro-text">
<div class="container content">
<div class="row">
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2" markdown="1">

Somos un grupo de investigación de la Universidad Nacional de Colombia, Sede Bogotá, con énfasis en ingeniería y física. Desarrollamos proyectos en **sensores, control e inteligencia artificial**, desde el diseño y la fabricación hasta la implementación experimental.

<a href="{{ site.baseurl }}/conocenos" class="btn">Conoce al grupo</a>
<a href="{{ site.baseurl }}/projects" class="btn">Ver proyectos</a>

</div>
</div>
</div>
</div>
<div class="container content">
<div class="row">
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2">

{% assign research_pages = site.pages | where: "type", "research" %}
{% assign member_count = 0 %}
{% for group in site.data.people %}
  {% unless group.role == 'Alumni' %}
    {% assign member_count = member_count | plus: group.people.size %}
  {% endunless %}
{% endfor %}

<div class="stats-row">
  <div class="stat-card"><strong>{{ research_pages.size }}</strong><span>Proyectos activos</span></div>
  <div class="stat-card"><strong>{{ member_count }}</strong><span>Integrantes</span></div>
  <div class="stat-card"><strong>{{ site.data.research_lines.size }}</strong><span>Líneas de investigación</span></div>
</div>

<div class="row">
<div class="col-xs-12 col-sm-6 col-sm-push-6">
<img class="default-image" src="{{ site.baseurl }}/img/home-working.jpg" alt="Trabajo experimental en el laboratorio">
</div>
<div class="col-xs-12 col-sm-6 col-sm-pull-6" markdown="1">

El grupo es dirigido por [Luis Miguel Méndez Moreno]({{ site.baseurl }}/personas/), coordinador curricular de Ingeniería Mecatrónica en la [Facultad de Ingeniería](https://ingenieria.unal.edu.co/) de la [Universidad Nacional de Colombia](https://unal.edu.co/).

Generamos conocimiento aplicado en instrumentación, procesamiento de señales y algoritmos inteligentes, con el compromiso de formar investigadores y aportar al desarrollo tecnológico del país.

</div>
</div>

<h3>Líneas de investigación</h3>
<div class="line-cards">
{% for line in site.data.research_lines %}
  <a class="line-card" href="{{ site.baseurl }}/projects/?linea={{ line.id }}">
    <h4>{{ line.name }}</h4>
    <p>{{ line.description }}</p>
  </a>
{% endfor %}
</div>

<div markdown="1">

---

#### Noticias

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

{% include calendar.html %}

</div>
</div>
</div>
</div>
