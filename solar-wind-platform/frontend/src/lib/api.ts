import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const api = axios.create({
  baseURL: API_URL,
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("swdi_token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("swdi_token");
  }
}

export function loadStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("swdi_token");
  if (token) setAuthToken(token);
  return token;
}

export type UserRole =
  | "renewable_energy_planner"
  | "gis_analyst"
  | "project_manager"
  | "administrator";

export interface CurrentUser {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  organization: string | null;
  is_active: boolean;
}

export async function login(email: string, password: string) {
  const form = new URLSearchParams();
  form.set("username", email);
  form.set("password", password);
  const { data } = await api.post("/auth/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  setAuthToken(data.access_token);
  return data;
}

export async function register(payload: {
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
  organization?: string;
}) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function fetchCurrentUser(): Promise<CurrentUser> {
  const { data } = await api.get("/auth/me");
  return data;
}
