import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getFilmById } from "../../../api"; 
import { Film } from "../../shared/types";
import { useWishlist } from "../../shared/store";

export default function FilmDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "default";

  const [film, setFilm] = useState<Film | null>(null);
  const [showToast, setShowToast] = useState(false);
  
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    if (id) getFilmById(Number(id)).then(setFilm);
  }, [id]);

  const handleAdd = () => {
    if (!film) return;

    addToWishlist(film);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);

  }

  if (!film) return <p>Loading...</p>;

  console.log("Rendering FilmDetailPage for film:", film);

  return (
    <div className={`detail-page theme-${category}`}>

      {showToast && (
        <div className="toast">
          Added to wishlist ✅
        </div>
       )}
      <div className="detail-top">
        <div className="detail-image">
          <img
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            alt={film.title}
          />
        </div>

        <div className="detail-info">
          <h1>{film.title}</h1>
          <p>{film.overview}</p>

          <button onClick={handleAdd}>
            Add to Wishlist
          </button>
        </div>
      </div>

      <div className="detail-extra">
        <h3>Additional Information</h3>
        <p>Release Date: {film?.release_date}</p>
        <p>Rating: {film?.vote_average}</p>
        <p>Popularity: {film?.popularity}</p>
        <p>Status: {film?.status}</p>
        <p>Languages: {film?.spoken_languages?.map(l => l.name).join(', ')}</p>
        <p>Revenue: ${film?.revenue?.toLocaleString()}</p>
      </div>

    </div>
  );
}
