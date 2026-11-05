# Experiencia Equilibria Beauty — videos y comentarios

La sección de la página tiene soporte para contenido real sin cambiar componentes.
Editar `src/data/experience.ts`. No publicar testimonios sin consentimiento.

## Videos locales

1. Colocar un video MP4/WebM en `public/videos/`.
2. Opcionalmente colocar la miniatura en `public/images/`.
3. Agregar un elemento a `experienceVideos`:

```ts
{
  id: "recorrido-beauty",
  title: "Conoce nuestro espacio",
  description: "Recorrido por Equilibria Beauty.",
  source: "file",
  src: "/videos/recorrido-beauty.mp4",
  poster: "/images/recorrido-beauty.jpg",
  mimeType: "video/mp4"
}
```

Se recomienda incluir subtítulos WebVTT: `captions: "/videos/recorrido-beauty.vtt"`.

## YouTube

```ts
{
  id: "presentacion",
  title: "Presentación",
  description: "Video de presentación de nuestro espacio.",
  source: "youtube",
  youtubeId: "ID_REAL_DEL_VIDEO"
}
```

Se utiliza youtube-nocookie.com y la carga diferida del iframe.

## Comentarios

El catálogo de comentarios es de lectura; **no permite publicar comentarios anónimos** ni los almacena.
Para mostrar opiniones verificadas, añadir elementos con `approved: true` y `consentToPublish: true`:

```ts
{
  id: "opinion-01",
  author: "Nombre autorizado",
  text: "Texto aprobado por la persona que lo dio.",
  context: "Servicio recibido (opcional)",
  approved: true,
  consentToPublish: true
}
```

Usar solo contenido auténtico, con derechos de publicación. No añadir citas ni videos ficticios.
Los estados vacíos son intencionales: desaparecen en cuanto haya material configurado.
Para recibir comentarios directamente de visitantes se necesitará un sistema de autenticación/moderación, almacenamiento y avisos de privacidad.
