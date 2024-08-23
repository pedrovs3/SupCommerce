import { PiShoppingCartSimple } from "react-icons/pi";
import { cn, DELAY_CLASSES } from "../lib/tailwind";

const HEADER_NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "products",
    label: "Produtos",
    href: "/products",
  },
  {
    id: "cart",
    label: "Carrinho",
    href: "/cart",
    Icon: PiShoppingCartSimple,
  },
  {
    id: "login",
    label: "Entrar",
    href: "/login",
  },
  {
    id: "register",
    label: "Cadastrar",
    href: "/register",
  },
];

export const Header = () => {
  return (
    <header className="w-full py-5 border-b px-28 flex gap-4 justify-between items-center sticky top-0 bg-white z-50">
      <h1 className="text-xl">SupCommerce</h1>

      <nav>
        <ul className="justify-between gap-4 font-semibold hidden md:flex">
          {HEADER_NAV_ITEMS.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "flex-1 opacity-0 cursor-pointer hover:bg-slate-50 px-4 py-2 rounded-lg transition-all ease-out animate-fade-in",
                {
                  "bg-black text-white":
                    item.id === "register" || item.id === "login",
                },
                DELAY_CLASSES[index]
              )}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
