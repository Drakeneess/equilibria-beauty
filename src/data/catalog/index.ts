import type { BusinessUnit, CatalogCategory, CatalogPackage } from "./types";
import { facialPackages } from "./facials";
import { corporalPackages } from "./corporals";

export type { BusinessUnit, CatalogCategory, CatalogPackage } from "./types";
export { facialPackages, corporalPackages };

/** Fuente estática. Todavía no consumida por la interfaz, API o base de datos. */
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
