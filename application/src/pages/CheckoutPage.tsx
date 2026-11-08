import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { OrderSummary } from '../components/OrderSummary'
import { Steps } from '../components/Steps'
import { useCart } from '../context/CartContext'
import { getProduct } from '../data/products'
import { formatMoney } from '../lib/format'
import { createOrderId, saveOrder } from '../lib/orders'
import { summarize } from '../lib/pricing'
import type { ShippingInfo } from '../types'

const emptyShipping: ShippingInfo = {
  fullName: '',
  email: '',
  address: '',
  apartment: '',
  city: '',
  region: '',
  postalCode: '',
  country: 'United States',
}

const countries = ['United States', 'Canada', 'United Kingdom']

type FieldName = keyof ShippingInfo

const fields: { name: FieldName; label: string; type?: string; autoComplete: string; optional?: boolean }[] = [
  { name: 'fullName', label: 'Full name', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'address', label: 'Street address', autoComplete: 'address-line1' },
  { name: 'apartment', label: 'Apartment, suite', autoComplete: 'address-line2', optional: true },
  { name: 'city', label: 'City', autoComplete: 'address-level2' },
  { name: 'region', label: 'State / region', autoComplete: 'address-level1' },
  { name: 'postalCode', label: 'Postal code', autoComplete: 'postal-code' },
]

function validate(values: ShippingInfo): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {}
  if (!values.fullName.trim()) errors.fullName = 'Enter the recipient’s name.'
  if (!values.email.trim()) errors.email = 'Enter an email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!values.address.trim()) errors.address = 'Enter a street address.'
  if (!values.city.trim()) errors.city = 'Enter a city.'
  if (!values.region.trim()) errors.region = 'Enter a state or region.'
  if (!values.postalCode.trim()) errors.postalCode = 'Enter a postal code.'
  if (!values.country.trim()) errors.country = 'Choose a country.'
  return errors
}

export function CheckoutPage() {
  const { lines, clear } = useCart()
  const navigate = useNavigate()
  const [shipping, setShipping] = useState<ShippingInfo>(emptyShipping)
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [attempted, setAttempted] = useState(false)
  const [placed, setPlaced] = useState(false)

  useEffect(() => {
    document.title = 'Checkout — Northroom'
  }, [])

  useEffect(() => {
    if (attempted) setErrors(validate(shipping))
  }, [attempted, shipping])

  const detailed = lines.flatMap((line) => {
    const product = getProduct(line.productId)
    if (!product) return []
    return [{ line, product, lineTotal: product.price * line.quantity }]
  })

  if (detailed.length === 0) {
    if (placed) return null
    return <Navigate to="/cart" replace />
  }

  const summary = summarize(detailed.reduce((sum, item) => sum + item.lineTotal, 0))

  function update(name: FieldName, value: string) {
    setShipping((current) => ({ ...current, [name]: value }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)
    const nextErrors = validate(shipping)
    setErrors(nextErrors)
    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0]
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      return
    }

    const orderId = createOrderId()
    setPlaced(true)
    saveOrder({
      id: orderId,
      placedAt: new Date().toISOString(),
      shipping: {
        ...shipping,
        fullName: shipping.fullName.trim(),
        email: shipping.email.trim(),
        address: shipping.address.trim(),
        apartment: shipping.apartment.trim(),
        city: shipping.city.trim(),
        region: shipping.region.trim(),
        postalCode: shipping.postalCode.trim(),
      },
      lines: detailed.map(({ line, product }) => ({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: line.quantity,
        image: product.image,
      })),
      subtotal: summary.subtotal,
      shippingCost: summary.shipping,
      tax: summary.tax,
      total: summary.total,
    })
    clear()
    navigate(`/order/${orderId}`)
  }

  return (
    <div className="wrap page">
      <Steps current="shipping" />
      <header className="page-head">
        <p className="eyebrow">Checkout</p>
        <h1>Shipping information</h1>
        <p>This checkout is a simulation. No payment is collected and no order is sent.</p>
      </header>

      <div className="split">
        <form className="checkout-form" onSubmit={onSubmit} noValidate>
          <div className="form-grid">
            {fields.map((field) => (
              <label
                key={field.name}
                className={
                  field.name === 'address' ||
                  field.name === 'apartment' ||
                  field.name === 'email' ||
                  field.name === 'fullName'
                    ? 'field field--wide'
                    : 'field'
                }
                htmlFor={field.name}
              >
                <span>
                  {field.label}
                  {field.optional ? <em> Optional</em> : null}
                </span>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type ?? 'text'}
                  autoComplete={field.autoComplete}
                  value={shipping[field.name]}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                  onChange={(event) => update(field.name, event.target.value)}
                />
                {errors[field.name] ? (
                  <small id={`${field.name}-error`}>{errors[field.name]}</small>
                ) : null}
              </label>
            ))}
            <label className="field" htmlFor="country">
              <span>Country</span>
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                value={shipping.country}
                aria-invalid={Boolean(errors.country)}
                onChange={(event) => update('country', event.target.value)}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country ? <small id="country-error">{errors.country}</small> : null}
            </label>
          </div>

          <div className="callout">
            <strong>Payment</strong>
            <p>Demo payment. Nothing will be charged. Use any shipping details you like.</p>
          </div>

          <button type="submit" className="btn btn--primary" data-checkout="place-order">
            Place order · {formatMoney(summary.total)}
          </button>
          <Link className="text-link" to="/cart">
            Return to cart
          </Link>
        </form>

        <OrderSummary summary={summary} />
      </div>
    </div>
  )
}
