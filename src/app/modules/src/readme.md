# apps/src

Esta carpeta contiene el codigo de las aplicaciones desarrolladas independientemente.

Fue creado con el siguiente script:

``` bash
rsync --delete -aPv projects/sceiba-ng/src/app/ sceiba-ui/src/app/apps/src/records

rsync --delete -aPv projects/evaluation-ng/src/app/ sceiba-ui/src/app/apps/src/evaluations

rsync --delete -aPv projects/cuor-ng/src/app/ sceiba-ui/src/app/apps/src/organizations

rsync --delete -aPv projects/people-ng/src/app/ sceiba-ui/src/app/apps/src/persons

rsync --delete -aPv projects/catalog-ng/projects/catalog/src/app/ sceiba-ui/src/app/apps/src/sources

rsync --delete -aPv projects/catalog-ng/projects/revistasmes/src/app/ sceiba-ui/src/app/apps/src/revistasmes

```

Se supone que en esta carpeta no se modificará directamente nada.
