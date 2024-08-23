import { Suspense } from "react";
import { FiLogOut } from "react-icons/fi";
import { PiShoppingCartSimple } from "react-icons/pi";
import { Await, Link, useNavigate } from "react-router-dom";
import { supabase } from "../data/supabase";
import { UserSession } from "../types/auth";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface HeaderProps {
  session: Promise<UserSession>;
}

export const Header = ({ session }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="w-full py-5 border-b px-28 flex gap-4 justify-between items-center sticky top-0 bg-white z-50">
      <h1 className="text-xl">SupCommerce</h1>

      <nav>
        <ul className="justify-between gap-4 font-semibold hidden md:flex">
          <Link className="px-4 py-3 hover:bg-slate-100 rounded-lg" to={"/"}>
            Início
          </Link>
          <Link
            className="px-4 py-3 hover:bg-slate-100 rounded-lg"
            to={"/products"}
          >
            Produtos
          </Link>

          <Popover>
            <PopoverTrigger asChild>
              <li className="cursor-pointer flex gap-2 items-center justify-center px-4 py-3 hover:bg-slate-100 rounded-lg">
                <PiShoppingCartSimple />
                Carrinho
              </li>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <h2 className="text-xl font-semibold">Seu carrinho</h2>
              <p className="text-sm text-gray-600">
                Você ainda não tem nada no carrinho.
              </p>
            </PopoverContent>
          </Popover>

          <Suspense fallback={<li>Carregando...</li>}>
            <Await resolve={session}>
              {({ user }) => {
                console.log(user);
                return user ? (
                  <>
                    <button
                      className="px-4 py-3 hover:bg-red-100 rounded-lg w-full text-red-500 flex gap-2 items-center justify-center"
                      onClick={async () => {
                        const { error } = await supabase.auth.signOut();

                        if (error) {
                          console.error(error);
                          return;
                        } else {
                          navigate(0);
                        }
                      }}
                    >
                      Sair
                      <FiLogOut size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      className="px-4 py-3 hover:bg-slate-700 bg-slate-900 text-slate-50 drop-shadow rounded-lg hover:rounded-xl transition-all ease-in-out"
                      to={"/login"}
                    >
                      Entrar
                    </Link>
                    <Link
                      className="px-4 py-3 hover:bg-slate-400 hover:text-slate-800 drop-shadow bg-slate-700 text-slate-50 rounded-lg hover:rounded-xl transition-all ease-in-out"
                      to={"/register"}
                    >
                      Cadastrar
                    </Link>
                  </>
                );
              }}
            </Await>
          </Suspense>
        </ul>
      </nav>
    </header>
  );
};
