import type { CatalogPackage } from "./types";

/**
 * Approved-for-layout photos extracted from the two catalog PDFs supplied
 * by Equilibria. Each image has a stable filename keyed by package ID.
 *
 * Verify the rights to reuse any third-party stock photographs before a
 * public commercial launch. These photos do not certify outcomes.
 */
const imageAltByPackageId: Record<string, string> = {
  "beauty-facial-limpieza-equilibria": "Aplicación de mascarilla durante una limpieza facial",
  "beauty-facial-ritual-de-loto": "Masaje facial delicado realizado en camilla",
  "beauty-facial-hielo-de-luna": "Ritual facial relajante sobre el rostro",
  "beauty-facial-nube-de-vainilla": "Mascarilla de cuidado facial sobre la piel",
  "beauty-facial-luz-de-arroz": "Aplicación de mascarilla facial con brocha",
  "beauty-facial-luz-de-latte": "Exfoliación facial con café",
  "beauty-facial-detox-plus": "Equipo de microdermoabrasión en un tratamiento facial",
  "beauty-facial-reafirmante-nocturno": "Aplicación de dispositivo cosmético sobre el rostro",
  "beauty-facial-frost-glow": "Herramientas frías utilizadas en un cuidado facial",
  "beauty-facial-teen-skin-care": "Cuidado cosmético de la piel de una persona joven",
  "beauty-facial-glow-basico": "Procedimiento de limpieza y cuidado facial",
  "beauty-facial-glow-premium": "Dispositivo estético empleado durante un tratamiento facial",
  "beauty-corporal-reduccion-express": "Aplicación de equipo estético en el abdomen",
  "beauty-corporal-ice-sculpt": "Colocación de vendas en tratamiento corporal",
  "beauty-corporal-bella-figura": "Procedimiento corporal con equipo estético",
  "beauty-corporal-silueta-de-diosa": "Radiofrecuencia estética aplicada sobre abdomen",
  "beauty-corporal-gluteo-power-up": "Tratamiento corporal con dispositivo estético",
  "beauty-corporal-modelo-natural": "Envoltura aplicada sobre abdomen",
  "beauty-corporal-curvas-delicadas": "Equipo estético aplicado durante tratamiento corporal",
  "beauty-corporal-impacto-reductor": "Masaje manual de la región abdominal",
  "beauty-corporal-esbelta-premium": "Tratamiento de masaje y envolturas corporales",
  "beauty-corporal-reina-total": "Equipo corporal aplicado sobre abdomen",
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
