import { useWishlist } from "../../shared/store";
import FilmCard from "../components/FilmCard";

export default function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return <p>Your wishlist is empty.</p>;
  }

  return (
    <div className="wishlist">
      <h1>Wishlist</h1>

      <div className="wishlist-container"
      style={{ display: "flex", flexWrap: "wrap" }}>
        {items.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </div>
  );
}
