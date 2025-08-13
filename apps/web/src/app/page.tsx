async function getHealth() {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
  try {
    const res = await fetch(`${base}/api/health`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as { ok: boolean };
  } catch (e) {
    return { ok: false };
  }
}

export default async function Home() {
  const health = await getHealth();
  return (
    <main style={{ padding: 24 }} className="min-h-[100svh] grid place-items-center bg-teal p-6">
      <div className="bg-transparent text-white p-4 rounded-none shadow-none ring-0 outline-none">
        <h1>Spring Boot banckend with Next.js frontend</h1>
        <p> API health: <strong>{String(health.ok)}</strong> </p>
        <p>
          Env <code>NEXT_PUBLIC_API_URL</code>:{" "}
          {process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"}
        </p>
        <p style={{ marginTop: 16 }}>
          <a href="/todos" style={{ textDecoration: "underline" }}>
            ➡️ Aller à la liste des TODOs
          </a>
        </p>
      </div>
    </main>
  );
}