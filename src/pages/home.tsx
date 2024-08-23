import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Header } from "../components/header";
import { cn, DELAY_CLASSES } from "../lib/tailwind";

export interface Product {
  id: number;
  created_at: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export function Home() {
  const data = useLoaderData() as {
    products: any;
  };

  console.log(data);

  return (
    <main className="">
      <Header />
      <section className="flex flex-col gap-10">
        <div className="h-96 bg-slate-200">{/* Banner image */}</div>

        <main className="px-28 flex flex-col gap-4 animate-fade-in">
          <h2 className="text-3xl font-semibold">Produtos em destaque</h2>

          <div className="grid grid-cols-4 gap-4">
            <Suspense
              fallback={
                <>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "bg-white opacity-0 p-4 max-w-sm animate-pulse shadow rounded-xl",
                        DELAY_CLASSES[index]
                      )}
                    >
                      <div className="bg-gray-200 h-48 rounded-lg aspect-video w-full"></div>
                      <div className="bg-gray-200 h-8 w-2/4 rounded-lg my-2"></div>
                      <div className="bg-gray-200 h-20 w-full rounded-lg"></div>
                      <div className="bg-gray-200 h-12 w-full rounded-lg mt-4"></div>
                    </div>
                  ))}
                </>
              }
            >
              <Await
                resolve={data.products}
                errorElement={
                  <p className="text-red-500">Erro ao carregar produtos</p>
                }
              >
                {(products: Product[]) =>
                  products.map((product, index) => (
                    <div
                      key={product.id}
                      className={cn(
                        "bg-white opacity-0 p-4 max-w-sm shadow rounded-xl flex flex-col gap-2 w-full animate-fade-in",
                        DELAY_CLASSES[index]
                      )}
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg aspect-video"
                      />
                      <main>
                        <h3 className="text-xl font-semibold">
                          {product.name}
                        </h3>
                        <p className="text-gray-500">
                          {product.description.substring(0, 100)}...
                        </p>
                      </main>

                      <button className="w-full py-3 px-4 bg-black text-white font-medium rounded-lg hover:bg-zinc-800 transition-all ease-in-out">
                        R$ {product.price.toFixed(2)}
                      </button>
                    </div>
                  ))
                }
              </Await>
            </Suspense>
          </div>
        </main>
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
