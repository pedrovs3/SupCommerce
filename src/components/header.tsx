import { PiShoppingCartSimple } from "react-icons/pi";

export const Header = () => {
  return (
    <header className="w-full py-5 border-b px-28 flex gap-4 justify-between items-center sticky top-0 bg-white">
      <h1 className="text-xl">SupCommerce</h1>

      <nav>
        <ul className="flex justify-between gap-4 font-semibold">
          <li className="flex-1 cursor-pointer hover:bg-slate-50 px-4 py-2 rounded-lg transition-all ease-out">
            Home
          </li>
          <li className="flex-1 cursor-pointer hover:bg-slate-50 px-4 py-2 rounded-lg transition-all ease-out">
            Produtos
          </li>
          <li className="flex-1 cursor-pointer hover:bg-slate-50 px-4 py-2 rounded-lg transition-all ease-out flex gap-2 items-center justify-center">
            <PiShoppingCartSimple size={22} />
            Carrinho
          </li>
          <li>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg transition-all ease-out">
              Entrar
            </button>
          </li>
          <li>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg transition-all ease-out">
              Cadastrar
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
