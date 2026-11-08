import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page not found — Northroom'
  }, [])

  return (
    <div className="wrap page">
      <div className="empty">
        <p className="eyebrow">404</p>
        <h1>That page isn’t here</h1>
        <p>The link may be out of date. The shop is a good place to start again.</p>
        <Link className="btn btn--primary" to="/">
          Back home
        </Link>
      </div>
    </div>
  )
}
