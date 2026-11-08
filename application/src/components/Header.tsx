import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { categories } from '../data/products'
import { buildShopPath } from '../lib/shop'
import { itemLabel } from '../lib/format'

export function Header() {
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setQuery(params.get('q') ?? '')
  }, [params])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!menuOpen) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate(buildShopPath({ q: query }))
  }

  const category = params.get('category')
  const onShop = location.pathname === '/shop'

  return (
    <header className="header">
      <div className="header__bar">
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        <Link to="/" className="brand">
          <span className="brand__mark" aria-hidden="true">
            N
          </span>
          Northroom
        </Link>

        <nav className="primary-nav" aria-label="Primary">
          <Link
            to="/shop"
            className={onShop && !category ? 'nav-link is-active' : 'nav-link'}
            aria-current={onShop && !category ? 'page' : undefined}
          >
            Shop
          </Link>
          {categories.map((item) => {
            const active = onShop && category === item.slug
            return (
              <Link
                key={item.slug}
                to={buildShopPath({ category: item.slug })}
                className={active ? 'nav-link is-active' : 'nav-link'}
                aria-current={active ? 'page' : undefined}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <form className="search" role="search" onSubmit={onSearch}>
          <label className="sr-only" htmlFor="site-search">
            Search products
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            placeholder="Search the shop"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <Link
          to="/cart"
          className="cart-link"
          aria-label={`Cart, ${itemLabel(itemCount)}`}
        >
          Cart
          <span className="cart-count" aria-hidden="true">
            {itemCount}
          </span>
        </Link>
      </div>

      <nav
        id="mobile-nav"
        className={menuOpen ? 'mobile-nav is-open' : 'mobile-nav'}
        aria-label="Mobile"
        hidden={!menuOpen}
      >
        <Link to="/shop" aria-current={onShop && !category ? 'page' : undefined}>
          Shop all
        </Link>
        {categories.map((item) => (
          <Link
            key={item.slug}
            to={buildShopPath({ category: item.slug })}
            aria-current={onShop && category === item.slug ? 'page' : undefined}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  )
}
