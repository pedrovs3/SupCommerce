import { addItemToCart } from "@/data/cart";
import { cn, DELAY_CLASSES } from "@/lib/utils";
import { UserSession } from "@/types/auth";
import { formatCurrency } from "@/utils/formatters";
import { Await } from "react-router-dom";
import { toast } from "sonner";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  image_url: string;
  id?: number;
  session: Promise<UserSession>;
  index: number;
}

export const ProductCard = ({
  name,
  description,
  price,
  image_url,
  id,
  index,
  session,
}: ProductCardProps) => {
  return (
    <div
      className={cn(
        "bg-white opacity-0 p-4 min-w-96 max-w-sm shadow rounded-xl flex flex-col justify-between gap-2 w-full animate-fade-in ",
        DELAY_CLASSES[index]
      )}
    >
      <img
        src={image_url}
        alt={name}
        className="w-full h-48 object-cover rounded-lg aspect-video"
      />
      <main>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-500 max-h-24">
          {description.substring(0, 100)}...
        </p>
      </main>
      {id && session && (
        <Await
          resolve={session}
          errorElement={<p className="text-red-500">Houve um erro.</p>}
        >
          {({ user }) => (
            <button
              id="buy-button"
              onClick={async () => {
                if (!user) {
                  toast.info("Você precisa estar logado para comprar.");
                  return;
                }

                await addItemToCart({
                  productId: id?.toString(),
                  userId: user.id,
                });
              }}
              className="w-full shadow hover:shadow-md py-3 px-4 bg-black text-white font-medium rounded-lg hover:bg-zinc-800 transition-all ease-in-out"
            >
              {formatCurrency(Number(price.toFixed(2)))}
            </button>
          )}
        </Await>
      )}
    </div>
  );
};
