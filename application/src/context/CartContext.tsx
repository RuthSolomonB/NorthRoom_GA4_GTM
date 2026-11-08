import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { CartLine } from '../types'

const STORAGE_KEY = 'northroom-cart'
const MAX_QTY = 8

type CartContextValue = {
  lines: CartLine[]
  itemCount: number
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function clamp(quantity: number): number {
  return Math.min(MAX_QTY, Math.max(1, Math.floor(quantity)))
}

function readStoredLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.flatMap((entry) => {
      if (!entry || typeof entry !== 'object') return []
      const line = entry as Partial<CartLine>
      if (typeof line.productId !== 'string' || typeof line.quantity !== 'number') return []
      if (!Number.isFinite(line.quantity) || line.quantity < 1) return []
      return [{ productId: line.productId, quantity: clamp(line.quantity) }]
    })
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readStoredLines)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines])

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)

  function addItem(productId: string, quantity = 1) {
    const amount = clamp(quantity)
    setLines((current) => {
      const existing = current.find((line) => line.productId === productId)
      if (!existing) return [...current, { productId, quantity: amount }]
      return current.map((line) =>
        line.productId === productId
          ? { ...line, quantity: clamp(line.quantity + amount) }
          : line,
      )
    })
  }

  function removeItem(productId: string) {
    setLines((current) => current.filter((line) => line.productId !== productId))
  }

  function setQuantity(productId: string, quantity: number) {
    if (quantity < 1) {
      removeItem(productId)
      return
    }
    const amount = clamp(quantity)
    setLines((current) =>
      current.map((line) => (line.productId === productId ? { ...line, quantity: amount } : line)),
    )
  }

  function clear() {
    setLines([])
  }

  const value = { lines, itemCount, addItem, removeItem, setQuantity, clear }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used within CartProvider')
  return value
}
