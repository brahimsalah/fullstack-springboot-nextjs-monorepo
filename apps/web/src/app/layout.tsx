import "./globals.css";
import RootWithSplash from "./components/RootWithSplash";

export const metadata = {
  title: "Fullstack Monorepo",
  description: "Spring Boot + Next.js starter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="m-0 font-sans">{children}</body>
    </html>
  );
}

/*
Vérifie aussi que RootWithSplash.tsx contient bien le code suivant en haut :
"use client";

Et que tu ne l'as pas défini comme Server Component.
Sans "use client", les hooks useState / useEffect ne s'exécutent pas côté client et
le splash ne s'affichera jamais.
*/
