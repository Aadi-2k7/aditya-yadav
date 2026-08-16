"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-terrain-100 rounded-xl p-8 shadow-sm"
      >
        <h1 className="text-2xl font-display font-semibold text-terrain-900 mb-1">
          Sign in
        </h1>
        <p className="text-sm text-terrain-600 mb-6">
          Access your renewable deployment dashboard.
        </p>

        <label className="block text-sm font-medium text-terrain-800 mb-1">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-terrain-100 rounded-md focus:outline-none focus:ring-2 focus:ring-terrain-400"
          placeholder="you@organization.com"
        />

        <label className="block text-sm font-medium text-terrain-800 mb-1">
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-3 py-2 border border-terrain-100 rounded-md focus:outline-none focus:ring-2 focus:ring-terrain-400"
          placeholder="••••••••"
        />

        {error && (
          <p className="text-sm text-unsuitable mb-4" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-md bg-terrain-800 text-terrain-50 font-medium hover:bg-terrain-900 transition-colors disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
