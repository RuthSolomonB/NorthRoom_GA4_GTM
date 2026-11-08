import type { SortKey } from '../types'

export function buildShopPath(options: {
  q?: string
  category?: string
  sort?: SortKey | string
}): string {
  const params = new URLSearchParams()
  const query = options.q?.trim()
  if (query) params.set('q', query)
  if (options.category) params.set('category', options.category)
  if (options.sort && options.sort !== 'featured') params.set('sort', options.sort)
  const search = params.toString()
  return search ? `/shop?${search}` : '/shop'
}

export function parseSort(value: string | null): SortKey {
  if (value === 'price-asc' || value === 'price-desc' || value === 'name') return value
  return 'featured'
}
