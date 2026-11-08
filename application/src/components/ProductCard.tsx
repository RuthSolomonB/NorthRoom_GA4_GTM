import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getCategory } from '../data/products'
import { formatMoney } from '../lib/format'
import type { Product } from '../types'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const category = getCategory(product.category)

  function onAdd() {
    addItem(product.id, 1)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__media">
        <img src={product.image} alt={product.imageAlt} />
      </Link>
      <div className="product-card__body">
        <p className="eyebrow">{category?.name}</p>
        <h3>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="product-card__row">
          <p className="price">{formatMoney(product.price)}</p>
          <button
            type="button"
            className="btn btn--small"
            data-product-id={product.id}
            data-product-name={product.name}
            onClick={onAdd}
          >
            {added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  )
}
