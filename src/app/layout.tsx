import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./premium-motion.css";

export const metadata: Metadata = {
  title: "Equilibria Beauty — Belleza en equilibrio",
  description: "Equilibria Beauty: estética facial y corporal, cuidado de la piel y atención personalizada.",
  robots: { index: false, follow: false }, // Proyecto demo. Activar indexación al publicar.
};

export const viewport: Viewport = { themeColor: "#382318" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
