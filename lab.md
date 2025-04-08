---
layout: page
title: Lab
menu-order: 50
hero-image-origin: 50% 30%
---

<div class="row">
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2" markdown="1">

We have a well-equipped lab where we undertake a range of measurements on devices, such as long term degradation tests, thermal measurements, pulse tests, impedance spectroscopy, dynamic tests, OCV tests etc. We also regularly design and construct our own electronics and instrumentation, for example a [novel calorimeter system](http://arxiv.org/abs/1508.03514). For this sort of work we use [Altium](http://www.altium.com) for PCB design, and we program embedded systems in Matlab/Simulink and C/C++. One of our favourite embedded platforms is [mbed](http://mbed.org).

These are examples of the equipment we have in our lab (this list is out of date and will be removed, therefore indicative only):

</div>

{% assign equipment_list = site.data.equipment -%}
<div class="image-grid lab">
	<ul>
		{% for equipment in equipment_list %}
			<li>
				<div class="image-grid-cell">
					<div class="image-container">
						{% if equipment.image %}<img src="{{ site.baseurl }}/img/equipment/{{equipment.image}}" title="{{equipment.name}}{% if equipment.image-credit %} (image credit: {{ equipment.image-credit }}){% endif %}">{% endif %}
					</div>
					<div class="image-grid-details">
						<h6 class="no-top-margin">{{equipment.name}}</h6>
						<ul class="default">
						{% for detail in equipment.details %}
							<li>{{ detail }}</li>
						{% endfor %}
						</ul>
					</div>
				</div>
			</li>
		{% endfor %}
	</ul>
</div>

</div>