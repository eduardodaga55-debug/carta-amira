# Carta Interactiva Premium para Amira

Experiencia web romantica, cinematografica y responsive construida con HTML, CSS y JavaScript.

## Estructura

- `index.html`: contiene las 8 escenas de la experiencia.
- `css/style.css`: estilos, responsive design, animaciones visuales y componentes.
- `js/main.js`: transiciones con GSAP, Typed.js, tsParticles, carrusel, contador, sobre y sonido.
- `assets/`: recuerdos visuales de ejemplo en SVG. Puedes reemplazarlos por fotos reales manteniendo los nombres o cambiando la lista `memories` en `js/main.js`.

## Personalizacion rapida

1. En `js/main.js`, cambia `relationshipStartDate` por la fecha real.
2. Reemplaza el contenido de `letterText` por tu carta completa.
3. Sustituye `assets/memory-1.jpg.jpeg`, `assets/memory-2.jpg.jpeg` y `assets/memory-3.jpg.jpeg` por fotos o imagenes tuyas.
4. Si cambias nombres de imagenes, actualiza el arreglo `memories`.

## Probar localmente

Abre `index.html` directamente en el navegador. Tambien puedes usar cualquier servidor estatico si prefieres.

## Despliegue en GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube `index.html`, `css/`, `js/`, `assets/` y este `README.md`.
3. En GitHub, entra a `Settings` > `Pages`.
4. En `Build and deployment`, selecciona `Deploy from a branch`.
5. Elige la rama `main` y la carpeta `/root`.
6. Guarda los cambios. GitHub publicara la pagina en unos minutos.

## Librerias usadas

- GSAP para transiciones suaves.
- Typed.js para el efecto maquina de escribir.
- tsParticles para el cielo de estrellas interactivo.
