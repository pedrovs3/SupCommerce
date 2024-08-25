import { ProductCard } from "@/components/product-card";
import { cn, DELAY_CLASSES } from "@/lib/utils";
import { Product } from "@/types/products";
import { Suspense } from "react";
import { Await, useOutletContext } from "react-router-dom";
import { HomeContext } from "../types/home";

export function Home() {
  const { products, session }: HomeContext = useOutletContext();

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
                  <ProductCard
                    key={product.id}
                    {...product}
                    session={session}
                    index={index}
                  />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </main>
    </section>
  );
}
