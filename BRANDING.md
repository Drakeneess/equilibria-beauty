# Equilibria Beauty · Identidad visual

Se incorporó el logotipo dorado **refinado y aprobado** en la navegación superior y el pie de página, usando **el mismo archivo SVG externo** sin regenerar la tipografía ni modificar los contornos.

## Archivos actuales

- `public/brand/equilibria-beauty.svg`: logotipo horizontal completo (1.921 × 570; transparente).
- `public/brand/equilibria-beauty-isotipo.svg`: isotipo independiente (512 × 585; transparente).
- `src/app/icon.svg`: favicon generado a partir del isotipo refinado.
- `src/components/BrandMark.tsx`: enlace reutilizable al inicio con animación suave en hover y foco de teclado.

La animación se aplica sobre el elemento completo mediante CSS (transformación y resplandor); **no modifica las formas internas del SVG**. Se desactiva para usuarios con preferencia por movimiento reducido.

Si se sustituye el logotipo en el futuro, mantener las proporciones de la etiqueta `Image` y revisar `src/app/globals.css`.
