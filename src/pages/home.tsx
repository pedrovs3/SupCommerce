import { cn, DELAY_CLASSES } from "@/lib/utils";
import { Suspense, useEffect } from "react";
import { Await, useOutletContext } from "react-router-dom";
import { HomeContext } from "../types/home";

export interface Product {
  id: number;
  created_at: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export function Home() {
  const { products }: HomeContext = useOutletContext();

  useEffect(() => {
    (async () => {
      console.log(await products);
    })();
  }, []);
  return (
    <section className="flex flex-col gap-10">
      <div className="h-96 bg-slate-200">{/* Banner image */}</div>

      <main className="p-5 md:max-w-screen-2xl w-full mx-auto flex flex-col gap-4 animate-fade-in">
        <h2 className="text-3xl font-semibold">Produtos em destaque</h2>

        <div className="flex gap-10 overflow-x-auto pb-10 px-2 pt-2">
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
              resolve={products}
              errorElement={
                <p className="text-red-500">Erro ao carregar produtos</p>
              }
            >
              {(products: Product[]) =>
                products.map((product, index) => (
                  <div
                    key={product.id}
                    className={cn(
                      "bg-white opacity-0 p-4 min-w-96 max-w-sm shadow rounded-xl flex flex-col justify-between gap-2 w-full animate-fade-in ",
                      DELAY_CLASSES[index]
                    )}
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg aspect-video"
                    />
                    <main>
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-gray-500 max-h-24">
                        {product.description.substring(0, 100)}...
                      </p>
                    </main>

                    <button className="w-full shadow hover:shadow-md py-3 px-4 bg-black text-white font-medium rounded-lg hover:bg-zinc-800 transition-all ease-in-out">
                      R$ {product.price.toFixed(2)}
                    </button>
                  </div>
                ))
              }
            </Await>
          </Suspense>
        </div>
      </main>
    </section>
  );
}
