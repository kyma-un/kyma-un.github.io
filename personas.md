---
layout: page
title: Personas
menu-order: 20
hero-image-origin: 50% 40%
---
<div class="row">
{% assign people = site.data.people -%}
{% for group in people %}
{% if group.role != 'Alumni' %}
<div class="image-grid {{group.role | downcase | replace: ' ', '-'}}">
<h3>{{group.role}}</h3>

{% if group.role != 'Docente principal' %}
Actualmente contamos con <strong>{{ group.people.size }}</strong> {{group.role}} activos en el grupo de investigación. 
{% endif%}
<hr	/>
<ul>
	{% for person in group.people %}
		<li id="{{person.name | downcase | replace: ' ', '-'}}">
			<div class="person-row">
				<div class="photo">
					<img src="{{ site.baseurl }}/img/people/{{person.image}}" title="{{person.name}}{% if person.image-credit %} (image credit: {{ person.image-credit }}){% endif %}">
					<h5 class="name sm-bottom-margin">{{person.name}}{% if person.title %} <span>{{person.title}}</span>{% endif %}</h5>
				</div>
				<div class="details" >
					{% if person.bio %}<p class="sm-top-margin" markdown=1>{{person.bio}}</p>{% endif %}
				</div>
			</div>
		</li>
	{% endfor %}
</ul>
</div>
{% else %}
</div>
<div class="row">
	<div class="col-xs-12" markdown="l">
		<h5>{{group.role}}</h5>
		<ul>
		{% for person in group.people %}
			<li>{{person}}</li>
		{% endfor %}
		</ul>
	</div>
</div>
{% endif %}
{% endfor %}




<div class="row">
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2" markdown="1">
---
#### Ser parte del grupo

Por el momento, no estamos recibiendo nuevos miembros en el grupo. Se avisará de forma masiva cuando se abra la convocatoria. 

Comunicarse con [lmmendezm@unal.edu.co] o [amoralesma@unal.edu.co] para cualquier duda o inquietud.
</div>
</div>