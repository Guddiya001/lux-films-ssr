import { Link } from "react-router-dom";
import { type Film } from "../../shared/types";

interface Props {
  film: Film;
  category?: string;
}

export default function FilmCard({ film, category }: Props) {
  return (
    <Link
      to={`/film/${film.id}?category=${category}`}
      className="film-card"
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
        alt={film.title}
      />
      <p>{film.title}</p>
    </Link>
  );
}
