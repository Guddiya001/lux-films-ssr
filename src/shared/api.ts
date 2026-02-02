import { type Film, type FilmResponse,  } from "./types";

const BASE_URL = "https://www.omdbapi.com/";

const API_KEY =
  // Vite exposes client env vars on `import.meta.env` (prefix VITE_...)
  // fall back to process.env for server-side usage
  (typeof import.meta !== "undefined" ? (import.meta as any).env?.VITE_TMDB_API_KEY : undefined) ||
  process.env.TMDB_API_KEY;

async function request<T>(endpoint: string): Promise<T> {
  if (!API_KEY) throw new Error("TMDB API key is not set. Define VITE_TMDB_API_KEY or TMDB_API_KEY.");
  const sep = endpoint.includes("?") ? "&" : "?";
  const res = await fetch(`${BASE_URL}${endpoint}${sep}api_key=${API_KEY}`);
  if (!res.ok) throw new Error("TMDB request failed");
  return res.json();
}

export function getPopularFilms(): Promise<Film[]> {
  return request<FilmResponse>("/movie/popular?language=en-US").then(
    r => r.results
  );
}

export function getTopRatedFilms(): Promise<Film[]> {
  return request<FilmResponse>("/movie/top_rated?language=en-US").then(
    r => r.results
  );
}

export function getUpcomingFilms(): Promise<Film[]> {
  return request<FilmResponse>("/movie/upcoming?language=en-US").then(
    r => r.results
  );
}

export function getFilmById(id: string): Promise<Film> {
  return request<Film>(`/movie/${id}?language=en-US`);
}
