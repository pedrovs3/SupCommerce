import { createBrowserRouter, defer } from "react-router-dom";
import { supabase } from "./data/supabase";
import { Home } from "./pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      const products = supabase
        .from("products")
        .select("*")
        .then(({ data }) => data);

      return defer({
        products,
      });
    },
    element: <Home />,
  },
]);
