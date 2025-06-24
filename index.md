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

Somos un grupo de investigación de la Universidad Nacional de Colombia con énfasis en ingeniería y física. Nuestra misión es desarrollar proyectos innovadores en las áreas de sensores, control e inteligencia artificial (IA), abarcando desde el diseño y la fabricación hasta la implementación de soluciones tecnológicas.

<a href="{{ site.baseurl }}/research" class="btn">Aprende más</a>

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

Este grupo es dirigido por [Luis Miguel Méndez Moreno]({{ site.baseurl }}/people/#david-howey), coordinador curricular de Ingeniería mecatrónica en la [Facultad de Ingeniería](http://www.eng.ox.ac.uk) de la [Universidad Nacional de Colombia](http://ox.ac.uk).  	

Nuestro objetivo es generar conocimiento y aportar al desarrollo tecnológico y científico del país mediante la creación de soluciones innovadoras. En el grupo Kyma, abordamos problemas clave en instrumentación, procesamiento de señales y algoritmos inteligentes, siempre con el compromiso de aprender, innovar y contribuir al progreso del conocimiento y al bienestar de nuestra sociedad.

</div>
</div>
</div>
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2" markdown="1">

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

</div>
</div>
</div>