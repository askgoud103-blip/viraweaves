// lib/utils.ts

export const normalize = (value: string) => {
  if (!value) return "";
  return value
    .toLowerCase()
    .trim()
    .replace(/\s*to\s*/g, "-") // Handles "Silk to Cotton" -> "silk-cotton"
    .replace(/\s+/g, "-")      // Spaces to hyphens
    .replace(/-+/g, "-");      // Double hyphens to single
};

export const formatPrice = (price?: number) => {
  if (!price) return "Contact or Visit";

  return price.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
};

