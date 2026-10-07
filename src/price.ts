// "850.000 VND" / "1.200.000đ" → 850000 / 1200000 (bỏ hết ký tự không phải số).
const toVnd = (price: string) => Number(price.replace(/\D/g, ""));

/** % giảm giá làm tròn, vd ("850.000 VND", "1.200.000 VND") → 29. 0 nếu không hợp lệ. */
export function discountPercent(price: string, originalPrice: string): number {
  const sale = toVnd(price);
  const orig = toVnd(originalPrice);
  if (!sale || !orig || sale >= orig) return 0;
  return Math.round((1 - sale / orig) * 100);
}
