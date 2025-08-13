"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Todo = {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"; // Docker => http://api:8080 (déjà set via compose)

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function load() {
    try {
      setErr(null);
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/todos`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as Todo[];
      setTodos(data);
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
      const res = await fetch(`${API_BASE}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setTitle("");
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Erreur à la création");
    }
  }

  async function deleteTodo(id: number) {
    try {
      const res = await fetch(`${API_BASE}/api/todos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (e: any) {
      setErr(e?.message ?? "Erreur à la suppression");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sand to-teal py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 flex items-center gap-2">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m9 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Mes Todos
        </h1>
        <form onSubmit={createTodo} className="flex gap-3 mb-8">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ajouter une tâche…"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white shadow-sm outline-none transition"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Ajouter
          </button>
        </form>

        {err && (
          <div className="mb-6 p-3 rounded bg-red-100 text-red-700 border border-red-200 animate-pulse">{err}</div>
        )}

        {loading ? (
          <div className="flex items-center justify-center min-h-[30vh]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center text-gray-500">Aucune tâche pour l’instant.</div>
        ) : (
          <ul className="grid gap-5">
            {todos.map((t) => (
              <li
                key={t.id}
                className="bg-white/90 border border-gray-100 rounded-xl shadow flex items-center justify-between gap-4 px-6 py-5 hover:shadow-lg transition"
              >
                <div>
                  <div className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span>
                    {t.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Créé le {new Date(t.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/todos/edit?id=${t.id}`)}
                    className="px-4 py-2 rounded-lg border border-blue-500 text-blue-600 bg-white hover:bg-blue-50 font-medium transition"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => deleteTodo(t.id)}
                    className="px-4 py-2 rounded-lg border border-red-400 text-red-600 bg-white hover:bg-red-50 font-medium transition"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

