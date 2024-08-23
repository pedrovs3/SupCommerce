import { Outlet, useLoaderData } from "react-router-dom";
import { Header } from "../components/header";
import { Product } from "../pages/home";

export const HomeLayout = () => {
  const data = useLoaderData() as {
    products: Promise<Product[]>;
  };

  return (
    <section className="">
      <Header />

      <Outlet
        context={{
          products: data?.products,
        }}
      />

      <footer className="border-t flex flex-col gap-2 text-slate-600 font-medium items-center font-heading text-sm py-4 px-10">
        <p className="text-center">
          &copy; {new Date().getFullYear()} - Todos os direitos reservados
        </p>
        <span className="w-full text-xs max-w-screen-xl text-center ">
          <strong className="font-semibold">Aviso Importante:</strong> Este
          e-commerce é um projeto desenvolvido exclusivamente para fins
          educativos. Todo o conteúdo e funcionalidades aqui apresentados têm o
          objetivo de proporcionar um ambiente de aprendizado e prática em
          desenvolvimento web. Este site não é uma loja real e não está
          legalmente autorizado a realizar vendas ou transações comerciais.
          Nenhum produto ou serviço está disponível para compra, e qualquer
          similaridade com marcas, produtos ou empresas reais é meramente
          coincidência. Agradecemos a compreensão.
        </span>
      </footer>
    </section>
  );
};
