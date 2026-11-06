import type { CatalogPackage } from "./types";

/** Paquetes corporales del catálogo, disponibles en la web; precios sujetos a confirmación. */
export const corporalPackages = [
  {
    "id": "beauty-corporal-reduccion-express",
    "name": "Reducción Express",
    "price": {
      "amount": 500,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "fixed",
      "total": 9,
      "description": "9 sesiones indicadas en el catálogo"
    },
    "includedProcedures": [
      "Lipoláser",
      "Maderoterapia",
      "Masaje moldeador",
      "Corrientes rusas",
      "Detoxificación iónica"
    ],
    "purposeFromCatalog": "Ideal para clientes con poco tiempo que buscan resultados visibles.",
    "source": {
      "page": 3,
      "document": "catalogo-paquetes-corporales"
    },
    "businessUnit": "beauty",
    "category": "corporal",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-corporal-ice-sculpt",
    "name": "Ice Sculpt",
    "price": {
      "amount": 400,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "fixed",
      "total": 6,
      "description": "6 sesiones indicadas en el catálogo"
    },
    "includedProcedures": [
      "Vendas frías",
      "Crioterapia combinada",
      "Crío + Vacuum → para movilizar grasa y romper adipositos antes del frío",
      "Masaje drenante",
      "Maderoterapia",
      "Detoxificante"
    ],
    "purposeFromCatalog": "Ideal para reducir inflamación y mejorar apariencia de celulitis.",
    "source": {
      "page": 3,
      "document": "catalogo-paquetes-corporales"
    },
    "businessUnit": "beauty",
    "category": "corporal",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-corporal-bella-figura",
    "name": "Bella Figura",
    "price": {
      "amount": 650,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "fixed",
      "total": 10,
      "description": "10 sesiones indicadas en el catálogo"
    },
    "includedProcedures": [
      "Cavitación",
      "Masaje moldeador",
      "Maderoterapia",
      "Crioterapia combinada (Crio + Radiofrecuencia para reafirmar después del enfriamiento.",
      "Detoxificación iónica"
    ],
    "purposeFromCatalog": "Ideal para empezar a moldear, reducir medidas y desinflamar.",
    "internalNotes": [
      "El texto del PDF no cierra el paréntesis en la descripción de crioterapia combinada."
    ],
    "source": {
      "page": 4,
      "document": "catalogo-paquetes-corporales"
    },
    "businessUnit": "beauty",
    "category": "corporal",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-corporal-silueta-de-diosa",
    "name": "Silueta de Diosa",
    "price": {
      "amount": 850,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "fixed",
      "total": 10,
      "description": "10 sesiones indicadas en el catálogo"
    },
    "includedProcedures": [
      "Masaje moldeador",
      "Radiofrecuencia",
      "Corrientes rusas",
      "Maderoterapia",
      "Vendas frías",
      "Tecarterapia"
    ],
    "purposeFromCatalog": "Ideal para tonificar, reafirmar y combatir flacidez.",
    "bonus": [
      "1 limpieza facial de regalo"
    ],
    "source": {
      "page": 4,
      "document": "catalogo-paquetes-corporales"
    },
    "businessUnit": "beauty",
    "category": "corporal",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-corporal-gluteo-power-up",
    "name": "Glúteo Power Up",
    "price": {
      "amount": 550,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "fixed",
      "total": 7,
      "description": "7 sesiones indicadas en el catálogo"
    },
    "includedProcedures": [
      "Vacuum",
      "Corriente rusa",
      "Masaje lifting glúteo",
      "Maderoterapia",
      "Detoxificante iónico"
    ],
    "purposeFromCatalog": "Levantamiento, tonificación y volumen natural de glúteos.",
    "source": {
      "page": 5,
      "document": "catalogo-paquetes-corporales"
    },
    "businessUnit": "beauty",
    "category": "corporal",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-corporal-modelo-natural",
    "name": "Modelo Natural",
    "price": {
      "amount": 600,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "fixed",
      "total": 7,
      "description": "7 sesiones indicadas en el catálogo"
    },
    "includedProcedures": [
      "Maderoterapia",
      "Crioterapia combinada",
      "Masaje drenante",
      "Masaje modelador",
      "Detoxificante iónico"
    ],
    "purposeFromCatalog": "Estimulación linfática, antiinflamatoria, desintoxicación y tonificación.",
    "source": {
      "page": 5,
      "document": "catalogo-paquetes-corporales"
    },
    "businessUnit": "beauty",
    "category": "corporal",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-corporal-curvas-delicadas",
    "name": "Curvas Delicadas",
    "price": {
      "amount": 350,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "fixed",
      "total": 6,
      "description": "6 sesiones indicadas en el catálogo"
    },
    "includedProcedures": [
      "Vacuum",
      "Radiofrecuencia",
      "Masaje moldeador",
      "Maderoterapia"
    ],
    "purposeFromCatalog": "Realzar glúteos, mejorar circulación y tonificar. Ideal para clientas jóvenes o que recién empiezan.",
    "source": {
      "page": 6,
      "document": "catalogo-paquetes-corporales"
    },
    "businessUnit": "beauty",
    "category": "corporal",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-corporal-impacto-reductor",
    "name": "Impacto Reductor",
    "price": {
      "amount": 700,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "fixed",
      "total": 8,
      "description": "8 sesiones indicadas en el catálogo"
    },
    "includedProcedures": [
      "Vacuum",
      "Lipoláser",
      "Maderoterapia",
      "Cavitación",
      "Detoxificante"
    ],
    "purposeFromCatalog": "Romper grasa localizada, moldear cintura y piernas, activar metabolismo.",
    "source": {
      "page": 6,
      "document": "catalogo-paquetes-corporales"
    },
    "businessUnit": "beauty",
    "category": "corporal",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-corporal-esbelta-premium",
    "name": "Esbelta Premium",
    "price": {
      "amount": 1200,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "per_procedure",
      "total": null,
      "description": "Distribución por procedimiento, sin total de citas indicado"
    },
    "includedProcedures": [
      "Corrientes rusas",
      "Lipoláser",
      "Masaje moldeador",
      "Vendas frías",
      "Lipólisis transcutánea",
      "Tecarterapia",
      "Detoxificante iónico"
    ],
    "purposeFromCatalog": "Moldear cintura, activar drenaje linfático, reafirmar.",
    "sessionBreakdown": [
      {
        "procedure": "Corrientes rusas",
        "quantity": 2,
        "unit": "sesión"
      },
      {
        "procedure": "Lipoláser",
        "quantity": 2,
        "unit": "sesión"
      },
      {
        "procedure": "Masaje moldeador",
        "quantity": 4,
        "unit": "sesión"
      },
      {
        "procedure": "Vendas frías",
        "quantity": 2,
        "unit": "sesión"
      },
      {
        "procedure": "Lipólisis transcutánea",
        "quantity": 1,
        "unit": "sesión"
      },
      {
        "procedure": "Tecarterapia",
        "quantity": 2,
        "unit": "sesión"
      },
      {
        "procedure": "Detoxificante iónico",
        "quantity": 1,
        "unit": "unidad_no_especificada"
      }
    ],
    "source": {
      "page": 7,
      "document": "catalogo-paquetes-corporales"
    },
    "businessUnit": "beauty",
    "category": "corporal",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-corporal-reina-total",
    "name": "Reina Total",
    "price": {
      "amount": 1600,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "per_procedure",
      "total": null,
      "description": "Distribución por procedimiento, sin total de citas indicado"
    },
    "includedProcedures": [
      "Corrientes rusas",
      "Ultracavitación",
      "Maderoterapia",
      "Lipoláser",
      "Radiofrecuencia",
      "Masaje moldeador",
      "Vendas frías",
      "Lipólisis transcutánea",
      "Tecarterapia",
      "Detoxificante iónico"
    ],
    "purposeFromCatalog": "Transformación total, incluye tratamientos reductores, reafirmantes y tonificantes.",
    "sessionBreakdown": [
      {
        "procedure": "Corrientes rusas",
        "quantity": 2,
        "unit": "sesión"
      },
      {
        "procedure": "Ultracavitación",
        "quantity": 2,
        "unit": "sesión"
      },
      {
        "procedure": "Maderoterapia",
        "quantity": 6,
        "unit": "sesión"
      },
      {
        "procedure": "Lipoláser",
        "quantity": 3,
        "unit": "sesión"
      },
      {
        "procedure": "Radiofrecuencia",
        "quantity": 2,
        "unit": "sesión"
      },
      {
        "procedure": "Masaje moldeador",
        "quantity": 4,
        "unit": "sesión"
      },
      {
        "procedure": "Vendas frías",
        "quantity": 2,
        "unit": "sesión"
      },
      {
        "procedure": "Lipólisis transcutánea",
        "quantity": 1,
        "unit": "sesión"
      },
      {
        "procedure": "Tecarterapia",
        "quantity": 2,
        "unit": "sesión"
      },
      {
        "procedure": "Detoxificante iónico",
        "quantity": 1,
        "unit": "unidad_no_especificada"
      }
    ],
    "source": {
      "page": 8,
      "document": "catalogo-paquetes-corporales"
    },
    "businessUnit": "beauty",
    "category": "corporal",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-corporal-silueta-pro",
    "name": "Silueta Pro",
    "price": {
      "amount": 1000,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "per_procedure",
      "total": null,
      "description": "Distribución por procedimiento, sin total de citas indicado"
    },
    "includedProcedures": [
      "Lipólisis transcutánea",
      "Ultracavitación",
      "Vacuum",
      "Radiofrecuencia",
      "Masaje moldeador",
      "Maderoterapia"
    ],
    "purposeFromCatalog": "Remodelación profunda. Perfecto para zonas difíciles como el abdomen bajo, muslos y espalda baja.",
    "sessionBreakdown": [
      {
        "procedure": "Lipólisis transcutánea",
        "quantity": 2,
        "unit": "sesión"
      },
      {
        "procedure": "Ultracavitación",
        "quantity": 3,
        "unit": "sesión"
      },
      {
        "procedure": "Vacuum",
        "quantity": 2,
        "unit": "sesión"
      },
      {
        "procedure": "Radiofrecuencia",
        "quantity": 3,
        "unit": "sesión"
      },
      {
        "procedure": "Masaje moldeador",
        "quantity": 2,
        "unit": "sesión"
      },
      {
        "procedure": "Maderoterapia",
        "quantity": 4,
        "unit": "sesión"
      }
    ],
    "source": {
      "page": 9,
      "document": "catalogo-paquetes-corporales"
    },
    "businessUnit": "beauty",
    "category": "corporal",
    "publicationStatus": "published"
  }
] as const satisfies readonly CatalogPackage[];
