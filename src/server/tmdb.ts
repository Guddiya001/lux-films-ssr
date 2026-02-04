import { Film, FilmResponse } from "../shared/types";

const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY =
  process.env.TMDB_API_KEY ||
  process.env.VITE_TMDB_API_KEY;

async function request<T>(endpoint: string): Promise<T> {
  if (!API_KEY) {
    throw new Error(
      "TMDB API key is not set. Define TMDB_API_KEY or VITE_TMDB_API_KEY."
    );
  }

  const sep = endpoint.includes("?") ? "&" : "?";

  const res = await fetch(
    `${BASE_URL}${endpoint}${sep}api_key=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("TMDB request failed");
  }

  return res.json();
}

/* ---------------------------- */
/* Movie Fetchers               */
/* ---------------------------- */

export function getPopularFilms(): Promise<Film[]> {
  return request<FilmResponse>(
    "/movie/popular?language=en-US"
  ).then(r => r.results);
}

export function getTopRatedFilms(): Promise<Film[]> {
  return request<FilmResponse>(
    "/movie/top_rated?language=en-US"
  ).then(r => r.results);
}

export function getUpcomingFilms(): Promise<Film[]> {
  return request<FilmResponse>(
    "/movie/upcoming?language=en-US"
  ).then(r => r.results);
}

export function getFilmById(id: string): Promise<Film> {
  return request<Film>(
    `/movie/${id}?language=en-US`
  );
}
