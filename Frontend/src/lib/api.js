import { API_BASE_URL } from "./config";

function authHeaders(token) {
  return token ? { Authorization: `Token ${token}` } : {};
}

function formatError(data) {
  if (data?.error) return data.error;
  if (!data?.errors) return "Something went wrong.";
  return Object.entries(data.errors)
    .map(([field, value]) => `${field}: ${Array.isArray(value) ? value.join(" ") : value}`)
    .join(" ");
}

export async function apiRequest(path, options = {}, token = "") {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(token),
      ...options.headers,
    },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(formatError(data));
  return data;
}
