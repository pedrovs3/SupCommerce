import { UserSession } from "./auth";
import { Product } from "./products";

export interface HomeContext {
  products: Promise<Product[]>;
  session: Promise<UserSession>;
}
