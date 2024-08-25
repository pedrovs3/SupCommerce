import { Product } from "./products";

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  products: Product;
}
