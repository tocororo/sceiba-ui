# apps/modules

Por cada carpeta en **apps/src** hay una equivalente aquí que contiene los ficheros definición del módulo:

- app.module.ts
- app.component.ts
- app.component.html
- app.component.scss
- app-routing.module.ts

La idea es que estos ficheros transforman lo que era una app independiente en un modulo dentro de sceiba-ui y deben ser modificados manualmente.

Se ponen en una nueva carpeta para no tener que modificar nada dentro de apps/src, de manera las actualizaciones puedan ser integradas más fácil.
