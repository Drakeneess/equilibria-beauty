import type { CatalogPackage } from "./types";

/**
 * Each image keeps a stable file name keyed by package ID.
 *
 * Ten treatments formerly showed a visible decorative/scalloped frame from
 * the source PDF. Those assets were replaced by unframed synthetic editorial
 * photos (2026-11-06). Six additional photos were updated independently
 * for continuity of scene and warmer styling. Other images originate from the PDFs.
 *
 * All imagery is illustrative, not a photograph of actual Equilibria staff,
 * facilities or patients, and is not evidence of treatment results.
 * Verify rights for any third-party photos before commercial use.
 */
const imageAltByPackageId: Record<string, string> = {
  "beauty-facial-limpieza-equilibria": "Aplicación de mascarilla durante una limpieza facial",
  "beauty-facial-ritual-de-loto": "Masaje facial delicado realizado en camilla",
  "beauty-facial-hielo-de-luna": "Crioterapia facial ilustrativa con esferas frías sobre las mejillas",
  "beauty-facial-nube-de-vainilla": "Aplicación ilustrativa de mascarilla cremosa en una sesión facial",
  "beauty-facial-luz-de-arroz": "Aplicación de mascarilla facial con brocha",
  "beauty-facial-luz-de-latte": "Exfoliación facial con café",
  "beauty-facial-detox-plus": "Mascarilla de arcilla sobre un rostro durante cuidado facial ilustrativo",
  "beauty-facial-reafirmante-nocturno": "Dispositivo facial de radiofrecuencia aplicado a la mejilla, imagen ilustrativa",
  "beauty-facial-frost-glow": "Herramientas frías utilizadas en un cuidado facial",
  "beauty-facial-teen-skin-care": "Aplicación ilustrativa de una mascarilla facial suave en cabina de estética",
  "beauty-facial-glow-basico": "Tratamiento facial estético con dispositivo en ambiente clínico, imagen ilustrativa",
  "beauty-facial-glow-premium": "Aplicación ilustrativa de sérum durante un cuidado facial",
  "beauty-corporal-reduccion-express": "Equipo estético con aplicadores sobre el abdomen durante un tratamiento corporal ilustrativo",
  "beauty-corporal-ice-sculpt": "Envoltura corporal ilustrativa sobre el abdomen en una cabina de estética cálida",
  "beauty-corporal-bella-figura": "Equipo estético aplicado al abdomen en un tratamiento corporal ilustrativo",
  "beauty-corporal-silueta-de-diosa": "Aplicación ilustrativa de vendas en un tratamiento corporal",
  "beauty-corporal-gluteo-power-up": "Maderoterapia ilustrativa aplicada sobre cadera y muslo en un ambiente de estética",
  "beauty-corporal-modelo-natural": "Equipo de estética corporal aplicado sobre abdomen en una cabina de tonos cálidos",
  "beauty-corporal-curvas-delicadas": "Maderoterapia en el muslo durante un masaje corporal ilustrativo",
  "beauty-corporal-impacto-reductor": "Equipo estético aplicado sobre el muslo durante una sesión corporal ilustrativa",
  "beauty-corporal-esbelta-premium": "Tratamiento de masaje y envolturas corporales",
  "beauty-corporal-reina-total": "Profesional realiza un tratamiento estético corporal con equipo sobre abdomen, imagen ilustrativa",
  "beauty-corporal-silueta-pro": "Maderoterapia corporal con rodillo",
};

export function getCatalogImage(item: Pick<CatalogPackage, "id" | "name" | "category">) {
  const alt = imageAltByPackageId[item.id];
  return alt ? {
    src: `/images/catalog/${item.id}.webp`,
    alt,
  } : {
    src: item.category === "facial" ? "/images/facial-care.jpg" : "/images/body-aesthetics.jpg",
    alt: `Imagen ilustrativa de ${item.name}`,
  };
}
