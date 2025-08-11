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
      <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 12 }}>Todos</h1>

        <form onSubmit={createTodo} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ajouter une tâche…"
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #222",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Ajouter
          </button>
        </form>

        {err && (
          <p style={{ color: "crimson", marginBottom: 12 }}>
            {err}
          </p>
        )}

        {loading ? (
          <p>Chargement…</p>
        ) : todos.length === 0 ? (
          <p>Aucune tâche pour l’instant.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
            {todos.map((t) => (
              <li
                key={t.id}
                style={{
                  padding: 12,
                  border: "1px solid #e5e5e5",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{t.title}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    Créé le {new Date(t.createdAt).toLocaleString()}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => router.push(`/todos/edit?id=${t.id}`)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: "1px solid #0070f3",
                      background: "#fff",
                      color: "#0070f3",
                      cursor: "pointer",
                    }}
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => deleteTodo(t.id)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: "1px solid #c00",
                      background: "#fff",
                      color: "#c00",
                      cursor: "pointer",
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    );
}

