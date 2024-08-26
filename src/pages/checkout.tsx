import { FormField } from "@/components/form-field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { removeFromCart, updateCartItemQuantity } from "@/data/cart";
import { useCartItems } from "@/hooks/cart-items.hook";
import { cn, DELAY_CLASSES } from "@/lib/utils";
import { Product } from "@/types/products";
import { formatCurrency } from "@/utils/formatters";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useCallback, useState } from "react";
import { LuTrash } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { z } from "zod";

import { CreditCard, Focused } from "react-credit-cards-library";

export interface CartItems {
  id: string;
  user_id: string;
  product_id: number;
  quantity: number;
  added_at: string;
  products: Product;
}

export function CheckoutPage() {
  const { state } = useLocation();
  const { cartItems } = useCartItems(state.session);

  const handleUpdateQuantity = useCallback(
    async (itemId: string, newQuantity: number) => {
      await updateCartItemQuantity(itemId, newQuantity);
    },
    []
  );

  const handleRemoveItem = useCallback(async (itemId: string) => {
    await removeFromCart(itemId);
  }, []);

  return (
    <section className="flex flex-col gap-10 max-w-screen-2xl px-5 py-10 w-full flex-1 mx-auto">
      <section className="flex flex-1 gap-4">
        <div
          id="cart_resume"
          className="flex-1 flex flex-col gap-4 border rounded-lg p-5 max-w-sm"
        >
          <h2 className="text-xl">
            Seu carrinho (
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
          </h2>

          <ul className="flex flex-col divide-y gap-2">
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="flex items-center justify-between gap-2 p-2 rounded-lg">
                  <div className="flex gap-3">
                    <img
                      src={item.products.image_url}
                      alt={item.products.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {item.products.name}
                      </span>
                      <span className="text-sm text-gray-600">
                        {formatCurrency(item.products.price)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center justify-center border rounded-lg px-2 py-1">
                    <button
                      onClick={() => {
                        handleUpdateQuantity(item.id, item.quantity - 1);
                      }}
                      disabled={item.quantity === 1}
                      className="disabled:opacity-50"
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => {
                        handleUpdateQuantity(item.id, item.quantity + 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="p-2 rounded-lg hover:text-red-600 hover:bg-red-100 transition-all ease-in-out"
                    onClick={() => {
                      handleRemoveItem(item.id);
                    }}
                  >
                    <LuTrash size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <footer className="mt-auto text-2xl font-semibold border-t pt-2 flex gap-2 justify-between">
            Total:
            <span>
              {formatCurrency(
                cartItems.reduce(
                  (acc, item) => acc + item.products.price * item.quantity,
                  0
                )
              )}
            </span>
          </footer>
        </div>
        <div className="flex-1 w-full">
          <Tabs
            className="size-full flex flex-col gap-2"
            defaultValue="CREDIT_CARD"
          >
            <TabsList className="w-full p-2 h-fit rounded-lg">
              <TabsTrigger className="flex-1 text-lg" value="CREDIT_CARD">
                Cartão de crédito
              </TabsTrigger>
              <TabsTrigger className="flex-1 text-lg" value="PIX">
                PIX
              </TabsTrigger>
              <TabsTrigger className="flex-1 text-lg" value="BILLET">
                Boleto
              </TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-col flex-1" value="CREDIT_CARD">
              <CreditCardForm />
            </TabsContent>
            <TabsContent value="PIX">Change your password here.</TabsContent>
          </Tabs>
        </div>
      </section>
      <span className="text-xs text-center flex flex-col gap-2 text-muted-foreground">
        <strong className="font-semibold text-foreground">
          AVISO IMPORTANTE - Área de Checkout
        </strong>
        <span>
          Este formulário de checkout é parte de um projeto educacional
          desenvolvido para fins de aprendizado em desenvolvimento web. Nenhum
          dado inserido nesta área, incluindo informações de pagamento, é
          capturado, armazenado ou utilizado para qualquer finalidade. Este site
          não realiza transações reais, e todas as funcionalidades são apenas
          para simulação e prática.
          <strong className="font-semibold text-foreground">
            Isenção de Responsabilidade:
          </strong>{" "}
          O criador deste projeto não se responsabiliza por qualquer tentativa
          de uso indevido ou fraudulento das informações aqui inseridas. Este
          ambiente é inteiramente fictício e não está vinculado a nenhuma
          operação financeira real. Para fins de teste, recomendamos a
          utilização de cartões fictícios que podem ser gerados no site{" "}
          <a
            className="font-semibold underline text-foreground"
            href="https://www.4devs.com.br/gerador_de_numero_cartao_credito"
          >
            4devs
          </a>
          . Agradecemos sua compreensão e lembramos que esta plataforma serve
          exclusivamente como ferramenta educacional.
        </span>
      </span>
    </section>
  );
}

interface CardDataProps {
  number: string;
  name: string;
  expiration: string;
  cvv: string;
  focus: Focused;
}

export const CreditCardForm = () => {
  const [cardData, setCardData] = useState<CardDataProps>({
    number: "",
    name: "",
    expiration: "",
    cvv: "",
    focus: "",
  });

  const form = useForm({
    onSubmit: async ({ value }) => {},
    validatorAdapter: zodValidator(),
  });

  const { Field, Subscribe, handleSubmit, fieldInfo } = form;

  console.log(fieldInfo);

  console.log(form);

  return (
    <form
      className="flex flex-col gap-4 w-full flex-1"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      <div className="flex">
        <CreditCard
          number={cardData.number}
          name={cardData.name}
          expiry={cardData.expiration}
          cvc={cardData.cvv}
          focus={cardData.focus}
          cardSizes={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <FormField
        className={cn("animate-fade-in opacity-0", DELAY_CLASSES[1])}
        id="number"
        type="text"
        placeholder="**** **** **** 1234"
        Field={Field}
        label="Número do cartão"
        validators={{
          onChange: z
            .string({
              required_error: "Número do cartão é um campo obrigatório",
            })
            .refine((value) => value.length === 16, {
              message: "Número do cartão deve ter 16 dígitos",
            }),
          onChangeAsyncDebounceMs: 500,
        }}
        onChange={(value) => {
          setCardData((prev) => ({ ...prev, number: value }));
        }}
        onFocus={() => {
          setCardData((prev) => ({ ...prev, focus: "number" }));
        }}
      />
      <FormField
        className={cn("animate-fade-in opacity-0", DELAY_CLASSES[2])}
        id="name"
        type="text"
        placeholder="John Doe"
        Field={Field}
        label="Nome no cartão"
        validators={{
          onChange: z
            .string({
              required_error: "Nome no cartão é um campo obrigatório",
            })
            .min(3, {
              message: "Nome no cartão deve ter no mínimo 3 caracteres",
            }),
          onChangeAsyncDebounceMs: 500,
        }}
        onChange={(value) => {
          setCardData((prev) => ({ ...prev, name: value }));
        }}
        onFocus={() => {
          setCardData((prev) => ({ ...prev, focus: "name" }));
        }}
      />

      <div className="flex gap-4 w-full">
        <FormField
          className={cn("animate-fade-in opacity-0", DELAY_CLASSES[3])}
          id="expiration"
          type="text"
          placeholder="MM/AA"
          Field={Field}
          label="Validade"
          validators={{
            onChange: z
              .string({
                required_error: "Validade é um campo obrigatório",
              })
              .refine((value) => value.length === 5, {
                message: "Validade deve ter 5 caracteres",
              }),
            onChangeAsyncDebounceMs: 500,
          }}
          onChange={(value) => {
            setCardData((prev) => ({ ...prev, expiration: value }));
          }}
          onFocus={() => {
            setCardData((prev) => ({ ...prev, focus: "expiry" }));
          }}
        />
        <FormField
          className={cn("animate-fade-in opacity-0", DELAY_CLASSES[4])}
          id="cvv"
          type="text"
          placeholder="123"
          Field={Field}
          label="CVV"
          validators={{
            onChange: z
              .string({
                required_error: "CVV é um campo obrigatório",
              })
              .refine((value) => value.length === 3, {
                message: "CVV deve ter 3 dígitos",
              }),
            onChangeAsyncDebounceMs: 500,
          }}
          onChange={(value) => {
            setCardData((prev) => ({ ...prev, cvv: value }));
          }}
          onFocus={() => {
            setCardData((prev) => ({ ...prev, focus: "cvc" }));
          }}
        />
      </div>

      <Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className={cn(
              "animate-fade-in mt-auto opacity-0 w-full bg-slate-900 text-slate-50 hover:bg-slate-700 rounded-lg hover:rounded-xl py-3",
              DELAY_CLASSES[5]
            )}
          >
            Finalizar compra
          </button>
        )}
      />
    </form>
  );
};
