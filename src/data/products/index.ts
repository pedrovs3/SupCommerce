import { Product } from "@/types/products";
import { supabase } from "../supabase";

export const getAllProducts = () => {
  const products = supabase
    .from("products")
    .select("*")
    .then(({ data }) => data);

  return products;
};

export const getProductById = (id: string) => {
  const product = supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .then(({ data }) => data);

  return product;
};

export const createProduct = (data: Product) => {
  const product = supabase
    .from("products")
    .insert([data])
    .then(({ data }) => data);

  return product;
};

export const updateProduct = (id: string, data: Product) => {
  const product = supabase
    .from("products")
    .update(data)
    .eq("id", id)
    .then(({ data }) => data);

  return product;
};

export const deleteProduct = (id: string) => {
  const product = supabase
    .from("products")
    .delete()
    .eq("id", id)
    .then(({ data }) => data);

  return product;
};

export const ProductController = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
