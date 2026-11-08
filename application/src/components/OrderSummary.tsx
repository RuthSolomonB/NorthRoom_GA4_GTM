import type { ReactNode } from 'react'
import { formatMoney } from '../lib/format'
import { FREE_SHIPPING_AT, type PriceSummary } from '../lib/pricing'

export function OrderSummary({
  summary,
  action,
}: {
  summary: PriceSummary
  action?: ReactNode
}) {
  const remainder = Math.max(0, FREE_SHIPPING_AT - summary.subtotal)
  return (
    <aside className="summary">
      <h2>Order summary</h2>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatMoney(summary.subtotal)}</dd>
        </div>
        <div>
          <dt>Shipping</dt>
          <dd>{summary.shipping === 0 ? 'Free' : formatMoney(summary.shipping)}</dd>
        </div>
        <div>
          <dt>Tax</dt>
          <dd>{formatMoney(summary.tax)}</dd>
        </div>
        <div className="summary__total">
          <dt>Total</dt>
          <dd>{formatMoney(summary.total)}</dd>
        </div>
      </dl>
      {summary.subtotal > 0 && remainder > 0 ? (
        <p className="summary__hint">
          Add {formatMoney(remainder)} for complimentary shipping.
        </p>
      ) : null}
      {summary.subtotal >= FREE_SHIPPING_AT ? (
        <p className="summary__hint">Complimentary shipping applied.</p>
      ) : null}
      {action}
    </aside>
  )
}
