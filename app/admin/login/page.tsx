"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      setError("Identifiants incorrects");
      setLoading(false);
      return;
    }

    router.push(from);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf7f4] px-4">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-8 shadow-lg">
        <p className="text-center font-display text-2xl text-primary">Administration</p>
        <p className="mt-2 text-center text-sm text-muted">
          Sheila & Loïc — console de gestion du site
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="username">
              Identifiant
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary py-3 font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-muted">
          Par défaut : admin / SheilaLoic2027! — changez via{" "}
          <code className="rounded bg-black/5 px-1">.env.local</code>
        </p>
        <a
          href="/"
          className="mt-4 block text-center text-sm text-primary underline"
        >
          ← Retour au site
        </a>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
