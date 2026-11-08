import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { OrderSummary } from '../components/OrderSummary'
import { QuantityControl } from '../components/QuantityControl'
import { Steps } from '../components/Steps'
import { useCart } from '../context/CartContext'
import { getProduct } from '../data/products'
import { formatMoney, itemLabel } from '../lib/format'
import { summarize } from '../lib/pricing'

export function CartPage() {
  const { lines, itemCount, setQuantity, removeItem } = useCart()

  useEffect(() => {
    document.title = 'Cart — Northroom'
  }, [])

  const detailed = lines.flatMap((line) => {
    const product = getProduct(line.productId)
    if (!product) return []
    return [{ line, product, lineTotal: product.price * line.quantity }]
  })

  const subtotal = detailed.reduce((sum, item) => sum + item.lineTotal, 0)
  const summary = summarize(subtotal)

  return (
    <div className="wrap page">
      <Steps current="cart" />
      <header className="page-head">
        <p className="eyebrow">Cart</p>
        <h1>Your cart</h1>
        <p>{detailed.length === 0 ? 'Nothing here yet.' : itemLabel(itemCount)}</p>
      </header>

      {detailed.length === 0 ? (
        <div className="empty">
          <h2>Your cart is empty</h2>
          <p>Add a lamp, a chair, or something smaller to start an order.</p>
          <Link className="btn btn--primary" to="/shop">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="split">
          <ul className="cart-list">
            {detailed.map(({ line, product, lineTotal }) => (
              <li key={product.id} className="cart-line">
                <Link to={`/product/${product.id}`} className="cart-line__media">
                  <img src={product.image} alt="" />
                </Link>
                <div className="cart-line__info">
                  <h2>
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h2>
                  <p>{formatMoney(product.price)}</p>
                  <div className="cart-line__actions">
                    <QuantityControl
                      value={line.quantity}
                      onChange={(next) => setQuantity(product.id, next)}
                      label={product.name}
                    />
                    <button
                      type="button"
                      className="text-btn"
                      data-product-id={product.id}
                      onClick={() => removeItem(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="cart-line__total">{formatMoney(lineTotal)}</p>
              </li>
            ))}
          </ul>
          <OrderSummary
            summary={summary}
            action={
              <Link className="btn btn--primary btn--block" to="/checkout">
                Checkout
              </Link>
            }
          />
        </div>
      )}
    </div>
  )
}
