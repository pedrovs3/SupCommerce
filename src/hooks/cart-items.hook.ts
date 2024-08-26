import { supabase } from "@/data/supabase";
import { UserSession } from "@/types/auth";
import { CartItem } from "@/types/cart";
import { useCallback, useEffect, useState } from "react";

export const useCartItems = (session: UserSession) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCartItems = useCallback(async () => {
    if (!session) return;

    const { data } = await supabase
      .from("cart_items")
      .select("*, products(*)")
      .eq("user_id", session.id);

    setCartItems(data || []);
  }, [session]);

  useEffect(() => {
    fetchCartItems();

    const channel = supabase
      .channel("cart_items")
      .on(
        "postgres_changes",
        { event: "*", schema: "sup-commerce", table: "cart_items" },
        () => {
          fetchCartItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchCartItems]);

  return { cartItems, fetchCartItems };
};
