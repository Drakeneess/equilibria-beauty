/** Catálogos internos de Equilibria. Sin publicación ni backend. */
export type BusinessUnit = "beauty" | "wellness";
export type CatalogCategory = "facial" | "corporal";
export type CatalogCurrency = "BOB";
export type CatalogPublicationStatus = "internal_draft" | "ready_for_publication" | "published";
export type SessionMode = "not_specified" | "fixed" | "per_procedure";

export type SessionBreakdown = {
  procedure: string;
  quantity: number;
  /** «unidad_no_especificada» conserva la ambigüedad del catálogo. */
  unit: "sesión" | "unidad_no_especificada";
};

export type CatalogPackage = {
  /** ID permanente, apto para migrar a la futura base de datos. */
  id: string;
  name: string;
  businessUnit: BusinessUnit;
  category: CatalogCategory;
  /** Precio publicado en el PDF; pendiente de confirmar su vigencia. */
  price: { amount: number; currency: CatalogCurrency };
  sessions: { mode: SessionMode; total: number | null; description: string };
  includedProcedures: readonly string[];
  /** Texto original del PDF. No usar automáticamente como promesa publicitaria. */
  purposeFromCatalog: string | null;
  bonus?: readonly string[];
  sessionBreakdown?: readonly SessionBreakdown[];
  internalNotes?: readonly string[];
  source: {
    document: "catalogo-paquetes-faciales" | "catalogo-paquetes-corporales";
    /** Número de página del PDF (1-indexed). */
    page: number;
  };
  publicationStatus: CatalogPublicationStatus;
};
