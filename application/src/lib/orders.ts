import type { Order } from '../types'

const STORAGE_KEY = 'northroom-orders'

function readAll(): Record<string, Order> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    return parsed as Record<string, Order>
  } catch {
    return {}
  }
}

export function saveOrder(order: Order): void {
  const all = readAll()
  all[order.id] = order
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function getOrder(id: string): Order | undefined {
  return readAll()[id]
}

export function createOrderId(): string {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `NR-${suffix}`
}
