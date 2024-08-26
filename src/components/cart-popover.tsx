import { clearCart, removeFromCart, updateCartItemQuantity } from "@/data/cart";
import { useCartItems } from "@/hooks/cart-items.hook";
import { UserSession } from "@/types/auth";
import { useCallback, useMemo } from "react";
import { LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import { CartItem } from "./cart-item";
import { PopoverContent } from "./ui/popover";

interface CartPopoverProps {
  session: UserSession;
}

export function CartPopover({ session }: CartPopoverProps) {
  const { cartItems } = useCartItems(session);

  const handleUpdateQuantity = useCallback(
    async (itemId: string, newQuantity: number) => {
      await updateCartItemQuantity(itemId, newQuantity);
    },
    []
  );

  const handleRemoveItem = useCallback(async (itemId: string) => {
    await removeFromCart(itemId);
  }, []);

  const handleClearCart = useCallback(async () => {
    await clearCart(session.id);
  }, [session.id]);

  const formattedCartItems = useMemo(
    () =>
      cartItems.map((item) => ({
        ...item,
        formattedPrice: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(item.products.price),
      })),
    [cartItems]
  );

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
            {formattedCartItems.map((item) => (
              <CartItem
                key={item.id}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                {...item}
              />
            ))}
          </ul>
          <Link
            to={"checkout"}
            state={{
              cartItems,
              total: cartItems.reduce(
                (acc, item) => acc + item.products.price * item.quantity,
                0
              ),
              session,
            }}
            className="px-4 py-3 flex justify-between items-center gap-2 hover:bg-slate-700 mt-auto bg-slate-900 text-slate-50 drop-shadow rounded-lg hover:rounded-xl animate-fade-in transition-all ease-in-out"
          >
            Finalizar compra
            <LuArrowRight size={18} />
          </Link>
          <button
            onClick={handleClearCart}
            className="px-4 py-3 animate-fade-in delay-100 opacity-0 hover:bg-red-100 rounded-lg w-full text-red-500 flex gap-2 items-center justify-center transition-all ease-in-out"
          >
            Limpar carrinho
          </button>
        </>
      )}
    </PopoverContent>
  );
}
