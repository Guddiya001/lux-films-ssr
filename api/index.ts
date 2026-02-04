import { type Film, type FilmResponse } from "../src/shared/types";
//import { render } from "../src/Server/render";
import { IncomingMessage, ServerResponse } from "http";

const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = process.env.TMDB_API_KEY || process.env.VITE_TMDB_API_KEY;

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

// export default async function handler(req: IncomingMessage, res: ServerResponse) {
//   // Set CORS headers
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   if (req.method === 'OPTIONS') {
//     res.writeHead(200);
//     res.end();
//     return;
//   }

//   try {
//     const url = req.url || '/';
//     const html = await render(url);
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(html);
//   } catch (error) {
//     console.error('SSR Error:', error);
//     res.writeHead(500, { 'Content-Type': 'text/plain' });
//     res.end('Internal Server Error');
//   }
// }
