import { Product } from "../pages/home";

export interface HomeContext {
  products: Promise<Product[]>;
}
