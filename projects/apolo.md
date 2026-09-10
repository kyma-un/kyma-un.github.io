---
layout: subpage
type: service
title: Apolo
slug: apolo
image: apolo.png
hero-image-origin: 100% 0%
status: Activo
year: 2026
lines:
  - Robótica
  - Control
  - Sensores y Actuadores
keywords:
  - manipulador robótico
  - 6 DOF
  - PAROL6
  - ROS 2
  - gemelo digital
  - ingeniería inversa
  - open-source
  - estimadores de estado
  - fuerza sensorless
  - observadores de perturbación
summary: Manipulador robótico serial de 6 GDL de código abierto, basado en PAROL6, concebido como plataforma de investigación en estimación de fuerza sensorless mediante observadores de estado, y como banco de docencia y calibración de sensores para el Grupo KYMA.
video: https://www.youtube.com/watch?v=Igu_NAdcayc
---

### Contexto
Apolo nace en el Grupo de Investigación KYMA (Departamento de Ingeniería Mecánica y Mecatrónica, Universidad Nacional de Colombia) a partir de dos necesidades recurrentes: contar con un banco de referencia mecánica repetible para calibrar sensores de investigación (IMUs, sensores capacitivos de nivel, detectores ópticos) y disponer de un manipulador serial de 6 GDL que sirva como sistema mecatrónico completo para la docencia en Robótica, Servomecanismos, Control y Sensores y Actuadores.

Los robots industriales disponibles en la universidad son plataformas cerradas orientadas al uso de software propietario, lo que limita el estudio de su arquitectura, selección de motores, transmisiones y decisiones de manufactura. Como respuesta, se evaluaron distintos manipuladores seriales abiertos (BCN3D Moveo, OpenMANIPULATOR-X, Annin Robotics AR4, THOR, reBot-DevArm y PAROL6), seleccionando **PAROL6** como base del proyecto por su arquitectura de 6 GDL, su documentación abierta (CAD, STL, firmware, GUI y BOM), su formato de escritorio y su buena alineación con los objetivos de rediseño mecánico-electrónico.

Dado que KYMA es un grupo enfocado en **sensores, control e inteligencia artificial**, Apolo se plantea no solo como una plataforma docente, sino como un **banco de pruebas para investigación en control e instrumentación**. En particular, el diseño de una tarjeta de control propia —con lectura articular de alta resolución (q, q̇) y control de corriente por articulación— habilita una línea de investigación en **estimación de fuerza sensorless**: inferir las fuerzas y torques de interacción en el efector final a partir de variables ya disponibles en el sistema (corriente de los motores, posición y velocidad articular), sin necesidad de sensores de fuerza/torque dedicados. Este enfoque reduce costos, evita la instrumentación de cada articulación y constituye un problema de investigación relevante en control robótico, al requerir el diseño de **observadores de estado** (observadores de perturbación, filtros de Kalman extendido/unscented, momentum-based observers) que estimen simultáneamente fricción, gravedad, inercia y fuerzas externas a partir de un modelo dinámico del manipulador.

### Objetivos
**Objetivo general**
Desarrollar e implementar un manipulador robótico de 6 grados de libertad basado en PAROL6, mediante ingeniería inversa y rediseño de sus subsistemas mecánico y electrónico, para disponer de una plataforma abierta de docencia, investigación y validación experimental en robótica, control, instrumentación y **estimación de fuerza sensorless**.

**Objetivos específicos**
- Realizar la ingeniería inversa mecánica de la estructura PAROL6 (eslabones, transmisión y muñeca) y rediseñarla según las capacidades de manufactura del laboratorio.
- Ejecutar la ingeniería inversa electrónica de la tarjeta de control original y diseñar una tarjeta propia (STM32, Nucleo F767ZI) con lectura articular de alta resolución y control de corriente por articulación, como base instrumental para la estimación de fuerza.
- Implementar la electrónica de potencia, comunicaciones y seguridad (drivers, E-stop, límites de software).
- Desarrollar un gemelo digital (URDF + MoveIt 2 + RViz) para validar trayectorias, configuraciones y modelos dinámicos antes de su ejecución en el robot físico.
- Obtener el modelo dinámico del manipulador (parámetros inerciales, fricción, gravedad) necesario para el diseño de observadores de estado.
- Diseñar, simular e implementar **estimadores de estado (observadores de perturbación / filtros de Kalman) para la medición de fuerza sensorless** en el efector final, a partir de corriente y estados articulares.
- Integrar el control articular sobre ROS 2 (Jazzy) y ejecutar rutinas básicas de operación y de validación experimental de los estimadores.
- Diseñar y aplicar un protocolo de verificación y validación del desempeño de la plataforma y de la precisión de la estimación de fuerza frente a una referencia instrumentada.
- Documentar el sistema y los resultados de investigación mediante manuales, guías de laboratorio y un repositorio técnico reproducible.

### Alcance
**Incluye:** ingeniería inversa y rediseño mecánico (eslabones, transmisión, muñeca) adaptado a manufactura FDM, corte láser y mecanizado; ingeniería inversa electrónica y diseño de una tarjeta propia en KiCad con instrumentación articular de alta resolución; electrónica de potencia y seguridad; gemelo digital en ROS 2; control articular básico; identificación del modelo dinámico del manipulador; diseño y validación experimental de observadores de estado para estimación de fuerza sensorless; protocolo de verificación y validación; documentación y repositorio público.

**No incluye:** certificaciones formales de seguridad industrial, operación con cargas superiores a las previstas académicamente, integración avanzada de visión artificial, producción en serie de la tarjeta electrónica, desarrollo de un gripper especializado como entregable principal, ni integración completa de sensores externos como subsistema definitivo (se abordará en fases posteriores). La estimación de fuerza sensorless se aborda como línea de investigación asociada, validada sobre la plataforma pero sin constituir su único entregable.

El proyecto se desarrolla en un plan de trabajo de 14 semanas, desde la definición de requisitos y la ingeniería inversa hasta el diseño detallado, manufactura, ensamble, integración del gemelo digital y validación final del sistema integrado, dejando la plataforma habilitada para el trabajo posterior en control e IA aplicados a estimación de fuerza.

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
