import { createBrowserRouter } from "react-router-dom";
import { getProductsLoader } from "./data/loaders/products";
import { HomeLayout } from "./layouts/home.layout";
import { Home } from "./pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: getProductsLoader,
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);
