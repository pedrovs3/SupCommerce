import { cn, DELAY_CLASSES } from "@/lib/utils";
import { UserSession } from "@/types/auth";
import { Suspense } from "react";
import { PiShoppingCartSimple } from "react-icons/pi";
import { Await } from "react-router-dom";
import { CartPopover } from "./cart-popover";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const CartMenuItem = ({
  session,
  delayIndex,
}: {
  session: Promise<UserSession>;
  delayIndex: number;
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <li
        className={cn(
          "cursor-pointer opacity-0 flex gap-2 items-center justify-center px-4 py-3 hover:bg-slate-100 rounded-lg animate-fade-in",
          DELAY_CLASSES[delayIndex]
        )}
      >
        <PiShoppingCartSimple />
        Carrinho
      </li>
    </PopoverTrigger>
    <Suspense fallback={<div className="h-12 animate-pulse flex-1 min-w-10" />}>
      <Await resolve={session}>
        {({ user }) =>
          user ? (
            <CartPopover session={user} />
          ) : (
            <PopoverContent className="w-80">
              <h2 className="text-xl font-semibold">Seu carrinho</h2>
              <p className="text-sm text-gray-600">
                Você ainda não tem nada no carrinho.
              </p>
            </PopoverContent>
          )
        }
      </Await>
    </Suspense>
  </Popover>
);
