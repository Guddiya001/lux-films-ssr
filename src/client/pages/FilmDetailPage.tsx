import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilmById } from "../../shared/api";
import {type Film } from "../../shared/types";

export default function FilmDetailPage() {
  const { id } = useParams();
  const [film, setFilm] = useState<Film | null>(null);

  useEffect(() => {
    if (id) getFilmById(id).then(setFilm);
  }, [id]);

  if (!film) return <p>Loading...</p>;

  return (
    <>
      <h1>{film.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} />
      <p>{film.overview}</p>
    </>
  );
}
