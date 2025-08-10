export const metadata = {
  title: "Fullstack Monorepo",
  description: "Spring Boot + Next.js starter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}