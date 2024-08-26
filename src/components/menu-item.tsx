import { cn, DELAY_CLASSES } from "@/lib/utils";
import { Link } from "react-router-dom";

export const MenuItem = ({
  to,
  children,
  delayIndex,
}: {
  to: string;
  children: React.ReactNode;
  delayIndex: number;
}) => (
  <Link
    className={cn(
      "px-4 py-3 opacity-0 hover:bg-slate-100 rounded-lg animate-fade-in",
      DELAY_CLASSES[delayIndex]
    )}
    to={to}
  >
    {children}
  </Link>
);
