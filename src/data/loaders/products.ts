import { defer } from "react-router-dom";
import { ProductController } from "../products";
import { supabase } from "../supabase";

export const getProductsLoader = () => {
  const session = supabase.auth.getUser().then(({ data }) => data);
  const products = ProductController.getAllProducts();

  return defer({
    products,
    session,
  });
};
