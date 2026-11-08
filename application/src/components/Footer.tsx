import { Link } from 'react-router-dom'
import { categories } from '../data/products'
import { buildShopPath } from '../lib/shop'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <p className="brand brand--footer">Northroom</p>
          <p className="footer__note">
            Furniture, lighting, and textiles for rooms that get used every day.
            This is a demo storefront. Orders stay in your browser and are not fulfilled.
          </p>
        </div>
        <div>
          <h2>Shop</h2>
          <ul>
            <li>
              <Link to="/shop">All products</Link>
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link to={buildShopPath({ category: category.slug })}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Help</h2>
          <ul>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
            <li>Ships in 3–5 days on in-stock pieces</li>
            <li>Questions: hello@northroom.example</li>
          </ul>
        </div>
      </div>
      <div className="wrap footer__base">
        <span>© {new Date().getFullYear()} Northroom</span>
        <span>Demo store · no payment processed</span>
      </div>
    </footer>
  )
}
