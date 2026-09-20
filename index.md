---
layout: default
title: Home
menu-order: 5
hero-image-origin: 50% 25%
---
<div class="banner-img">
  <img
    src="{{ site.baseurl }}/img/hero/web/home.jpg"
    srcset="{{ site.baseurl }}/img/hero/web/home.jpg 1200w, {{ site.baseurl }}/img/hero/web/home@2x.jpg 1800w"
    sizes="100vw"
    width="1600"
    height="720"
    alt="Laboratorio del grupo de investigación Kyma, Universidad Nacional de Colombia"
    fetchpriority="high"
    decoding="async">
</div>

<div class="intro-text">
  <div class="container content">
    <div class="row">
      <div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2">
        <p>Somos un grupo de investigación de la Universidad Nacional de Colombia, Sede Bogotá, con énfasis en ingeniería y física. Desarrollamos proyectos en <strong>sensores, control e inteligencia artificial</strong>, desde el diseño y la fabricación hasta la implementación experimental.</p>
        <p class="intro-actions">
          <a href="{{ site.baseurl }}/conocenos" class="btn">Conoce al grupo</a>
          <a href="{{ site.baseurl }}/projects" class="btn">Ver proyectos</a>
        </p>
      </div>
    </div>
  </div>
</div>

<div class="container content">
  <div class="row">
    <div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2">

{% assign research_pages = site.pages | where: "type", "research" | sort: "title" %}
{% assign member_count = 0 %}
{% for group in site.data.people %}
  {% unless group.role == 'Alumni' %}
    {% assign member_count = member_count | plus: group.people.size %}
  {% endunless %}
{% endfor %}

      <div class="stats-row" role="list">
        <div class="stat-card" role="listitem"><strong>{{ research_pages.size }}</strong><span>Proyectos de investigación</span></div>
        <div class="stat-card" role="listitem"><strong>{{ member_count }}</strong><span>Integrantes activos</span></div>
        <div class="stat-card" role="listitem"><strong>{{ site.data.research_lines.size }}</strong><span>Líneas de trabajo</span></div>
      </div>

      <div class="home-split">
        <div class="home-split-media">
          <img class="default-image" src="{{ site.baseurl }}/img/hero/web/home-working.jpg" width="900" height="600" alt="Trabajo experimental en el laboratorio de Mecatrónica" loading="lazy" decoding="async">
        </div>
        <div class="home-split-copy">
          <p>El grupo es dirigido por <a href="{{ site.baseurl }}/personas/">Luis Miguel Méndez Moreno</a>, coordinador curricular de Ingeniería Mecatrónica en la <a href="https://ingenieria.unal.edu.co/">Facultad de Ingeniería</a> de la <a href="https://unal.edu.co/">Universidad Nacional de Colombia</a>.</p>
          <p>Generamos conocimiento aplicado en instrumentación, procesamiento de señales y algoritmos inteligentes, con el compromiso de formar investigadores y aportar al desarrollo tecnológico del país.</p>
        </div>
      </div>

      <section class="home-section" aria-labelledby="lineas-heading">
        <p class="section-kicker">Investigación</p>
        <h3 id="lineas-heading" class="home-section-title">Líneas de investigación</h3>
        <p class="home-section-lead">Tres ejes que se cruzan en el laboratorio. Cada proyecto declara al menos una línea, su estado y el equipo responsable.</p>
        <div class="line-cards">
          {% for line in site.data.research_lines %}
            <a class="line-card" href="{{ site.baseurl }}/projects/?linea={{ line.id }}">
              <h4>{{ line.name }}</h4>
              <p>{{ line.description }}</p>
              <span class="line-card-link">Ver proyectos</span>
            </a>
          {% endfor %}
        </div>
      </section>

      <section class="home-section home-project-preview" aria-labelledby="proyectos-heading">
        <div class="home-section-head">
          <div>
            <p class="section-kicker">Portafolio</p>
            <h3 id="proyectos-heading" class="home-section-title">Proyectos recomendados</h3>
          </div>
          <a class="home-section-action" href="{{ site.baseurl }}/projects">Catálogo completo</a>
        </div>
        <p class="home-section-lead">Tres proyectos por vista. Avanza la terna para ver el resto del portafolio activo.</p>
      </section>
    </div>
  </div>

  {% assign recommended = research_pages | where: "status", "Activo" %}
  <div class="ternas" data-ternas>
    <div class="ternas-toolbar">
      <p class="ternas-status" aria-live="polite"></p>
      <div class="ternas-controls">
        <button type="button" class="ternas-btn" data-terna-prev aria-label="Terna anterior">Anterior</button>
        <button type="button" class="ternas-btn" data-terna-next aria-label="Terna siguiente">Siguiente</button>
      </div>
    </div>
    <div class="ternas-viewport">
      <div class="ternas-track">
        {% for proj in recommended %}
          {% assign terna_pos = forloop.index0 | modulo: 3 %}
          {% if terna_pos == 0 %}
            <div class="terna image-grid research project-catalog">
              <ul>
          {% endif %}
                {% include project_card.html project=proj %}
          {% if terna_pos == 2 or forloop.last %}
              </ul>
            </div>
          {% endif %}
        {% endfor %}
      </div>
    </div>
    <div class="ternas-dots" role="tablist" aria-label="Ternas de proyectos"></div>
  </div>

  <div class="row">
    <div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2">

      <section class="home-section news-section" aria-labelledby="noticias-heading">
        <p class="section-kicker">Actualidad</p>
        <h3 id="noticias-heading" class="home-section-title">Noticias del grupo</h3>
        <p class="home-section-lead">Convocatorias, inicio de semestre y notas de organización. Las más recientes primero.</p>
        {% assign posts = site.posts %}
        <div class="news-list">
          {% for post in posts limit: 5 %}
            {% include news_card.html post=post featured=forloop.first %}
          {% endfor %}
        </div>
      </section>

      {% include calendar.html %}

      <section class="home-cta">
        <h3>Colaborar con Kyma</h3>
        <p>Instituciones, semilleros y tesistas pueden proponer trabajo conjunto con el mismo criterio experimental. El laboratorio está en el campus Bogotá.</p>
        <p>
          <a href="{{ site.baseurl }}/contact" class="btn">Contáctanos</a>
          <a href="{{ site.baseurl }}/conocenos" class="btn">Sobre el grupo</a>
        </p>
      </section>
    </div>
  </div>
</div>
