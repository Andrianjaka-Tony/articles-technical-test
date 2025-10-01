import { ApiResponse } from "@/src/types/api-response.type";

export async function api<T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const defaultHeaders = { "Content-Type": "application/json" };
  const finalOptions = {
    ...options,
    headers: { ...defaultHeaders, ...(options.headers || {}) },
  };

  let result: ApiResponse<T>;

  try {
    const response = await fetch(url, finalOptions);
    result = (await response.json()) as ApiResponse<T>;

    if (!response.ok) {
      throw new Error(`[${response.status}] ${result.message || "Erreur API"}`);
    }
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Impossible de récupérer la réponse");
  }

  return result;
}
