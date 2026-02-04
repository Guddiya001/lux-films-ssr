import { render } from "../dist/server/render.js";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY =
  process.env.TMDB_API_KEY ||
  process.env.VITE_TMDB_API_KEY;

/* ----------------------------- */
/* TMDB Request Helper           */
/* ----------------------------- */
async function request(endpoint: string) {
  if (!API_KEY) {
    throw new Error("TMDB API key is not defined");
  }

  const separator = endpoint.includes("?") ? "&" : "?";
  const response = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(
      `TMDB request failed: ${response.status}`
    );
  }

  return response.json();
}

/* ----------------------------- */
/* Data Fetching Helpers         */
/* ----------------------------- */

export async function getPopularFilms() {
  const data = await request("/movie/popular?language=en-US");
  return data.results;
}

export async function getTopRatedFilms() {
  const data = await request("/movie/top_rated?language=en-US");
  return data.results;
}

export async function getUpcomingFilms() {
  const data = await request("/movie/upcoming?language=en-US");
  return data.results;
}

export async function getFilmById(id: number ) {
  return request(`/movie/${id}?language=en-US`);
}

/* ----------------------------- */
/* Vercel Serverless Handler     */
/* ----------------------------- */

export default async function handler(req:any, res:any) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const url = req.url || "/";
    const html = await render(url);

    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(html);
  } catch (error) {
    console.error("SSR Error:", error);
    return res
      .status(500)
      .send("Internal Server Error");
  }
}
