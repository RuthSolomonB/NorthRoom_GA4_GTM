export type CategorySlug = 'lighting' | 'seating' | 'tables' | 'textiles' | 'decor'

export type Product = {
  id: string
  name: string
  category: CategorySlug
  price: number
  featured: boolean
  description: string
  details: string[]
  image: string
  imageAlt: string
}

export type Category = {
  slug: CategorySlug
  name: string
  description: string
  image: string
  imageAlt: string
}

export type CartLine = {
  productId: string
  quantity: number
}

export type ShippingInfo = {
  fullName: string
  email: string
  address: string
  apartment: string
  city: string
  region: string
  postalCode: string
  country: string
}

export type OrderLine = {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export type Order = {
  id: string
  placedAt: string
  shipping: ShippingInfo
  lines: OrderLine[]
  subtotal: number
  shippingCost: number
  tax: number
  total: number
}

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name'
