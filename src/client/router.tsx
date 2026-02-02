import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FilmDetailPage from "./pages/FilmDetailPage";
import WishlistPage from "./pages/WishlistPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/film/:id", element: <FilmDetailPage /> },
  { path: "/wishlist", element: <WishlistPage /> }
]);
