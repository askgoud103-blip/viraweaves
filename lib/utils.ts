// lib/utils.ts

/**
 * Normalizes a string for use in URLs (slugs).
 * Accepts string, undefined, or null to prevent TypeScript build errors.
 */
export const normalize = (value: string | undefined | null) => {
  if (!value) return "all"; // Fallback if category is missing
  
  return value
    .toLowerCase()
    .trim()
    .replace(/\s*to\s*/g, "-") // Handles "Silk to Cotton" -> "silk-cotton"
    .replace(/\s+/g, "-")      // Spaces to hyphens
    .replace(/-+/g, "-");      // Double hyphens to single
};

/**
 * Formats a number into Indian Rupee (INR) currency format.
 */
export const formatPrice = (price: number) => {
  return price.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
};
