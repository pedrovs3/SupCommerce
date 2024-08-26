import { LuMenu } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { AuthButtons } from "./auth-buttons";
import { CartMenuItem } from "./cart-menu-item";
import { HeaderProps } from "./header";
import { MenuItem } from "./menu-item";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const MobileMenu = ({
  session,
  navigate,
}: HeaderProps & {
  navigate: ReturnType<typeof useNavigate>;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-5 md:hidden">
          <LuMenu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-2 w-full">
        <SheetHeader>
          <SheetTitle className="text-xl">Menu</SheetTitle>
        </SheetHeader>
        <ul className="justify-between flex gap-4 font-semibold flex-col">
          <MenuItem to="/" delayIndex={0}>
            Início
          </MenuItem>
          <MenuItem to="/products" delayIndex={1}>
            Produtos
          </MenuItem>
          <CartMenuItem session={session} delayIndex={2} />
          <AuthButtons session={session} delayIndex={3} navigate={navigate} />
        </ul>
      </SheetContent>
    </Sheet>
  );
};
