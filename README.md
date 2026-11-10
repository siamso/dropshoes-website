# Dropshoes

A small-batch shoe store built with [Astro](https://astro.build) and SCSS.

## Pages

| Route          | What it is                                              |
| :------------- | :------------------------------------------------------ |
| `/`            | Home: season headline, categories, fresh drops, story   |
| `/shop`        | All products, with category filter and price sort       |
| `/shop/[slug]` | Product page with size picker and add to cart           |
| `/collection`  | The lookbook                                            |
| `/about`       | Brand story, shipping, returns and sizing               |
| `/checkout`    | Demo checkout (no payment provider connected)           |
| `/404`         | Not found                                               |

## Where things live

```text
src/
├── assets/images/   photos and product shots (optimised at build time)
├── components/      Nav, Footer, CartDrawer, ProductCard, CardSlider, TextSlider, BigTitle
├── data/            products.ts (the catalogue) and site.ts (nav, season headline)
├── layouts/         MainLayout and the <head>
├── pages/           one file per route
├── scripts/         cart.ts (localStorage cart) and app.ts (reveals, Ink Mode, tape)
├── styles/          the SCSS system: abstracts, base, components, layout, utilities
└── utilities/       CustomCursor
```

To add or change a product, edit `src/data/products.ts`. To change the season
headline or the nav links, edit `src/data/site.ts`.

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start the dev server at `localhost:4321`    |
| `npm run build`   | Build the production site to `./dist/`      |
| `npm run preview` | Preview the build locally                   |

## Not wired up yet

- The cart is stored in the browser (`localStorage`); checkout is a demo and takes no payment.
- The newsletter form confirms on screen but does not send the address anywhere.
