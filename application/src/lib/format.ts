const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

export function formatMoney(amount: number): string {
  return money.format(amount)
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(iso))
}

export function itemLabel(count: number): string {
  return count === 1 ? '1 item' : `${count} items`
}
