"use client";

import { useEffect, useState } from "react";
import RootWithSplash from "./components/RootWithSplash";

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

export default function Home() {
  const [health, setHealth] = useState<{ ok: boolean } | null>(null);

  useEffect(() => {
    getHealth().then(setHealth);
  }, []);

  return (
    <RootWithSplash durationMs={2500} skippable={true}>
      <main style={{ padding: 24 }} className="min-h-[100svh] grid place-items-center bg-teal p-6">
        <div className="bg-transparent text-white p-4 rounded-none shadow-none ring-0 outline-none">
          <h1>Spring Boot banckend with Next.js frontend</h1>
          <p>
            {" "}
            API health: <strong>{health ? String(health.ok) : "checking..."}</strong>{" "}
          </p>
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
    </RootWithSplash>
  );
}

/*
Note:
Le composant Home est un Server Component (async).
Il ne peut pas utiliser de hooks comme useState.
Si tu veux ajouter de l'interactivité, crée un Client Component
et importe-le ici.
*/
