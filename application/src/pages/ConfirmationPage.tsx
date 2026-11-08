import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Steps } from '../components/Steps'
import { formatDate, formatMoney } from '../lib/format'
import { getOrder } from '../lib/orders'

export function ConfirmationPage() {
  const { orderId } = useParams()
  const order = orderId ? getOrder(orderId) : undefined

  useEffect(() => {
    document.title = order ? `Order ${order.id} — Northroom` : 'Order not found — Northroom'
  }, [order])

  if (!order) {
    return (
      <div className="wrap page">
        <div className="empty">
          <h1>Order not found</h1>
          <p>That confirmation isn’t available in this browser session.</p>
          <Link className="btn btn--primary" to="/shop">
            Return to the shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="wrap page">
      <Steps current="confirmation" />
      <header className="page-head">
        <p className="eyebrow">Order confirmed</p>
        <h1>Thank you, {order.shipping.fullName.split(' ')[0]}.</h1>
        <p>
          Order <strong>{order.id}</strong> was placed {formatDate(order.placedAt)}. A receipt would
          go to {order.shipping.email}. Nothing was charged.
        </p>
      </header>

      <div className="split">
        <section>
          <h2>Items</h2>
          <ul className="cart-list">
            {order.lines.map((line) => (
              <li key={line.productId} className="cart-line">
                <Link to={`/product/${line.productId}`} className="cart-line__media">
                  <img src={line.image} alt="" />
                </Link>
                <div className="cart-line__info">
                  <h2>
                    <Link to={`/product/${line.productId}`}>{line.name}</Link>
                  </h2>
                  <p>
                    {formatMoney(line.price)} · Qty {line.quantity}
                  </p>
                </div>
                <p className="cart-line__total">{formatMoney(line.price * line.quantity)}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="summary">
          <h2>Shipping to</h2>
          <address>
            {order.shipping.fullName}
            <br />
            {order.shipping.address}
            {order.shipping.apartment ? `, ${order.shipping.apartment}` : ''}
            <br />
            {order.shipping.city}, {order.shipping.region} {order.shipping.postalCode}
            <br />
            {order.shipping.country}
          </address>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatMoney(order.subtotal)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>{order.shippingCost === 0 ? 'Free' : formatMoney(order.shippingCost)}</dd>
            </div>
            <div>
              <dt>Tax</dt>
              <dd>{formatMoney(order.tax)}</dd>
            </div>
            <div className="summary__total">
              <dt>Total</dt>
              <dd>{formatMoney(order.total)}</dd>
            </div>
          </dl>
          <Link className="btn btn--primary btn--block" to="/shop">
            Continue shopping
          </Link>
        </section>
      </div>
    </div>
  )
}
