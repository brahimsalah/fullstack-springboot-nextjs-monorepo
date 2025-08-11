"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function EditTodoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const todoId = searchParams.get("id");
  const [todo, setTodo] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

  useEffect(() => {
    if (!todoId) {
      setError("No todo ID provided");
      setLoading(false);
      return;
    }
    fetch(`${API_BASE}/api/todos/${todoId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch todo");
        return res.json();
      })
      .then((data) => {
        setTodo({ title: data.title, description: data.description });
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      });
  }, [todoId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/todos/${todoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
      if (!res.ok) throw new Error("Failed to update todo");
      router.push("/todos");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px #0001" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Edit Todo</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>Title</label>
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
            style={{ width: "100%", border: "1px solid #ccc", borderRadius: 8, padding: 10 }}
            required
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>Description</label>
          <textarea
            name="description"
            value={todo.description}
            onChange={handleChange}
            style={{ width: "100%", border: "1px solid #ccc", borderRadius: 8, padding: 10, minHeight: 80 }}
          />
        </div>
        <button
          type="submit"
          style={{ background: "#2563eb", color: "#fff", padding: "10px 0", borderRadius: 8, fontWeight: 600, border: 0, cursor: "pointer" }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default function EditTodoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditTodoContent />
    </Suspense>
  );
}
