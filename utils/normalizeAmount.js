export default function normalizeAmount(input) {
  if (!input) return 0;

  const str = input.toString();

  if (str.includes(",") && str.includes(".")) {
    const cleaned = str.replace(/\./g, "").replace(",", ".");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }

  if (str.includes(",")) {
    const cleaned = str.replace(",", ".");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }

  const cleaned = str.replace(/[^0-9.]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}
