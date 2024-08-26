import { createBrowserRouter } from "react-router-dom";
import { getProductsLoader } from "./data/loaders/products";
import { HomeLayout } from "./layouts/home.layout";
import { CheckoutPage } from "./pages/checkout";
import { Home } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";

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
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
