---
layout: page
title: Conócenos
menu-order: 8
hero-image-origin: 100% 0%
---

<div class="row">
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2" markdown="1">

### Quién es Kyma

Somos un **grupo de investigación interdisciplinario** de la **Universidad Nacional de Colombia, Sede Bogotá**, con énfasis en **ingeniería** y **física aplicada**. Pertenecemos a la Facultad de Ingeniería, Departamento de Ingeniería Mecánica y Mecatrónica, y estamos oficializados en el sistema de información **Hermes**.

El nombre viene del griego *κῦμα* —ola—. Creemos en el trabajo colaborativo, en la diversidad de conocimientos y en la curiosidad como requisito de entrada.

<div class="about-gallery">
  <figure class="about-gallery-feature">
    <img src="{{ site.baseurl }}/img/group/web/campus.jpg" width="1024" height="603" alt="El grupo Kyma reunido en el campus de la Universidad Nacional" loading="eager" decoding="async">
  </figure>
  <figure>
    <img src="{{ site.baseurl }}/img/group/web/facultad.jpg" width="1400" height="1050" alt="Integrantes de Kyma frente a la Facultad de Ingeniería" loading="lazy" decoding="async">
  </figure>
  <figure>
    <img src="{{ site.baseurl }}/img/group/web/laboratorio.jpg" width="1400" height="1050" alt="Integrantes de Kyma en el laboratorio" loading="lazy" decoding="async">
  </figure>
  <figure class="about-gallery-wide">
    <img src="{{ site.baseurl }}/img/group/web/plaza.jpg" width="1600" height="702" alt="El grupo Kyma en la plaza del campus" loading="lazy" decoding="async">
  </figure>
</div>

### Qué hacemos

Diseñamos, desarrollamos e implementamos soluciones en **sensores**, **control** e **inteligencia artificial**, desde el diseño y la fabricación hasta la implementación experimental. Trabajamos en el Laboratorio de Mecatrónica del campus Bogotá.

{% for line in site.data.research_lines %}
##### {{ line.name }}
{{ line.description }}
{% endfor %}

Más detalle en el [catálogo de proyectos]({{ site.baseurl }}/projects). También hacemos [desarrollos]({{ site.baseurl }}/services) para semilleros, asignaturas y otras entidades.

### Filosofía de los proyectos

La misión es desarrollar investigación aplicada: del diseño conceptual y el prototipo hasta la validación en laboratorio o en entorno controlado. El objetivo es impulsar innovación tecnológica con impacto verificable, y formar investigadores capaces de documentar, reproducir y transferir su trabajo.

Cada proyecto declara su alcance y sus límites éticos. Nos interesa el impacto social —salud, seguridad, educación, acceso a tecnología— y la investigación científica: modelos, simulaciones, validación experimental y, cuando corresponde, publicaciones y ponencias.

En la práctica el ciclo es el mismo: se plantea el problema, se prototipa en el laboratorio y se mide. Si el resultado no se sostiene, se reformula.

### Cómo entrar

> No necesitas ser un experto para unirte. Basta con compromiso, rigor y ganas de aportar.

Cuando hay convocatoria, se anuncia en la [portada]({{ site.baseurl }}/) y por correo. También puedes escribir si te interesa una tesis, una rotación o un desarrollo conjunto.

¿Quieres colaborar? Escríbenos a [{{ site.email }}](mailto:{{ site.email }}) o visita [Contáctanos]({{ site.baseurl }}/contact).

</div>
</div>
