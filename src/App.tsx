import { PiShoppingCartSimple } from "react-icons/pi";

function App() {
  return (
    <main className="">
      <header className="w-full py-5 border-b px-28 flex gap-4 justify-between items-center sticky top-0 bg-white">
        <h1 className="text-xl">SupCommerce</h1>

        <nav>
          <ul className="flex justify-between gap-4 font-semibold">
            <li className="flex-1 hover:bg-slate-50 px-4 py-2 rounded-lg transition-all ease-out">
              Home
            </li>
            <li className="flex-1 hover:bg-slate-50 px-4 py-2 rounded-lg transition-all ease-out">
              Produtos
            </li>
            <li className="flex-1 hover:bg-slate-50 px-4 py-2 rounded-lg transition-all ease-out flex gap-2 items-center justify-center">
              <PiShoppingCartSimple size={22} />
              Carrinho
            </li>
          </ul>
        </nav>
      </header>
      <section>
        <div className="h-96 bg-slate-200">{/* Banner image */}</div>

        <div className="px-28 py-10">
          <h2 className="text-3xl font-semibold">Produtos em destaque</h2>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4">Produto 1</div>
            <div className="bg-white p-4">Produto 2</div>
            <div className="bg-white p-4">Produto 3</div>
            <div className="bg-white p-4">Produto 4</div>
          </div>
        </div>
        <div className="px-28 py-10">
          <h2 className="text-3xl font-semibold">Produtos em destaque</h2>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4">Produto 1</div>
            <div className="bg-white p-4">Produto 2</div>
            <div className="bg-white p-4">Produto 3</div>
            <div className="bg-white p-4">Produto 4</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
