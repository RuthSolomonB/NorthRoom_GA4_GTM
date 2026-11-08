import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { categories, products } from '../data/products'
import { buildShopPath } from '../lib/shop'

export function HomePage() {
  useEffect(() => {
    document.title = 'Northroom — Objects for quieter rooms'
  }, [])

  const featured = products.filter((product) => product.featured)

  return (
    <>
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Spring collection</p>
          <h1>Rooms with a slower pulse.</h1>
          <p>
            Furniture, lighting, and textiles chosen for the way they wear in over years,
            not seasons.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/shop">
              Shop the collection
            </Link>
            <Link className="btn btn--ghost" to={buildShopPath({ category: 'seating' })}>
              Seating
            </Link>
          </div>
        </div>
        <div className="hero__media">
          <img
            src="/images/hero.jpg"
            alt="Sunlit living room with a low sofa, linen curtains, and a wood floor"
          />
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Shop by room, or by piece</h2>
          <Link to="/shop">Browse all</Link>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={buildShopPath({ category: category.slug })}
              className="category-card"
            >
              <img src={category.image} alt="" />
              <span>
                <strong>{category.name}</strong>
                {category.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>In the room this season</h2>
          <Link to="/shop">View all</Link>
        </div>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="band">
        <div className="wrap band__inner">
          <h2>Built for everyday wear.</h2>
          <ul>
            <li>
              <strong>Honest materials</strong>
              <span>Stone, wood, wool, and metal, finished to be used.</span>
            </li>
            <li>
              <strong>Natural fiber</strong>
              <span>Wool and cotton that soften with washing.</span>
            </li>
            <li>
              <strong>Repairable</strong>
              <span>Shades, cushions, and hardware can be replaced.</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
