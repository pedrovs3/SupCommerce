import { clearCart, removeFromCart, updateCartItemQuantity } from "@/data/cart";
import { supabase } from "@/data/supabase";
import { UserSession } from "@/types/auth";
import { CartItem } from "@/types/cart";
import { useEffect, useState } from "react";
import { LuArrowRight, LuMinus, LuPlus, LuTrash } from "react-icons/lu";
import { Link } from "react-router-dom";
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
    <PopoverContent className="lg:w-96 w-80 flex flex-col gap-2 rounded-xl transition-all ease-in-out">
      <h2 className="text-xl font-semibold border-b pb-2">Seu carrinho</h2>
      {cartItems.length === 0 ? (
        <p className="text-sm text-gray-600 animate-fade-in transition-all ease-in-out">
          Você ainda não tem nada no carrinho.
        </p>
      ) : (
        <>
          <ul className="flex flex-col gap-2 transition-all ease-in-out divide-y-[1px]">
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="flex items-center justify-between gap-2  p-2 rounded-lg">
                  <img
                    src={item.products.image_url}
                    alt={item.products.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.products.name}</span>
                    <span className="text-sm text-gray-600">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.products.price)}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center justify-center border  rounded-lg px-2 py-1">
                    <button
                      onClick={async () => {
                        await updateCartItemQuantity(
                          item.id,
                          item.quantity - 1
                        );
                      }}
                      disabled={item.quantity === 1}
                      className="disabled:opacity-50"
                    >
                      <LuMinus size={18} />
                    </button>
                    {item.quantity}

                    <button
                      onClick={async () => {
                        await updateCartItemQuantity(
                          item.id,
                          item.quantity + 1
                        );
                      }}
                    >
                      <LuPlus size={18} />
                    </button>
                  </div>
                  <button
                    className="p-2 rounded-lg hover:text-red-600 hover:bg-red-100 transition-all ease-in-out"
                    onClick={async () => {
                      await removeFromCart(item.id);
                    }}
                  >
                    <LuTrash size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to={"checkout"}
            state={{
              cartItems,
            }}
            className="px-4 py-3 flex justify-between items-center gap-2 hover:bg-slate-700 mt-auto bg-slate-900 text-slate-50 drop-shadow rounded-lg hover:rounded-xl animate-fade-in transition-all ease-in-out"
          >
            Finalizar compra
            <LuArrowRight size={18} />
          </Link>
          <button
            onClick={async () => {
              await clearCart(session.id);
            }}
            className="px-4 py-3 animate-fade-in delay-100 opacity-0 hover:bg-red-100 rounded-lg w-full text-red-500 flex gap-2 items-center justify-center transition-all ease-in-out"
          >
            Limpar carrinho
          </button>
        </>
      )}
    </PopoverContent>
  );
}
