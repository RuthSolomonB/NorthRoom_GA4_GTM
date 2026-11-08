import type { Category, CategorySlug, Product, SortKey } from '../types'

export const categories: Category[] = [
  {
    slug: 'lighting',
    name: 'Lighting',
    description: 'Floor lamps and pendants with a warm, low glare.',
    image: '/images/studio-floor-lamp.jpg',
    imageAlt: 'Matte charcoal floor lamp against a white wall',
  },
  {
    slug: 'seating',
    name: 'Seating',
    description: 'Chairs and sofas meant for long evenings.',
    image: '/images/ivory-tufted-chair.jpg',
    imageAlt: 'Ivory button-tufted chair',
  },
  {
    slug: 'tables',
    name: 'Tables',
    description: 'Dining tables and small tables for beside the sofa.',
    image: '/images/marble-dining-table.jpg',
    imageAlt: 'Marble dining table set for six',
  },
  {
    slug: 'textiles',
    name: 'Textiles',
    description: 'Wool, cotton, and bedding that soften with use.',
    image: '/images/heirloom-wool-rug.jpg',
    imageAlt: 'Patterned wool rug in sand and gold',
  },
  {
    slug: 'decor',
    name: 'Decor',
    description: 'Small objects that finish a shelf or a table.',
    image: '/images/ceramic-vessel-set.jpg',
    imageAlt: 'Speckled ceramic vessels on a white shelf',
  },
]

export const products: Product[] = [
  {
    id: 'studio-floor-lamp',
    name: 'Studio Floor Lamp',
    category: 'lighting',
    price: 320,
    featured: true,
    description:
      'A matte charcoal floor lamp with a deep shade. The head tilts and stays where you put it.',
    details: ['Powder-coated steel', 'Adjustable shade', 'In-line switch on the cord'],
    image: '/images/studio-floor-lamp.jpg',
    imageAlt: 'Charcoal floor lamp with an adjustable metal shade',
  },
  {
    id: 'ivory-tufted-chair',
    name: 'Ivory Tufted Chair',
    category: 'seating',
    price: 480,
    featured: true,
    description:
      'A compact chair in ivory upholstery with a button-tufted back. Useful at a desk, or pulled up to a low table.',
    details: ['Tufted upholstered seat and back', 'Turned legs', 'Seat height 18 in'],
    image: '/images/ivory-tufted-chair.jpg',
    imageAlt: 'Ivory button-tufted chair on a white background',
  },
  {
    id: 'marble-dining-table',
    name: 'Marble Dining Table',
    category: 'tables',
    price: 1480,
    featured: true,
    description:
      'A six-seat table with a pale stone top. It is shown here dressed for dinner; the chairs are not included.',
    details: ['Stone top on a wood base', 'Seats six', 'About 72 in long'],
    image: '/images/marble-dining-table.jpg',
    imageAlt: 'Pale stone dining table set with green velvet chairs',
  },
  {
    id: 'cloud-pillow',
    name: 'Cloud Pillow',
    category: 'textiles',
    price: 58,
    featured: true,
    description:
      'A firm cotton pillow in plain white. It holds its shape on a sofa or at the head of a bed.',
    details: ['Cotton cover', 'Firm insert included', 'Queen, 20 in by 30 in'],
    image: '/images/cloud-pillow.jpg',
    imageAlt: 'White cotton pillow on a white surface',
  },
  {
    id: 'ceramic-vessel-set',
    name: 'Ceramic Vessel Set',
    category: 'decor',
    price: 86,
    featured: false,
    description:
      'A speckled canister and a handful of small cups in sand and chalk glazes. Use them on a shelf, or for coffee.',
    details: ['Glazed stoneware', 'Cups are watertight', 'Canister about 7 in tall'],
    image: '/images/ceramic-vessel-set.jpg',
    imageAlt: 'Speckled ceramic canister and cups on a shelf',
  },
  {
    id: 'round-side-table',
    name: 'Round Side Table',
    category: 'tables',
    price: 160,
    featured: false,
    description:
      'A small round table with a white top and oak-tipped legs. Wide enough for a lamp, a book, and a cup.',
    details: ['Painted top, solid wood legs', 'Three-leg base', '18 in diameter, 22 in high'],
    image: '/images/round-side-table.jpg',
    imageAlt: 'Round white side table with wood-tipped legs beside a bed',
  },
  {
    id: 'brass-dome-pendants',
    name: 'Brass Dome Pendants',
    category: 'lighting',
    price: 740,
    featured: false,
    description:
      'Five unlacquered brass domes on black cords. Hang them in a cluster over a table, at staggered heights.',
    details: ['Set of five shades', 'Unlacquered brass, will patina', 'Cords included, canopy sold separately'],
    image: '/images/brass-dome-pendants.jpg',
    imageAlt: 'Cluster of brass dome pendant lights',
  },
  {
    id: 'heirloom-wool-rug',
    name: 'Heirloom Wool Rug',
    category: 'textiles',
    price: 890,
    featured: false,
    description:
      'A wool rug with a sand field and a gold border. The pattern is dense enough to hide the life of a room.',
    details: ['Wool pile', 'Traditional border pattern', '8 ft by 10 ft'],
    image: '/images/heirloom-wool-rug.jpg',
    imageAlt: 'Rolled wool rug with a sand field and gold pattern',
  },
  {
    id: 'stoneware-mug',
    name: 'Stoneware Mug',
    category: 'decor',
    price: 28,
    featured: true,
    description:
      'A plain white mug with a handle that fits a full hand. Dishwasher safe.',
    details: ['Glazed stoneware', '12 oz', 'Sold individually'],
    image: '/images/stoneware-mug.jpg',
    imageAlt: 'White stoneware mug on a white table',
  },
  {
    id: 'velvet-sofa',
    name: 'Velvet Sofa',
    category: 'seating',
    price: 1680,
    featured: false,
    description:
      'A low three-seat sofa in deep green velvet. The cushions are firm, and the wood legs keep it from feeling heavy.',
    details: ['Velvet upholstery', 'Solid wood legs', 'About 80 in wide'],
    image: '/images/velvet-sofa.jpg',
    imageAlt: 'Deep green velvet sofa with wooden legs',
  },
  {
    id: 'chalk-pendant',
    name: 'Chalk Pendant',
    category: 'lighting',
    price: 145,
    featured: false,
    description:
      'A single matte pendant in chalk grey. Hang it over a table, or use a pair above a kitchen island.',
    details: ['Spun metal shade', 'Matte chalk finish', 'Shade diameter 14 in'],
    image: '/images/chalk-pendant.jpg',
    imageAlt: 'Matte grey pendant light against a teal wall',
  },
  {
    id: 'cloud-duvet',
    name: 'Cloud Cotton Duvet',
    category: 'textiles',
    price: 210,
    featured: false,
    description:
      'Washed cotton percale in cloud white. It feels crisp the first night and softer every wash after.',
    details: ['100% cotton percale', 'Hidden button closure', 'Queen, 88 in by 92 in'],
    image: '/images/cloud-duvet.jpg',
    imageAlt: 'White cotton duvet on a made bed',
  },
]

export function getCategory(slug: string | null | undefined): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

export function isCategorySlug(value: string | null | undefined): value is CategorySlug {
  return categories.some((category) => category.slug === value)
}

export function getProduct(id: string | undefined): Product | undefined {
  return products.find((product) => product.id === id)
}

export function filterProducts(options: {
  q?: string
  category?: string
  sort?: SortKey
}): Product[] {
  const query = options.q?.trim().toLowerCase() ?? ''
  const category = isCategorySlug(options.category) ? options.category : undefined

  const matched = products.filter((product) => {
    if (category && product.category !== category) return false
    if (!query) return true
    const categoryName = getCategory(product.category)?.name ?? ''
    const haystack = `${product.name} ${product.description} ${categoryName}`.toLowerCase()
    return haystack.includes(query)
  })

  const sort = options.sort ?? 'featured'
  return [...matched].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'name') return a.name.localeCompare(b.name)
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    return a.name.localeCompare(b.name)
  })
}

export function relatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, limit)
}
