export type TreatmentCategory = "facial" | "corporal";

export type Treatment = {
  id: string;
  category: TreatmentCategory;
  tag: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

/** Catálogo ilustrativo, pendiente de sustituir por servicios oficiales. */
export const treatments: Treatment[] = [
  {
    id: "limpieza-facial",
    category: "facial",
    tag: "Facial",
    number: "01 / Limpieza",
    title: "Limpieza facial premium",
    description: "Una propuesta de limpieza y cuidado para mejorar la apariencia y luminosidad de la piel.",
    image: "/images/facial-cleanse.jpg",
    imageAlt: "Aplicación profesional de mascarilla durante un cuidado facial",
  },
  {
    id: "cuidado-facial",
    category: "facial",
    tag: "Facial",
    number: "02 / El rostro",
    title: "Cuidado facial avanzado",
    description: "Atención enfocada en necesidades específicas de la piel y su aspecto general.",
    image: "/images/facial-care.jpg",
    imageAlt: "Detalle de rostro con líneas ilustrativas de un protocolo facial",
  },
  {
    id: "estetica-corporal",
    category: "corporal",
    tag: "Corporal",
    number: "03 / El cuerpo",
    title: "Estética corporal",
    description: "Protocolos de cuidado estético adaptados a tus objetivos y características.",
    image: "/images/body-aesthetics.jpg",
    imageAlt: "Fotografía editorial de estética corporal",
  },
  {
    id: "cita-facial",
    category: "facial",
    tag: "Facial",
    number: "04 / La piel",
    title: "Cita de orientación facial",
    description: "Un primer encuentro para conocer tu piel y orientarte sobre las opciones de cuidado disponibles.",
    image: "/images/skin-assessment.jpg",
    imageAlt: "Retrato de mujer mostrando una piel de aspecto saludable",
  },
];
