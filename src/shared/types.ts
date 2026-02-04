export interface Film {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string | null;
  vote_average?: number | null;
  popularity?: number | null;
  status?: "wishlist" | "watched";
  spoken_languages?: { name: string }[];
  revenue?: number;
}

export interface FilmResponse {
  results: Film[];
}