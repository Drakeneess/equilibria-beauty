# Catálogo de Equilibria Beauty — fuente estática

## Estado actual
- **23 paquetes** extraídos de los 2 catálogos aportados: **12 faciales** + **11 corporales**.
- **Unidad de negocio:** `beauty` para los 23. Ningún paquete completo fue clasificado como `wellness`.
- **Frontend conectado:** `src/components/CatalogSection.tsx` consume `publishedBeautyPackages` desde `src/data/catalog/`. Los 4 tratamientos antiguos de `src/data/treatments.ts` ya no se muestran.
- **No existe backend ni persistencia** de estos paquetes. Todo está en módulos TypeScript bajo `src/data/catalog/`.

## Estructura
- `types.ts`: contrato `CatalogPackage` para migrar a BD/API en el futuro.
- `facials.ts`: paquetes faciales.
- `corporals.ts`: paquetes corporales.
- `index.ts`: exportaciones y consultas por ID/unidad/categoría.

Ejemplo de uso interno:
```ts
import { catalogPackages, getCatalogPackageById, filterCatalogPackages } from "@/data/catalog";

const beautyFacials = filterCatalogPackages({ businessUnit: "beauty", category: "facial" });
const packageDetail = getCatalogPackageById("beauty-facial-ritual-de-loto");
```

## Fuente y fidelidad
- Documento `catalogo-paquetes-faciales`: **Catalogo PAQUETES FACIALES. by Equilibria.pdf.pdf**, páginas 3–8.
- Documento `catalogo-paquetes-corporales`: **Catalogo PAQUETES CORPORALES by Equilibria..pdf.pdf**, páginas 3–9.
- Los procedimientos y finalidades reproducen el contenido fuente con saltos de línea unidos. Se mantienen algunas grafías del PDF y se señalan anomalías en `internalNotes`.
- Si el PDF **no indica sesiones**, el valor es `null`, no se supone una sesión.
- `per_procedure` significa desglose por técnica, **no suma de citas**: sus cantidades no implican un número de visitas.
- El regalo de **Silueta de Diosa** se representa con `bonus`, sin aumentar sus 10 sesiones declaradas.

## Revisión obligatoria antes de publicar
1. Confirmar **precios vigentes**, especialmente **Glow Premium: Bs 180 con 2 sesiones**, tal como aparece en el PDF.
2. Validar prestación, disponibilidad, contraindicaciones y requisitos de los procedimientos.
3. Revisar los textos `purposeFromCatalog`. Frases como «romper grasa», «desintoxicación», «activar metabolismo» o «cierra poros» son **afirmaciones del catálogo**, no hechos clínicos verificados. No publicarlas automáticamente.
4. Confirmar las técnicas con unidades ambiguas: «1 Detoxificante iónico» aparece sin la palabra sesión en algunos paquetes.
5. No copiar el pie de los PDF «Calle Cualquiera 123, Cualquier Lugar»: es un marcador provisional.
6. Decidir posteriormente si el backend contendrá entidades `catalog_items`, `package_inclusions`, `session_breakdown` y `prices`, conservando estos IDs.

Los 23 registros se publican con `publicationStatus: "published"` por decisión del equipo. En la web figura el aviso de confirmar precios y disponibilidad. Se mantiene la consulta por WhatsApp sin reserva automática.


## Fotografías del catálogo
- Se incorporaron **23 fotos específicas**, una por paquete, desde los PDF proporcionados.
- Archivos WebP locales: `public/images/catalog/beauty-*.webp`. Relación estable por ID en `src/data/catalog/media.ts`.
- Resolución de exportación: **672 × 448 px**, optimizada para tarjetas. Peso total aproximado: **392 KB**.
- No se utilizaron imágenes externas ni se generaron fotografías para reemplazar el contenido original.
- La interfaz tiene un fallback para futuros paquetes sin imagen asignada.
- **Licencias:** el material fuente incluye fotografías que podrían ser de bancos de imágenes. Confirmar el permiso de reutilización comercial de esas fotografías antes del lanzamiento público.
- Si se cambia un archivo, conservar el ID en su nombre o actualizar la asignación `getCatalogImage`.


## Presentación pública sin precios
A partir de esta actualización, la página muestra los **23 tratamientos**, sus procedimientos y sesiones, pero no muestra importes ni filtros por precio. Las consultas por WhatsApp siguen funcionando.

**Los precios se mantienen en los archivos TypeScript de origen** para un futuro backend. Este repositorio es público y estos valores no deben considerarse secretos ni privados. La retirada de precios del sitio no modifica la naturaleza comercial de una página que promociona servicios y no determina la elegibilidad para un plan de alojamiento gratuito.
