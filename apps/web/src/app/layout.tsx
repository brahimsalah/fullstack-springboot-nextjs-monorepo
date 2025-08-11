import './globals.css'

export const metadata = {
  title: "Fullstack Monorepo",
  description: "Spring Boot + Next.js starter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="m-0 font-sans">{children}</body>
    </html>
  );
}