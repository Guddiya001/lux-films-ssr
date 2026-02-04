import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./router";
import { WishlistProvider } from "../shared/store";

export default function App() {
  const router = useMemo(() => createRouter(), []);

  return (
    <WishlistProvider>
      <RouterProvider router={router} />
    </WishlistProvider>
  );
}
