import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Film } from "./types";

interface WishlistContextType {
  items: Film[];
  addToWishlist: (film: Film) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Film[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (error) {
        console.warn("Failed to parse wishlist from localStorage:", error);
        // Reset to empty array if parsing fails
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);

  function addToWishlist(film: Film) {
    setItems((prev) =>
      prev.find((f) => f.id === film.id) ? prev : [...prev, film]
    );
  }

  const contextValue: WishlistContextType = { items, addToWishlist };
  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be inside provider");
  return ctx;
}
