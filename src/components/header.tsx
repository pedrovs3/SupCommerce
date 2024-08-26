import { useLocation, useNavigate } from "react-router-dom";
import { UserSession } from "../types/auth";
import { AuthButtons } from "./auth-buttons";
import { CartMenuItem } from "./cart-menu-item";
import { MenuItem } from "./menu-item";
import { MobileMenu } from "./mobile-menu";

export interface HeaderProps {
  session: Promise<UserSession>;
}

export const Header = ({ session }: HeaderProps) => {
  const navigate = useNavigate();

  const location = useLocation();

  console.log(location);

  return (
    <header className="w-full py-5 border-b px-10 md:px-28 flex gap-4 justify-between items-center sticky top-0 bg-white z-50 transition-all ease-in-out">
      <h1 className="text-xl animate-fade-in">SupCommerce</h1>

      <nav>
        <MobileMenu navigate={navigate} session={session} />
        <ul className="justify-between gap-4 font-semibold hidden md:flex">
          <MenuItem to="/" delayIndex={0}>
            Início
          </MenuItem>
          <MenuItem disabled to="/products" delayIndex={1}>
            Produtos
          </MenuItem>
          {location.pathname !== "/checkout" && (
            <CartMenuItem session={session} delayIndex={2} />
          )}
          <AuthButtons session={session} delayIndex={3} navigate={navigate} />
        </ul>
      </nav>
    </header>
  );
};
