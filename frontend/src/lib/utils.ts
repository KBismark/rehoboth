import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  const num = Number(price);
  if (isNaN(num)) return "GH₵0.00";
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
  }).format(price);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `BB-${timestamp}-${random}`.toUpperCase();
}

// export function calculateTax(subtotal: number, taxRate: number = 0.08): number {
//   return Math.round(subtotal * taxRate * 100) / 100;
// }

export function calculateShipping(subtotal: number): number {
  if (subtotal >= 75) return 0; // Free shipping over $75
  if (subtotal >= 50) return 5.99; // Reduced shipping
  return 9.99; // Standard shipping
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
