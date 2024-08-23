import { defer } from "react-router-dom";
import { supabase } from "../supabase";

export const getProductsLoader = () => {
  const session = supabase.auth.getUser().then(({ data }) => data);
  const products = supabase
    .from("products")
    .select("*")
    .then(({ data }) => data);

  return defer({
    products,
    session,
  });
};
