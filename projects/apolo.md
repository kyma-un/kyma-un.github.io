---
layout: subpage
type: research
title: Apolo
image: apolo.png
hero-image-origin: 100% 0%
---



Este proyecto investiga el uso de técnicas de aprendizaje por refuerzo (Reinforcement Learning, RL) como alternativa innovadora para el diseño de esquemas de control en sistemas electromecánicos. En particular, se estudian enfoques de aprendizaje por refuerzo multiagente (MARL), donde múltiples agentes interactúan en un entorno compartido para coordinar o competir en el control de diferentes actuadores.

La propuesta busca implementar algoritmos MARL utilizando la librería RLlib, con el fin de generar dinámicas tanto cooperativas como adversarias que permitan modificar de manera adaptativa la respuesta global de un sistema de estudio. De este modo, se exploran estrategias que trascienden los esquemas de control clásicos, ofreciendo soluciones más flexibles y robustas frente a escenarios dinámicos e inciertos.

Este proyecto abre un campo de aplicación interdisciplinar, donde convergen la inteligencia artificial, la teoría de control, la robótica y los sistemas electromecánicos. Los estudiantes que participen tendrán la oportunidad de trabajar con algoritmos de vanguardia en control inteligente, experimentar con simulaciones complejas y contribuir a la creación de metodologías con proyección en áreas como la automatización, la energía y los sistemas autónomos.

$$ \oint f(x,y) dx = \vec{F}$$

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/Igu_NAdcayc"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    style="position:absolute; top:0; left:0; width:100%; height:100%;">
  </iframe>
</div>

{% include pdf-viewer.html
    title="Especificación del Sistema"
    subtitle="Documento oficial revisado · Versión 3.2"
    file="/pdfs/diagram.pdf"
%}

{% include model3d.html
     
     src="/assets/models/robot.glb"
     caption="Render interactivo del modelo CAD utilizado para el análisis cinemático."
     height="450px"
%}
