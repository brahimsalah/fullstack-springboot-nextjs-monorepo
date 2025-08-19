"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      setErr(null);
      setLoading(true);
      const r = await fetch(`${API_BASE}/api/todos`, { cache: "no-store" });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setTodos(await r.json());
    } catch (e: any) {
      setErr(e?.message ?? "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }

  async function createTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const r = await fetch(`${API_BASE}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setTitle("");
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Erreur à la création");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const done = todos.filter((t) => t.done).length;
  const pending = todos.length - done;

  return (
    <main className="min-h-[100svh] grid place-items-center bg-teal p-6">
      <div className="w-full max-w-xl text-white rounded-lg shadow-none ring-0">
        <h1 className="text-3xl font-semibold mb-2">Ma Todo List</h1>
        <p className="text-white/90 mb-6">
          {loading
            ? "Chargement…"
            : `Aujourd’hui : ${todos.length} tâche(s) • ✅ ${done} • ⏳ ${pending}`}
        </p>

        <form onSubmit={createTodo} className="flex gap-2 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ajouter une tâche…"
            className="flex-1 rounded-md px-3 py-2 text-ink placeholder:text-ink/60 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md px-4 py-2 bg-ink text-white hover:bg-ink/90"
          >
            Ajouter
          </button>
        </form>

        {err && <p className="mb-4 text-sand">{err}</p>}

        {loading ? (
          <p>Chargement…</p>
        ) : todos.length === 0 ? (
          <div className="rounded-md bg-white/10 backdrop-blur p-4">
            Commence par <strong>ajouter</strong> ta première tâche ✨
          </div>
        ) : (
          <ul className="space-y-2">
            {todos.slice(0, 5).map((t) => (
              <li
                key={t.id}
                className="rounded-md bg-white/10 backdrop-blur p-3 flex items-center justify-between"
              >
                <span className={t.done ? "line-through opacity-70" : ""}>
                  {t.title}
                </span>
                <span className={t.done ? "text-sand" : "text-coral"}>
                  {t.done ? "✅" : "⏳"}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <a
            href="/todos"
            className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 hover:bg-ink/90"
          >
            Voir toutes les tâches →
          </a>
        </div>
      </div>
    </main>
  );
}
