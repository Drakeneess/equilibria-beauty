import type { CatalogPackage } from "./types";

/** Paquetes faciales del catálogo, disponibles en la web; precios sujetos a confirmación. */
export const facialPackages = [
  {
    "id": "beauty-facial-limpieza-equilibria",
    "name": "Limpieza Equilibria",
    "price": {
      "amount": 80,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "not_specified",
      "total": null,
      "description": "Número de sesiones no especificado"
    },
    "includedProcedures": [
      "Limpieza facial profunda",
      "Vaporización para abrir poros y limpiar impurezas",
      "Exfoliación",
      "Sellador de vapor frío",
      "Mascarilla hidratante",
      "Agua de rosas + crema hidratante"
    ],
    "purposeFromCatalog": null,
    "source": {
      "page": 3,
      "document": "catalogo-paquetes-faciales"
    },
    "businessUnit": "beauty",
    "category": "facial",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-facial-ritual-de-loto",
    "name": "Ritual de Loto",
    "price": {
      "amount": 90,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "not_specified",
      "total": null,
      "description": "Número de sesiones no especificado"
    },
    "includedProcedures": [
      "Limpieza facial profunda",
      "Vaporización para abrir poros y limpiar impurezas",
      "Exfoliación con Áloe vera",
      "Gua sha facial",
      "Sellador de vapor frío",
      "Mascarilla Revitalizante",
      "Agua de rosas + crema hidratante"
    ],
    "purposeFromCatalog": "Relaja, hidrata, deja un efecto calmante profundo. Inspirado en lo espiritual y natural.",
    "source": {
      "page": 3,
      "document": "catalogo-paquetes-faciales"
    },
    "businessUnit": "beauty",
    "category": "facial",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-facial-hielo-de-luna",
    "name": "Hielo de Luna",
    "price": {
      "amount": 100,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "not_specified",
      "total": null,
      "description": "Número de sesiones no especificado"
    },
    "includedProcedures": [
      "Limpieza facial profunda",
      "Exfoliación",
      "Sellador de vapor frío",
      "Crioterapia facial",
      "Mascarilla antiinflamatoria",
      "Gua sha facial"
    ],
    "purposeFromCatalog": "Desinflama, tonifica y mejora la circulación. Perfecto para piel cansada que denota ojeras.",
    "source": {
      "page": 4,
      "document": "catalogo-paquetes-faciales"
    },
    "businessUnit": "beauty",
    "category": "facial",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-facial-nube-de-vainilla",
    "name": "Nube de Vainilla",
    "price": {
      "amount": 90,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "not_specified",
      "total": null,
      "description": "Número de sesiones no especificado"
    },
    "includedProcedures": [
      "Limpieza facial profunda",
      "Vaporización para abrir poros y limpiar impurezas",
      "Exfoliación con Avena y vainilla",
      "Gua sha facial",
      "Mascarilla hidratante",
      "Agua de rosas + crema hidratante"
    ],
    "purposeFromCatalog": "Hidrata, calma y deja la piel suave como una nube. Ideal para pieles secas y sensibles.",
    "source": {
      "page": 4,
      "document": "catalogo-paquetes-faciales"
    },
    "businessUnit": "beauty",
    "category": "facial",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-facial-luz-de-arroz",
    "name": "Luz de Arroz",
    "price": {
      "amount": 80,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "not_specified",
      "total": null,
      "description": "Número de sesiones no especificado"
    },
    "includedProcedures": [
      "Limpieza facial profunda",
      "Vaporización",
      "Gua sha facial",
      "Exfoliante de arroz",
      "Mascarilla de arroz",
      "Agua de rosas + crema hidratante"
    ],
    "purposeFromCatalog": "Calma, suaviza y aporta claridad a la piel. Ritual minimalista con alma japonesa.",
    "source": {
      "page": 5,
      "document": "catalogo-paquetes-faciales"
    },
    "businessUnit": "beauty",
    "category": "facial",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-facial-luz-de-latte",
    "name": "Luz de Latte",
    "price": {
      "amount": 90,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "not_specified",
      "total": null,
      "description": "Número de sesiones no especificado"
    },
    "includedProcedures": [
      "Limpieza facial profunda",
      "Vaporización",
      "Exfoliación con café",
      "Gua sha facial",
      "Sellador de vapor frío",
      "Mascarilla Revitalizante",
      "Agua de rosas + crema hidratante"
    ],
    "purposeFromCatalog": "Estimula, despierta y desintoxica la piel. Ideal para cutis opaco o con textura.",
    "source": {
      "page": 5,
      "document": "catalogo-paquetes-faciales"
    },
    "businessUnit": "beauty",
    "category": "facial",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-facial-detox-plus",
    "name": "Facial Detox Plus",
    "price": {
      "amount": 180,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "not_specified",
      "total": null,
      "description": "Número de sesiones no especificado"
    },
    "includedProcedures": [
      "Limpieza facial profunda",
      "Exfoliación",
      "Microdeermoabración con Punta de diamante",
      "Mascarilla de arcilla según tipo de piel",
      "Ultrasonido facial"
    ],
    "purposeFromCatalog": "Eliminar impurezas, reducir puntos negros y equilibrar cutis graso o mixto.",
    "internalNotes": [
      "La palabra «Microdeermoabración» se mantiene tal como aparece en el PDF; corregir la ortografía antes de publicar."
    ],
    "source": {
      "page": 6,
      "document": "catalogo-paquetes-faciales"
    },
    "businessUnit": "beauty",
    "category": "facial",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-facial-reafirmante-nocturno",
    "name": "Reafirmante Nocturno",
    "price": {
      "amount": 350,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "fixed",
      "total": 3,
      "description": "3 sesiones indicadas en el catálogo"
    },
    "includedProcedures": [
      "Limpieza facial profunda",
      "Vaporización",
      "Exfoliación",
      "Radiofrecuencia facial",
      "Mascarilla de colágeno, vitamina C o ácido hialurónico",
      "Masaje tensor",
      "Ultrasonido facial"
    ],
    "purposeFromCatalog": "efecto Antiage, para piel madura o después de estrés prolongado.",
    "source": {
      "page": 6,
      "document": "catalogo-paquetes-faciales"
    },
    "businessUnit": "beauty",
    "category": "facial",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-facial-frost-glow",
    "name": "Frost Glow",
    "price": {
      "amount": 180,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "not_specified",
      "total": null,
      "description": "Número de sesiones no especificado"
    },
    "includedProcedures": [
      "Limpieza facial profunda",
      "Crioterapia facial",
      "Microdermoabracion con punta de diamante",
      "Mascarilla descongestiva",
      "Ultrasonido facial"
    ],
    "purposeFromCatalog": "Perfecto para pieles inflamadas o expuestas al calor. Cierra poros y calma el cutis.",
    "source": {
      "page": 7,
      "document": "catalogo-paquetes-faciales"
    },
    "businessUnit": "beauty",
    "category": "facial",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-facial-teen-skin-care",
    "name": "Teen Skin Care",
    "price": {
      "amount": 120,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "not_specified",
      "total": null,
      "description": "Número de sesiones no especificado"
    },
    "includedProcedures": [
      "Limpieza facial profunda",
      "Vaporización",
      "Exfoliación",
      "Mascarilla purificante",
      "Agua de rosas + crema hidratante",
      "Ultrasonido facial enfocando en acné"
    ],
    "purposeFromCatalog": "Cuidado para adolescentes. Control de acné, limpieza y prevención.",
    "source": {
      "page": 7,
      "document": "catalogo-paquetes-faciales"
    },
    "businessUnit": "beauty",
    "category": "facial",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-facial-glow-basico",
    "name": "Glow Básico",
    "price": {
      "amount": 150,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "not_specified",
      "total": null,
      "description": "Número de sesiones no especificado"
    },
    "includedProcedures": [
      "Limpieza facial profunda",
      "Extracción de impurezas",
      "Mascarilla hidratante",
      "Microdermoabración con punta de diamante",
      "Ultrasonido facial en fotoenvejecimiento"
    ],
    "purposeFromCatalog": "Eliminar impurezas, mejorar textura y devolver frescura al cutis.",
    "source": {
      "page": 8,
      "document": "catalogo-paquetes-faciales"
    },
    "businessUnit": "beauty",
    "category": "facial",
    "publicationStatus": "published"
  },
  {
    "id": "beauty-facial-glow-premium",
    "name": "Glow Premium",
    "price": {
      "amount": 180,
      "currency": "BOB"
    },
    "sessions": {
      "mode": "fixed",
      "total": 2,
      "description": "2 sesiones indicadas en el catálogo"
    },
    "includedProcedures": [
      "Limpieza facial profunda",
      "Vaporización",
      "Exfoliación",
      "Radiofrecuencia facial",
      "Mascarilla personalizada",
      "Microdermoabracion con punta de diamante",
      "Ultrasonido facial con rejuvenecimiento y fotoenvejecimiento"
    ],
    "purposeFromCatalog": "efecto Antiage, ayudar a la firmeza, hidratar y dar efecto lifting.",
    "internalNotes": [
      "El PDF indica Bs 180 e «Incluye: (2 sesiones)»: confirmar que el precio corresponde al paquete completo."
    ],
    "source": {
      "page": 8,
      "document": "catalogo-paquetes-faciales"
    },
    "businessUnit": "beauty",
    "category": "facial",
    "publicationStatus": "published"
  }
] as const satisfies readonly CatalogPackage[];
