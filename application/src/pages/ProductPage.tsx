import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { QuantityControl } from '../components/QuantityControl'
import { useCart } from '../context/CartContext'
import { getCategory, getProduct, relatedProducts } from '../data/products'
import { formatMoney } from '../lib/format'
import { buildShopPath } from '../lib/shop'

export function ProductPage() {
  const { productId } = useParams()
  const product = getProduct(productId)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setQuantity(1)
    setAdded(false)
  }, [productId])

  useEffect(() => {
    document.title = product ? `${product.name} — Northroom` : 'Product not found — Northroom'
  }, [product])

  if (!product) {
    return (
      <div className="wrap page">
        <div className="empty">
          <h1>This piece isn’t in the shop</h1>
          <p>It may have been renamed. The rest of the collection is still here.</p>
          <Link className="btn btn--primary" to="/shop">
            Back to the shop
          </Link>
        </div>
      </div>
    )
  }

  const category = getCategory(product.category)
  const related = relatedProducts(product)

  function onAdd() {
    addItem(product!.id, quantity)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className="wrap page">
      <p className="crumbs">
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <Link to={buildShopPath({ category: product.category })}>{category?.name}</Link>
      </p>
      <article className="pdp">
        <div className="pdp__media">
          <img src={product.image} alt={product.imageAlt} />
        </div>
        <div className="pdp__info">
          <p className="eyebrow">{category?.name}</p>
          <h1>{product.name}</h1>
          <p className="price price--lg">{formatMoney(product.price)}</p>
          <p className="lede">{product.description}</p>
          <p className="stock">In stock · ships in 3–5 days</p>
          <div className="pdp__buy">
            <QuantityControl
              value={quantity}
              onChange={setQuantity}
              label={product.name}
            />
            <button
              type="button"
              className="btn btn--primary"
              data-product-id={product.id}
              data-product-name={product.name}
              onClick={onAdd}
            >
              {added ? 'Added to cart' : 'Add to cart'}
            </button>
          </div>
          <ul className="details">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="section">
          <div className="section-head">
            <h2>Also in {category?.name.toLowerCase()}</h2>
            <Link to={buildShopPath({ category: product.category })}>See all</Link>
          </div>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
