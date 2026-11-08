import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { categories, filterProducts, getCategory } from '../data/products'
import { buildShopPath, parseSort } from '../lib/shop'
import type { SortKey } from '../types'

const sorts: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price, low to high' },
  { value: 'price-desc', label: 'Price, high to low' },
  { value: 'name', label: 'Name' },
]

export function ShopPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const categorySlug = params.get('category') ?? ''
  const sort = parseSort(params.get('sort'))
  const category = getCategory(categorySlug)
  const results = filterProducts({
    q,
    category: category ? category.slug : undefined,
    sort,
  })

  const title = q
    ? `Search: ${q}`
    : category
      ? category.name
      : 'Shop'

  useEffect(() => {
    document.title = `${title} — Northroom`
  }, [title])

  function onSort(next: string) {
    const updated = new URLSearchParams(params)
    if (next === 'featured') updated.delete('sort')
    else updated.set('sort', next)
    setParams(updated)
  }

  return (
    <div className="wrap page">
      <header className="page-head">
        <p className="eyebrow">{q ? 'Search' : 'Shop'}</p>
        <h1>{q ? `Results for “${q.trim()}”` : category ? category.name : 'All products'}</h1>
        <p>
          {q
            ? `${results.length} ${results.length === 1 ? 'piece matches' : 'pieces match'} your search.`
            : category
              ? category.description
              : 'The full collection, from lamps to linen.'}
        </p>
      </header>

      <div className="shop-tools">
        <div className="pills" role="list">
          <Link
            role="listitem"
            to={buildShopPath({ q, sort })}
            className={!category ? 'pill is-active' : 'pill'}
          >
            All
          </Link>
          {categories.map((item) => (
            <Link
              key={item.slug}
              role="listitem"
              to={buildShopPath({ q, category: item.slug, sort })}
              className={category?.slug === item.slug ? 'pill is-active' : 'pill'}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <label className="sort">
          <span className="sr-only">Sort products</span>
          <select value={sort} onChange={(event) => onSort(event.target.value)}>
            {sorts.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {results.length === 0 ? (
        <div className="empty">
          <h2>No pieces match</h2>
          <p>Try a different word, or look through the full collection.</p>
          <Link className="btn btn--primary" to="/shop">
            Clear search
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
