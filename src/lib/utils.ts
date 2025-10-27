export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export const DISPLAY_CURRENCY = "AUD";

export function formatCurrency(value: number, currency = DISPLAY_CURRENCY) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export function daysBetween(a: Date, b: Date) {
  return Math.round((+b - +a) / (1000 * 60 * 60 * 24));
}


