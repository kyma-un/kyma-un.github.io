---
layout: page
title: Personas
menu-order: 20
hero-image-origin: 50% 40%
---
Nuestro equipo está conformado por estudiantes, investigadores y docentes comprometidos con el desarrollo de soluciones en ingeniería y ciencia. Cada integrante aporta desde su área de conocimiento al diseño, experimentación e implementación de proyectos, creando un entorno colaborativo donde convergen la teoría y la práctica para abordar desafíos reales con un enfoque interdisciplinario.
<div class="lab-people-wrapper">

{% assign people = site.data.people -%}

{% for group in people %}

{% if group.role != 'Alumni' %}

<div class="lab-group {{group.role | downcase | replace: ' ', '-'}}">

  <h3>{{group.role}}</h3>

  {% if group.role != 'Docente' %}
  <p class="lab-group-count">
    Actualmente contamos con <strong>{{ group.people.size }}</strong> {{group.role}} activos en el grupo de investigación.
  </p>
  {% endif %}

  <hr/>

  <ul class="{% if group.role == 'Docente' %}lab-docente-grid{% else %}lab-person-list{% endif %}">

    {% for person in group.people %}

    {% if group.role == 'Docente' %}
    <!-- 🔹 DOCENTES -->
    <li class="lab-docente-item">

      <img class="lab-docente-photo"
        src="{{ site.baseurl }}/img/people/{{person.image}}"
        alt="{{person.name}}">

      <div class="lab-docente-info">
        <strong>{{person.name}}</strong>

        {% if person.title %}
        <div class="lab-docente-title">{{person.title}}</div>
        {% endif %}
        {% if person.bio %}
          <p class="lab-person-bio" markdown="1">
            {{person.bio}}
          </p>
          {% endif %}
      </div>

    </li>

    {% else %}
    <!-- 🔹 GENERAL -->
    <li class="lab-person-item">

      <div class="lab-person-row">

        <img class="lab-person-photo"
          src="{{ site.baseurl }}/img/people/{{person.image}}"
          alt="{{person.name}}">

        <div class="lab-person-info">

          <h5 class="lab-person-name">
            {{person.name}}
          </h5>

          {% if person.title %}
          <div class="lab-person-title">{{person.title}}</div>
          {% endif %}
          

    


          {% if person.bio %}
          <p class="lab-person-bio" markdown="1">
            {{person.bio}}
          </p>
          {% endif %}
  {% if person.project %}
              {% for proj in person.project %}
              <a href="{{ site.url }}{{ site.baseurl }}/projects/{{proj}}">
            <span class="lab-project-badge">{{proj}}</span>
            </a>
        {% endfor %}
          {% endif %}
    
        </div>

      </div>

    </li>
    {% endif %}

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

Comunicarse al [kymafi_bog@unal.edu.co](mailto:kymafi_bog@unal.edu.co) para cualquier duda o inquietud.
</div>
</div>
