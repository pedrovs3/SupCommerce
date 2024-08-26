import { cn, DELAY_CLASSES } from "@/lib/utils";
import { Link } from "react-router-dom";

export const MenuItem = ({
  to,
  children,
  delayIndex,
  disabled,
}: {
  to: string;
  children: React.ReactNode;
  delayIndex: number;
  disabled?: boolean;
}) => (
  <Link
    className={cn(
      "px-4 py-3 opacity-0 hover:bg-slate-100 rounded-lg animate-fade-in cursor-pointer",
      DELAY_CLASSES[delayIndex],
      disabled && "text-gray-400 cursor-not-allowed pointer-events-none"
    )}
    aria-disabled={disabled}
    to={to}
  >
    {children}
  </Link>
);
