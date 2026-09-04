---
layout: page
title: Conócenos
menu-order: 8
hero-image-origin: 100% 0%
---


<div class="row">
<div class="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2" markdown="1">


Somos un **grupo de investigación interdisciplinario** de la **Universidad Nacional de Colombia, Sede Bogotá**, con énfasis en **ingeniería** y **física aplicada**. Diseñamos, desarrollamos e implementamos soluciones en **sensores**, **control** e **inteligencia artificial**.

Pertenecemos a la Facultad de Ingeniería, Departamento de Ingeniería Mecánica y Mecatrónica, y estamos oficializados en el sistema de información **Hermes**.

Creemos en el trabajo colaborativo, en la diversidad de conocimientos y en la curiosidad como requisito de entrada.

> No necesitas ser un experto para unirte. Basta con compromiso, rigor y ganas de aportar.


#### Misión

Desarrollar investigación aplicada con trazabilidad experimental: del diseño conceptual y el prototipo hasta la validación en laboratorio o en entorno controlado.


#### Líneas de investigación

Todo proyecto se alinea con al menos una línea:

{% for line in site.data.research_lines %}
##### {{ line.name }}
{{ line.description }}
{% endfor %}

Más detalle en el [catálogo de proyectos]({{ site.baseurl }}/projects): cada ficha declara líneas, estado, palabras clave y equipo.


#### Enfoques de impacto

##### Impacto social
Aplicaciones en salud, seguridad, educación o acceso a tecnología en contextos reales, con alcance y límites éticos explícitos en cada proyecto.

##### Investigación científica
Modelos, simulaciones, validación experimental y, cuando corresponda, publicaciones y ponencias.

#### Objetivo

Impulsar investigación aplicada e innovación tecnológica con impacto verificable, y formar investigadores capaces de documentar, reproducir y transferir su trabajo.

---

¿Quieres colaborar? Escríbenos a [{{ site.email }}](mailto:{{ site.email }}) o visita [Contáctanos]({{ site.baseurl }}/contact).

</div>


</div>
