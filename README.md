# Equilibria Beauty

Repositorio público: **[`Drakeneess/equilibria-beauty`](https://github.com/Drakeneess/equilibria-beauty)**. Código fuente publicado en la rama `main`. Consulta [`GITHUB_SETUP.md`](GITHUB_SETUP.md) para clonar e iniciar el proyecto.

Sitio de demostración de **Equilibria Beauty**, especializado exclusivamente en estética facial y corporal. Migrado del mockup HTML a **Next.js 16, React 19, App Router y TypeScript**.

## Requisitos

- Node.js >= 20.9 (recomendado 22 LTS)
- npm

## Desarrollo

```bash
npm install
npm run dev
```

Abrir <http://localhost:3000>.

## Validación y producción

```bash
npm run typecheck
npm run build
npm start
```

## Estructura

- `src/app/`: layout, metadatos, página y CSS global.
- `src/components/`: página interactiva y componentes de marca.
- `src/data/treatments.ts`: servicios ilustrativos que pueden sustituirse por el catálogo real.
- `public/images/`: recursos locales extraídos del mockup aprobado, sin dependencia de imágenes externas.
- `public/brand/`: logotipos SVG vectoriales independientes.
- `src/components/BrandMark.tsx`: componente de marca único que usa el SVG refinado, ver [BRANDING.md](BRANDING.md).

## Pendiente antes de publicar

- Confirmar servicios, precios, descripciones, requisitos y duración real de los tratamientos.
- Validar las fotografías para uso comercial y conservar el logotipo SVG aprobado sin alterar sus contornos.
- Confirmar horarios, sede, medios de contacto y políticas de privacidad.
- Conectar un proveedor real de reservas; **el formulario actual no envía ni almacena datos**.
- Revisar texto legal, accesibilidad y SEO; `robots` impide indexar esta demo.

**Límite de marca:** Beauty es solo estética facial y corporal; cuencos, masajes relajantes, tratamientos holísticos y experiencias de relajación pertenecen a Equilibria Wellness.


## Identidad y navegación interactiva

El navbar y el footer usan el logotipo horizontal refinado ubicado en `public/brand/equilibria-beauty.svg` mediante el componente `BrandMark`. Ambos llevan al inicio, con respuesta en hover y foco. La navegación resalta la sección visible, muestra una línea de progreso y cierra el menú móvil al navegar, pulsar Escape o hacer clic fuera. Los filtros de tratamientos, las preguntas frecuentes y el formulario demostrativo son interactivos. **El formulario no envía ni guarda datos.**
