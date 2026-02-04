import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FilmDetailPage from "./pages/FilmDetailPage";
import WishlistPage from "./pages/WishlistPage";
import Layout from "./components/Layout";

export function createRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "film/:id", element: <FilmDetailPage /> },
        { path: "wishlist", element: <WishlistPage /> }
      ]
    }
  ]);
}
