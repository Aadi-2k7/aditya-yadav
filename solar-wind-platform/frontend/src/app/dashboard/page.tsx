"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, loadStoredToken, fetchCurrentUser, CurrentUser, setAuthToken } from "@/lib/api";

interface Project {
  id: string;
  name: string;
  description: string | null;
  region: string | null;
}

const ROLE_LABELS: Record<string, string> = {
  renewable_energy_planner: "Renewable Energy Planner",
  gis_analyst: "GIS Analyst",
  project_manager: "Project Manager",
  administrator: "Administrator",
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = loadStoredToken();
    if (!token) {
      router.push("/login");
      return;
    }
    (async () => {
      try {
        const currentUser = await fetchCurrentUser();
        setUser(currentUser);
        const { data } = await api.get<Project[]>("/projects");
        setProjects(data);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  async function handleCreateProject(e: React.FormEvent) {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    const { data } = await api.post<Project>("/projects", { name: newProjectName });
    setProjects((prev) => [...prev, data]);
    setNewProjectName("");
  }

  function handleLogout() {
    setAuthToken(null);
    router.push("/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-terrain-600">
        Loading dashboard…
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-terrain-100 px-8 py-5 flex items-center justify-between bg-white">
        <div>
          <p className="font-display text-lg text-terrain-900">
            Solar &amp; Wind Deployment Intelligence
          </p>
          {user && (
            <p className="text-xs text-terrain-600 mt-0.5">
              {user.full_name} · {ROLE_LABELS[user.role] ?? user.role}
            </p>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-terrain-600 hover:text-terrain-900"
        >
          Sign out
        </button>
      </header>

      <section className="max-w-5xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-semibold text-terrain-900">
            Your projects
          </h2>
        </div>

        <form onSubmit={handleCreateProject} className="flex gap-2 mb-8">
          <input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="New project name (e.g. Rajasthan Solar Corridor)"
            className="flex-1 px-3 py-2 border border-terrain-100 rounded-md focus:outline-none focus:ring-2 focus:ring-terrain-400"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-sun-600 text-white font-medium hover:bg-sun-400 transition-colors"
          >
            Create project
          </button>
        </form>

        {projects.length === 0 ? (
          <div className="border border-dashed border-terrain-100 rounded-xl p-10 text-center text-terrain-600">
            No projects yet. Create one above to start registering sites.
          </div>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-4">
            {projects.map((project) => (
              <li
                key={project.id}
                className="border border-terrain-100 rounded-xl p-5 bg-white hover:shadow-sm transition-shadow"
              >
                <p className="font-medium text-terrain-900">{project.name}</p>
                {project.region && (
                  <p className="text-sm text-terrain-600 mt-1">{project.region}</p>
                )}
                {project.description && (
                  <p className="text-sm text-terrain-800/70 mt-2">{project.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
