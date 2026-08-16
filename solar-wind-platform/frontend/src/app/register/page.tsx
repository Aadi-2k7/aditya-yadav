"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register, login, UserRole } from "@/lib/api";

const ROLE_OPTIONS: { value: UserRole; label: string; blurb: string }[] = [
  {
    value: "renewable_energy_planner",
    label: "Renewable Energy Planner",
    blurb: "Recommend sites, forecast generation, review investment cases",
  },
  {
    value: "gis_analyst",
    label: "GIS Analyst",
    blurb: "Work with terrain, satellite, and geospatial data",
  },
  {
    value: "project_manager",
    label: "Project Manager",
    blurb: "Track progress, feasibility, and deployment timelines",
  },
  {
    value: "administrator",
    label: "Administrator",
    blurb: "Manage users, data sources, and platform settings",
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState<UserRole>("renewable_energy_planner");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({
        full_name: fullName,
        email,
        password,
        role,
        organization: organization || undefined,
      });
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Could not create your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-terrain-100 rounded-xl p-8 shadow-sm"
      >
        <h1 className="text-2xl font-display font-semibold text-terrain-900 mb-1">
          Create your account
        </h1>
        <p className="text-sm text-terrain-600 mb-6">
          Set up access to the deployment intelligence platform.
        </p>

        <label className="block text-sm font-medium text-terrain-800 mb-1">
          Full name
        </label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-terrain-100 rounded-md focus:outline-none focus:ring-2 focus:ring-terrain-400"
          placeholder="Jordan Ellis"
        />

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
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-terrain-100 rounded-md focus:outline-none focus:ring-2 focus:ring-terrain-400"
          placeholder="At least 8 characters"
        />

        <label className="block text-sm font-medium text-terrain-800 mb-1">
          Organization <span className="text-terrain-600 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-terrain-100 rounded-md focus:outline-none focus:ring-2 focus:ring-terrain-400"
          placeholder="Utility, agency, or consultancy name"
        />

        <label className="block text-sm font-medium text-terrain-800 mb-2">
          Role
        </label>
        <div className="grid grid-cols-1 gap-2 mb-6">
          {ROLE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-start gap-3 border rounded-md p-3 cursor-pointer transition-colors ${
                role === opt.value
                  ? "border-terrain-600 bg-terrain-50"
                  : "border-terrain-100 hover:border-terrain-400"
              }`}
            >
              <input
                type="radio"
                name="role"
                value={opt.value}
                checked={role === opt.value}
                onChange={() => setRole(opt.value)}
                className="mt-1"
              />
              <span>
                <span className="block text-sm font-medium text-terrain-900">
                  {opt.label}
                </span>
                <span className="block text-xs text-terrain-600">{opt.blurb}</span>
              </span>
            </label>
          ))}
        </div>

        {error && (
          <p className="text-sm text-unsuitable mb-4" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-md bg-sun-600 text-white font-medium hover:bg-sun-400 transition-colors disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>

        <p className="text-sm text-terrain-600 text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-terrain-800 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}