import type { BusinessUnit, CatalogCategory, CatalogPackage } from "./types";
import { facialPackages } from "./facials";
import { corporalPackages } from "./corporals";

export type { BusinessUnit, CatalogCategory, CatalogPackage } from "./types";
export { facialPackages, corporalPackages };

/** Catálogo consumido por la web, preparado para API o backend futuros. */
export const catalogPackages: readonly CatalogPackage[] = [
  ...facialPackages,
  ...corporalPackages,
];

export function getCatalogPackageById(id: string): CatalogPackage | undefined {
  return catalogPackages.find((item) => item.id === id);
}
export function filterCatalogPackages(filters: {
  businessUnit?: BusinessUnit;
  category?: CatalogCategory;
} = {}): CatalogPackage[] {
  return catalogPackages.filter(
    (item) =>
      (!filters.businessUnit || item.businessUnit === filters.businessUnit) &&
      (!filters.category || item.category === filters.category)
  );
}

/** Paquetes autorizados para mostrarse en Equilibria Beauty. */
export const publishedBeautyPackages: CatalogPackage[] = catalogPackages.filter(item => item.businessUnit === "beauty" && item.publicationStatus === "published");
