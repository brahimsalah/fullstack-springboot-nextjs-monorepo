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
    <main style={{ padding: 24 }}>
      <h1>Spring Boot + Next.js</h1>
      <p>
        API health: <strong>{String(health.ok)}</strong>
      </p>
      <p>
        Env <code>NEXT_PUBLIC_API_URL</code>:{" "}
        {process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"}
      </p>
      <p style={{ marginTop: 16 }}>
        <a href="/todos" style={{ textDecoration: "underline" }}>
          ➡️ Aller à la liste des todos
        </a>
      </p>

      <div className="p-4 rounded-lg border border-orange/40 bg-sand/20 text-ink">
  Bloc palette OK
</div>
<button className="mt-3 px-4 py-2 rounded-lg bg-teal hover:bg-teal/90 text-white">
  Bouton teal
</button>
    </main>
  );
}