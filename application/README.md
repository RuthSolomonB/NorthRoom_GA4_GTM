# Northroom

Northroom is a small home-goods storefront used as a local test site for a Google Analytics 4 (GA4) and Google Tag Manager (GTM) project. Shoppers can browse a fixed catalog, search, add items to a cart, and complete a simulated checkout. There is no backend, no database, and no real payment.

The store is a single-page React application. Vite serves it and bundles it. React Router changes the page without a full reload. Product, cart, and order data stay in the browser.

## Repository layout

The git repository has three top-level folders. Only `application/` contains code.

```text
EcommerceStoreGA4/
├── analysis-and-finding/       Empty. Reserved for later analysis notes.
├── analytics-documentation/    Empty. Reserved for later analytics documentation.
└── application/                The Northroom storefront (this folder).
```

## Run the store

From this folder:

```bash
npm install
npm run dev
```

Vite prints a local URL, usually http://localhost:5173. Google’s “test your website” check cannot see localhost, because that check runs on Google’s servers. Use GTM Preview, or the browser Network panel, to confirm the container loads.

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite dev server with hot reload. |
| `npm run build` | Typechecks with `tsc -b`, then writes a production bundle to `dist/`. |
| `npm run preview` | Serves the production bundle locally. |
| `npm run lint` | Runs Oxlint on the source. |

Stack: React 19, React Router 7, TypeScript, Vite 6. Styling is one plain CSS file. There is no CSS framework and no component library.

## What a shopper can do

| URL | Page | Behavior |
| --- | --- | --- |
| `/` | Home | Hero, five category tiles, and featured products. |
| `/shop` | Shop | Every product. Optional `?category=`, `?q=`, and `?sort=`. |
| `/product/:productId` | Product | Photo, price, details, quantity, add to cart, and related products. |
| `/cart` | Cart | Change quantities, remove lines, see the total, continue to checkout. |
| `/checkout` | Checkout | Shipping form and simulated payment. An empty cart redirects to `/cart`. |
| `/order/:orderId` | Confirmation | Order number, items, shipping address, and totals. |
| anything else | Not found | Short message and a link home. |

Search lives in the header. Submitting it opens `/shop?q=...` and matches product name, description, and category name. Category links open `/shop?category=lighting` (or `seating`, `tables`, `textiles`, `decor`). Sort values are `featured` (the default), `price-asc`, `price-desc`, and `name`.

Prices are in US dollars. Tax is 8 percent of the subtotal. Shipping is $15, and it is free when the subtotal is $200 or more. Checkout collects a name, email, street address, optional apartment, city, state or region, postal code, and country (United States, Canada, or United Kingdom). It does not collect a card number. Placing an order clears the cart and opens the confirmation page. The order exists only in `sessionStorage`, so a new browser session cannot open that confirmation again.

Each line quantity is capped at 8. The cart survives reloads. Orders do not.

## How the code is organized

`index.html` is the only HTML document. `src/main.tsx` mounts React into `<div id="root">`. `src/App.tsx` defines the routes and wraps them in the cart provider. Every page shares `Layout`, which renders the announcement bar, header, the current page, and the footer.

```text
application/
├── index.html                  Document shell and the GTM install snippet
├── package.json                Dependencies and npm scripts
├── vite.config.ts              Vite config. Enables the React plugin only.
├── tsconfig.json               Project references for the two configs below
├── tsconfig.app.json           TypeScript settings for src/
├── tsconfig.node.json          TypeScript settings for vite.config.ts
├── .oxlintrc.json              Oxlint rules
├── .gitignore
├── note.txt                    Personal working notes. The app does not import this file.
├── public/
│   ├── favicon.svg
│   └── images/                 Product and hero photos, served as /images/...
└── src/
    ├── main.tsx                React entry point
    ├── App.tsx                 Router and cart provider
    ├── index.css               All visual styling
    ├── types.ts                Shared TypeScript types
    ├── analytics/gtm.ts        dataLayer helper. Not called by the pages yet.
    ├── components/             Shared UI
    ├── context/CartContext.tsx Cart state
    ├── data/products.ts        Static catalog
    ├── lib/                    Small helpers with no UI
    └── pages/                  One file per route
```

`public/` files are copied as-is. A product image path such as `/images/velvet-sofa.jpg` maps to `public/images/velvet-sofa.jpg`. `src/index.css` is global: components use class names, not CSS modules.

### Entry and routing

- `src/main.tsx` renders `<App />` inside `StrictMode` and imports `index.css`.
- `src/App.tsx` wraps the tree in `BrowserRouter` and `CartProvider`. Routes are nested under `Layout`, so the header and footer stay put while the page changes. `product/:productId` and `order/:orderId` are the only dynamic segments.

### Pages (`src/pages/`)

Each page sets `document.title`.

- `HomePage.tsx` shows the hero, category grid, products whose `featured` flag is true, and a short materials section.
- `ShopPage.tsx` reads `q`, `category`, and `sort` from the query string, filters the catalog, and renders a `ProductCard` for each match. An unknown category is ignored. A search with no matches shows an empty state.
- `ProductPage.tsx` looks up the id from the path. Unknown ids show a not-in-the-shop message. The quantity selector starts at 1. Related products are others in the same category, up to three.
- `CartPage.tsx` joins cart lines to products. A stored id that is no longer in the catalog is skipped. The summary includes a checkout link.
- `CheckoutPage.tsx` validates the shipping form on submit, builds an `Order`, saves it, clears the cart, and navigates to `/order/:orderId`. If the cart is already empty, it redirects to `/cart`.
- `ConfirmationPage.tsx` reads the order from `sessionStorage`. A missing id shows “Order not found”.
- `NotFoundPage.tsx` handles unknown paths.

### Shared components (`src/components/`)

- `Layout.tsx` scrolls to the top on pathname changes and renders `Header`, `<Outlet />`, and `Footer`.
- `Header.tsx` holds the logo, category navigation, search form, cart count, and the mobile menu. The active category is derived from the URL, not from React Router’s default active matching.
- `Footer.tsx` repeats shop links and states that orders are not fulfilled.
- `ProductCard.tsx` links to the product page and can add one unit to the cart.
- `QuantityControl.tsx` is the minus / count / plus control. The minimum is 1 and the maximum is 8.
- `Steps.tsx` shows the Cart, Shipping, and Confirmation sequence.
- `OrderSummary.tsx` shows subtotal, shipping, tax, total, and the free-shipping hint.

### State and data

`src/types.ts` defines the shapes used across the app:

- `Product` and `Category` describe the catalog. `CategorySlug` is `lighting`, `seating`, `tables`, `textiles`, or `decor`.
- `CartLine` is a product id plus a quantity. The cart does not copy the product name or price.
- `ShippingInfo`, `OrderLine`, and `Order` describe a placed order. Order lines copy the name, price, and image so the confirmation page does not depend on looking the product up again.
- `SortKey` is the shop sort.

`src/data/products.ts` is the whole catalog: 5 categories and 12 products. Helpers:

- `getCategory` and `isCategorySlug` resolve a category slug.
- `getProduct` finds a product by id.
- `filterProducts` applies search, category, and sort.
- `relatedProducts` returns other products in the same category.

Featured products on the homepage are Studio Floor Lamp ($320), Ivory Tufted Chair ($480), Marble Dining Table ($1,480), Cloud Pillow ($58), and Stoneware Mug ($28). The rest of the catalog is Ceramic Vessel Set ($86), Round Side Table ($160), Brass Dome Pendants ($740), Heirloom Wool Rug ($890), Velvet Sofa ($1,680), Chalk Pendant ($145), and Cloud Cotton Duvet ($210).

`src/context/CartContext.tsx` keeps the cart in React state and mirrors it to `localStorage` under the key `northroom-cart`. `useCart()` exposes `lines`, `itemCount`, `addItem`, `removeItem`, `setQuantity`, and `clear`. `addItem` increases the quantity when the product is already in the cart. Anything outside 1–8 is clamped. The provider must wrap any component that calls `useCart()`. `App.tsx` does that.

### Helpers (`src/lib/`)

- `format.ts`: `formatMoney` (USD), `formatDate`, and `itemLabel` (“1 item” / “3 items”).
- `pricing.ts`: `TAX_RATE` (0.08), `SHIPPING_FLAT` (15), `FREE_SHIPPING_AT` (200), and `summarize(subtotal)`.
- `shop.ts`: `buildShopPath` builds `/shop` URLs, and `parseSort` accepts a query value.
- `orders.ts`: `createOrderId` returns an id like `NR-A1B2C3`. `saveOrder` and `getOrder` use `sessionStorage` under the key `northroom-orders`.

## Google Tag Manager

`index.html` contains the official GTM install for container `GTM-PBCNQF4T`. The bootstrap script is the first element in `<head>`. The `<noscript>` iframe is the first element in `<body>`. That snippet loads on the first page view and stays in place during client-side route changes.

`src/analytics/gtm.ts` declares `window.dataLayer` and exports `pushEvent(event, ecommerce)`. `pushEvent` clears the previous `ecommerce` object, then pushes `{ event, ecommerce }`. No page imports `pushEvent` yet, so browsing, adding to cart, and checkout do not push ecommerce events from React. Tags and triggers for those actions are configured in GTM, not in this repository.

`note.txt` is a scratch pad for the analytics setup. The application never reads it.

## Styling

`src/index.css` holds the design: cream background, dark text, serif headings (Fraunces), and sans-serif body text (Outfit). Fonts are loaded from Google Fonts in `index.html`. The layout is a centered column. Below 980px the category nav collapses into a Menu button. Below 640px the header search moves onto its own row, and cart and checkout stacks become a single column.
