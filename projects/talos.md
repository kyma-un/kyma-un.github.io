---
layout: subpage
type: research
title: Talos
slug: talos
permalink: /projects/talos/
image: talos.jpg
status: Activo
year: 2025
lines:
  - Control
keywords:
  - Julia
  - robótica
  - cinemática
  - dinámica
  - software científico
  - código abierto
summary: Implementación y extensión en Julia del Robotics Toolbox de Peter Corke, para análisis de cinemática, dinámica, planeación de trayectorias y visualización de manipuladores seriales, con foco en desempeño y reproducibilidad científica.
---

### Contexto
Talos parte de una herramienta ya consolidada en la comunidad de robótica: el **Robotics Toolbox** de Peter Corke, publicado originalmente en 1996 para MATLAB como apoyo a su propia investigación doctoral, y reescrito posteriormente en Python (2021) junto con Jesse Haviland bajo el nombre *Robotics Toolbox for Python*. A lo largo de casi tres décadas, el toolbox se ha convertido en una referencia académica para representar la cinemática y dinámica de manipuladores seriales como objetos de software, e incluye implementaciones para robots clásicos (Puma 560, Stanford arm) y modernos (Kinova, Universal Robots, Rethink), además de servir como compañero del libro *Robotics, Vision & Control* del mismo autor. Su versión en Python introdujo la notación ETS (*Elementary Transform Sequence*) para describir de forma sistemática la cadena cinemática de un robot, simplificando el cómputo de jacobianos y hessianos del manipulador.

Sin embargo, tanto la versión de MATLAB como la de Python enfrentan una limitación conocida en software científico: el *problema de los dos lenguajes*, donde se necesita un lenguaje de bajo nivel para las partes críticas en desempeño (control en tiempo real, integración numérica) y un lenguaje de alto nivel para prototipado e interactividad, lo que incrementa la complejidad del software. Julia se diseñó explícitamente para resolver esta tensión: ofrece una sintaxis de alto nivel, cercana a Python o MATLAB, junto con un compilador *just-in-time* capaz de generar código con desempeño comparable a C o Fortran, gracias en buena parte a su sistema de *multiple dispatch*. Trabajos previos en robótica ya han demostrado esta ventaja de forma concreta: un conjunto de paquetes en Julia permitió simular en tiempo real (aproximadamente el doble de velocidad respecto al tiempo real) el balance del robot humanoide Atlas de Boston Dynamics mediante un controlador basado en programación cuadrática, manteniendo además una variación de frecuencia de control suficientemente baja para su despliegue en el robot físico.

Talos busca llevar ese mismo beneficio a la línea de trabajo de KYMA en robótica y control: contar con una librería de cinemática, dinámica y visualización de manipuladores, nativa en Julia, con la madurez conceptual del toolbox de Corke pero con el desempeño necesario para simulación intensiva, optimización de trayectorias y, eventualmente, integración con esquemas de control en tiempo real o de aprendizaje por refuerzo desarrollados por el grupo.

El desarrollo cuenta con el apoyo y la orientación directa del profesor **Peter Corke**, autor original del toolbox.

### Objetivos
- Reproducir en Julia las funcionalidades núcleo del Robotics Toolbox (cinemática directa e inversa, jacobianos, generación de trayectorias, visualización 3D de manipuladores).
- Aprovechar el desempeño de Julia para incorporar herramientas de simulación dinámica, análisis de cargas y control que resulten costosas en las versiones de MATLAB o Python.
- Adoptar y extender la notación ETS para la descripción sistemática de cadenas cinemáticas de robots seriales.
- Mantener documentación, ejemplos reproducibles y una arquitectura abierta a la contribución estudiantil dentro del grupo KYMA.
- Explorar la integración de Talos con otras líneas de investigación del grupo (control, estimación de estado, aprendizaje por refuerzo) como sustrato computacional común.

### Alcance
El desarrollo actual se concentra en manipuladores seriales y en alcanzar paridad funcional con el toolbox de referencia en cinemática y visualización. Los módulos de dinámica avanzada, planeación de trayectorias con restricciones y control se incorporan de manera incremental, priorizando primero la correctitud numérica y después la optimización de desempeño.

### Referencias y recursos
- P. Corke, *A robotics toolbox for MATLAB*, IEEE Robotics and Automation Magazine, 3(1):24–32, 1996.
- P. Corke, J. Haviland, *Not your grandmother's toolbox – the Robotics Toolbox reinvented for Python*, Proc. ICRA 2021.
- P. Corke, *A simple and systematic approach to assigning Denavit-Hartenberg parameters*, IEEE Transactions on Robotics, 23(3):590–594, 2007.
- Robotics Toolbox for Python — repositorio oficial: [github.com/petercorke/robotics-toolbox-python](https://github.com/petercorke/robotics-toolbox-python)
- Robotics Toolbox for MATLAB — repositorio oficial: [github.com/petercorke/robotics-toolbox-matlab](https://github.com/petercorke/robotics-toolbox-matlab)
- Documentación e introducción histórica del toolbox: [petercorke.github.io/robotics-toolbox-python](https://petercorke.github.io/robotics-toolbox-python/intro.html)
- Perfil y paquetes de Peter Corke en GitHub: [github.com/petercorke](https://github.com/petercorke)
- J. Koolen, T. Deits et al., *Julia for robotics: simulation and real-time control in a high-level programming language*, IEEE ICRA 2019.
