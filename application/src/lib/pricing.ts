export const TAX_RATE = 0.08
export const SHIPPING_FLAT = 15
export const FREE_SHIPPING_AT = 200

export type PriceSummary = {
  subtotal: number
  shipping: number
  tax: number
  total: number
}

function roundMoney(amount: number): number {
  return Math.round(amount * 100) / 100
}

export function summarize(subtotal: number): PriceSummary {
  const shipping = subtotal <= 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FLAT
  const tax = roundMoney(subtotal * TAX_RATE)
  const total = roundMoney(subtotal + shipping + tax)
  return { subtotal, shipping, tax, total }
}
