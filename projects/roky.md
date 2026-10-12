---
layout: subpage
type: research
title: Roky
slug: roky
image: roky.png
image_webp: true
status: Activo
year: 2026
lines:
  - Sensores
  - Control
  - Inteligencia Artificial
keywords:
  - robótica
  - NQR
  - navegación
  - percepción
  - locomoción
  - centro de masa
  - giroscopio
summary: Plataforma robótica esférica para exploración y caracterización de terrenos de difícil acceso. En 2026-II el trabajo está en la locomoción por desplazamiento del centro de masa, el modelo dinámico y el banco de validación.
---

### Contexto
ROKY es una plataforma robótica esférica para la exploración autónoma y la caracterización de terrenos de difícil acceso. El punto de partida es la reconstrucción social frente al conflicto armado en Colombia: el país registra más de 12.500 casos de víctimas de minas antipersona de bajo costo y, al no estar basadas en materiales metálicos, su detección no alcanza alta confiabilidad con los métodos tradicionales.

El robot se plantea como herramienta de investigación en percepción, navegación y caracterización del entorno. El semestre 2026-II toma el diseño conceptual anterior y lo está convirtiendo en la primera estructura móvil: mecánica interna, modelo, control y la cáscara que lo protege.

### Objetivo
**Objetivo general.** Desarrollar una plataforma esférica capaz de desplazarse con estabilidad en terreno irregular y de caracterizar el entorno con percepción a bordo —IMU, visión y, en la línea de detección, resonancia cuadrupolar nuclear (NQR)—.

**Este semestre.** Dejar armada la primera estructura móvil esférica, con el centro de masa validado en el banco de giroscopio. Sobre esa base siguen el control embebido, la telemetría y las cámaras de profundidad.

### Avances, semestre 2026-II
El estado del arte, la definición de subsistemas, el modelo matemático y el testbench de pruebas quedaron recorridos entre agosto y septiembre. El diseño de locomoción y la propuesta mecánica siguen en curso.

#### Diseño mecánico
La cáscara es una esfera de policarbonato translúcido. Adentro, la locomoción junta dos acciones: el giro del eje interno, que produce el avance θ(t), y un desplazamiento del centro de masa (*tilting*) que inclina la esfera y la hace rodar.

<div class="project-gallery">
  <figure class="project-gallery-wide">
    {% include picture.html src="/img/research/roky/esfera" width="1024" height="768" alt="Render de Roky: esfera transparente con el mecanismo interno, el eje y el conjunto de desplazamiento del centro de masa" %}
    <figcaption>Concepto actual. La esfera encierra el eje de avance y el conjunto que desplaza el centro de masa.</figcaption>
  </figure>
  <figure class="project-gallery-wide">
    {% include picture.html src="/img/research/roky/mecanismo" width="1400" height="640" alt="Diseño mecánico preliminar: eje de avance con volante verde y mecanismo lineal de desplazamiento del centro de masa" %}
    <figcaption>Diseño mecánico preliminar. A la izquierda, el eje de avance θ(t). A la derecha, el desplazamiento del centro de masa.</figcaption>
  </figure>
</div>

La cinemática cierra dos relaciones: la ligadura de no deslizamiento entre la cáscara y el suelo, y el acople entre la traslación de la esfera y la rotación local del mecanismo.

<div class="project-gallery">
  <figure>
    {% include picture.html src="/img/research/roky/cinematica-ejes" width="900" height="507" alt="Esquema cinemático de la cáscara esférica con el eje actuador y los marcos de referencia" %}
    <figcaption>Cáscara, eje actuador y marcos de la esfera.</figcaption>
  </figure>
  <figure>
    {% include picture.html src="/img/research/roky/cinematica-masa" width="900" height="592" alt="Esquema del desplazamiento de masa interno, con el ángulo theta, la excentricidad y la inclinación beta" %}
    <figcaption>Masa interna, excentricidad e inclinación respecto a la vertical.</figcaption>
  </figure>
</div>

#### Modelo y control
El sistema es subactuado. El modelo dinámico se linealiza para un controlador LQR preliminar. En paralelo, los factores de diseño dimensionan el arrastre, el torque del motor y la fuerza de traslación, limitada por la fricción disponible.

<div class="project-gallery">
  <figure class="project-gallery-wide">
    {% include picture.html src="/img/research/roky/modelo" width="1400" height="648" alt="Diagrama del modelamiento dinámico: sistema subactuado, linealización, LQR y factores de diseño de arrastre, torque y traslación" %}
    <figcaption>Modelamiento dinámico y factores de diseño que alimentan el dimensionamiento.</figcaption>
  </figure>
</div>

Con ese modelo se armó un regulador de estados por realimentación completa. En simulación se comparan el sistema linealizado y el no linealizado ante un impulso: los estados del sistema linealizado se amortiguan y vuelven al origen.

<div class="project-gallery">
  <figure class="project-gallery-wide">
    {% include picture.html src="/img/research/roky/simulink" width="1400" height="655" alt="Diagrama en Simulink del regulador de estados para la dinámica de inclinación, con el sistema linealizado y el no linealizado" %}
    <figcaption>Regulador de estados de la dinámica de inclinación.</figcaption>
  </figure>
  <figure class="project-gallery-wide">
    {% include picture.html src="/img/research/roky/regulador" width="1400" height="680" alt="Respuesta simulada de cuatro estados del sistema linealizado, que oscilan y se estabilizan cerca de cero" %}
    <figcaption>Respuesta de los estados del sistema linealizado.</figcaption>
  </figure>
</div>

#### Banco de giroscopio
El centro de masa se valida antes de cerrar la esfera. La referencia es una estructura comercial tipo giroscopio FFT; en el laboratorio se diseña una versión propia en perfil de aluminio, con el marco que sostiene el conjunto interno.

<div class="project-gallery">
  <figure>
    {% include picture.html src="/img/research/roky/giroscopio" width="960" height="540" alt="Estructura comercial de giroscopio con anillos articulados, usada como referencia del banco de pruebas" %}
    <figcaption>Referencia comercial para el banco.</figcaption>
  </figure>
  <figure>
    {% include picture.html src="/img/research/roky/testbench" width="447" height="425" alt="Modelo del banco de laboratorio en perfil de aluminio, con soportes verticales y la guía del conjunto interno" %}
    <figcaption>Versión propia del banco, en diseño.</figcaption>
  </figure>
</div>

#### Superficie protectora
El reto de manufactura es la superficie protectora. La selección de material, con metodología de Ashby y asesoría de Helia Bibiana León, apunta a policarbonato translúcido termoformado. Siguen abiertas la estabilidad del robot ya ensamblado y la repetibilidad de ese proceso. También hay que medir cómo el policarbonato translúcido altera la profundidad que calculan las cámaras RGBD de tiempo de vuelo.

### Proyección del semestre
- Dimensionamiento de motores y selección final de sensores.
- Electrónica de control embebido.
- Ensamble e interfaces electrónicas y de software.
- Telemetría de las variables de funcionamiento.
- Cámaras RGBD ToF y el efecto del policarbonato translúcido en el cálculo de profundidad.

### Alcance
Incluye el prototipo mecatrónico de la esfera, el modelo y el control en simulación, el banco de giroscopio y las pruebas de percepción en laboratorio. Esta fase no contempla operación en campo minado ni uso humanitario directo.
