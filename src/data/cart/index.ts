import { CartItem } from "@/types/cart";
import { toast } from "sonner";
import { supabase } from "../supabase";

export const getCartItems = async (userId: string): Promise<CartItem[]> => {
  const { data, error } = await supabase
    .from("cart_items")
    .select("*, products(*)")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data;
};

interface AddToCartParams {
  userId: string;
  productId?: string;
  quantity?: number;
}

export const addItemToCart = async ({ productId, userId }: AddToCartParams) => {
  if (!productId || !userId) {
    throw new Error("productId and userId are required.");
  }

  const { error } = await supabase.rpc("increment_cart_item_quantity", {
    p_user_id: userId,
    p_product_id: Number(productId),
    increment_by: 1, // How much you want to increment the quantity
  });

  if (error) {
    console.error("Error adding/updating item in cart:", error);
  } else {
    toast.info("Produto adicionado ao carrinho.");
  }
};

export const updateCartItemQuantity = async (
  itemId: string,
  quantity: number
): Promise<void> => {
  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", itemId);

  if (error) throw new Error(error.message);
};

export const removeFromCart = async (itemId: string): Promise<void> => {
  const { error } = await supabase.from("cart_items").delete().eq("id", itemId);

  if (error) throw new Error(error.message);
};

export const clearCart = async (userId: string): Promise<void> => {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
};

export const excludeItemFromCart = async (itemId: string): Promise<void> => {
  const { error } = await supabase.from("cart_items").delete().eq("id", itemId);

  if (error) throw new Error(error.message);
};
