import React from "react";
import { LuMinus, LuPlus, LuTrash } from "react-icons/lu";

interface CartItemProps {
  id: string;
  quantity: number;
  formattedPrice: string;
  products: {
    image_url: string;
    name: string;
    price: number;
  };
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const CartItemComponent = ({
  id,
  quantity,
  formattedPrice,
  products,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemProps) => {
  return (
    <li key={id}>
      <div className="flex items-center justify-between gap-2 p-2 rounded-lg">
        <img
          src={products.image_url}
          alt={products.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{products.name}</span>
          <span className="text-sm text-gray-600">{formattedPrice}</span>
        </div>
        <div className="flex gap-2 items-center justify-center border rounded-lg px-2 py-1">
          <button
            onClick={() => onUpdateQuantity(id, quantity - 1)}
            disabled={quantity === 1}
            className="disabled:opacity-50"
          >
            <LuMinus size={18} />
          </button>
          {quantity}
          <button onClick={() => onUpdateQuantity(id, quantity + 1)}>
            <LuPlus size={18} />
          </button>
        </div>
        <button
          className="p-2 rounded-lg hover:text-red-600 hover:bg-red-100 transition-all ease-in-out"
          onClick={() => onRemoveItem(id)}
        >
          <LuTrash size={18} />
        </button>
      </div>
    </li>
  );
};

export const CartItem = React.memo(CartItemComponent);
