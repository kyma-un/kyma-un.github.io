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
<ul>
	{% for person in group.people %}
		<li id="{{person.name | downcase | replace: ' ', '-'}}">
			<div class="person-row">
				<div class="photo">
					<img src="{{ site.baseurl }}/img/people/{{person.image}}" title="{{person.name}}{% if person.image-credit %} (image credit: {{ person.image-credit }}){% endif %}">
					<h5 class="name sm-bottom-margin">{{person.name}}{% if person.title %} <span>{{person.title}}</span>{% endif %}</h5>
				</div>
				<div class="details" >
					{% if person.bio %}<p class="sm-top-margin">{{person.bio}}</p>{% endif %}
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

---

<div class="row">
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2" markdown="1">

#### Joining the group

Post-doctoral positions will be [advertised](https://eng.ox.ac.uk/jobs/) via the department's website.

Applications for graduate study are always welcome, however before making contact, applicants should consider carefully whether their interests are aligned with this group, how their study might be funded, and whether they meet the department and university admissions criteria. Further details may be found at the [Department of Engineering Science website](https://www.eng.ox.ac.uk/study/postgraduate/courses/).
We are not able to host internship students and will not reply to emails requesting internships. 

</div>
</div>