---
layout: subpage
type: research
title: Apolo
slug: apolo
image: apolo.png
hero-image-origin: 100% 0%
status: Activo
year: 2025
lines:
  - Control
  - Inteligencia Artificial
keywords:
  - aprendizaje por refuerzo
  - MARL
  - control inteligente
  - sistemas electromecánicos
summary: Estudio de aprendizaje por refuerzo multiagente (MARL) como alternativa al diseño clásico de control en sistemas electromecánicos.
video: https://www.youtube.com/watch?v=Igu_NAdcayc
---

### Contexto
El proyecto investiga el uso de técnicas de aprendizaje por refuerzo (RL) para el diseño de esquemas de control. En particular, se estudian enfoques multiagente (MARL), donde varios agentes interactúan en un entorno compartido para coordinar o competir en el control de distintos actuadores.

La propuesta implementa algoritmos MARL con la librería RLlib, con el fin de generar dinámicas cooperativas y adversarias que modifiquen de forma adaptativa la respuesta global del sistema de estudio.

### Objetivos
- Formular el problema de control como un proceso de decisión multiagente.
- Comparar políticas aprendidas frente a esquemas de control clásicos en escenarios inciertos.
- Documentar metodologías reproducibles de simulación y entrenamiento.

### Alcance
El trabajo se centra en simulación, diseño de recompensas y análisis de políticas. La implementación física queda como etapa posterior de validación.

### Material complementario

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/Igu_NAdcayc"
    title="Video del proyecto Apolo"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    style="position:absolute; top:0; left:0; width:100%; height:100%;">
  </iframe>
</div>

{% include pdf-viewer.html
    title="Especificación del Sistema"
    subtitle="Documento de trabajo"
    file="/pdfs/diagram.pdf"
%}

{% include model3d.html
     src="/assets/models/robot.glb"
     caption="Render interactivo del modelo CAD utilizado para el análisis cinemático."
     height="450px"
%}
