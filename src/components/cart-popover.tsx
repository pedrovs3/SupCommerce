import { clearCart, excludeItemFromCart } from "@/data/cart";
import { supabase } from "@/data/supabase";
import { UserSession } from "@/types/auth";
import { CartItem } from "@/types/cart";
import { formatCurrency } from "@/utils/formatters";
import { useEffect, useState } from "react";
import { LuX } from "react-icons/lu";
import { PopoverContent } from "./ui/popover";

interface CartPopoverProps {
  session: UserSession;
}

export function CartPopover({ session }: CartPopoverProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!session) return;

      const { data } = await supabase
        .from("cart_items")
        .select("*, products(*)")
        .eq("user_id", session.id);
      setCartItems(data || []);
    };

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
  }, []);

  return (
    <PopoverContent className="w-80 flex flex-col gap-4 rounded-xl">
      <h2 className="text-xl font-semibold">Seu carrinho</h2>
      {cartItems.length === 0 ? (
        <p className="text-sm text-gray-600 animate-fade-in transition-all ease-in-out">
          Você ainda não tem nada no carrinho.
        </p>
      ) : (
        <>
          <ul className="flex flex-col gap-2 transition-all ease-in-out">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="bg-slate-50 px-2 py-3 rounded-lg flex justify-between items-center gap-2"
              >
                <div className="flex gap-2">
                  <img
                    className="max-w-16 h-16 object-cover rounded-lg"
                    src={item.products.image_url}
                    alt={item.products.name}
                  />
                  <span className="flex flex-col">
                    <h3>
                      <span className="text-muted-foreground">
                        {item.quantity}x
                      </span>{" "}
                      {item.products.name}
                    </h3>
                    <p className="text-sm font-semibold ">
                      {formatCurrency(item.products.price)}
                    </p>
                  </span>
                </div>
                <button
                  onClick={async () => {
                    await excludeItemFromCart(item.id);
                  }}
                  className="text-red-500 pr-2"
                >
                  <LuX />
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={async () => {
              await clearCart(session.id);
            }}
            className="px-4 py-3 hover:bg-red-100 rounded-lg w-full text-red-500 flex gap-2 items-center justify-center transition-all ease-in-out"
          >
            Limpar carrinho
          </button>
        </>
      )}
    </PopoverContent>
  );
}
