import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DELAY_CLASSES = [
  "delay-0",
  "delay-50",
  "delay-100",
  "delay-150",
  "delay-200",
  "delay-250",
  "delay-300",
];
