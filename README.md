
# Barbora portfolio – starter project

This is a starter Next.js + Sanity project for your portfolio at `barborasatranska.cz`.

It contains:
- Next.js app router structure with EN and CZ segments
- Fixed sidebar layout
- Project grid with a single active filter via URL query `?category=...`
- Basic Sanity schemas for:
  - projects (EN only)
  - products (EN + CZ)
  - about (EN + CZ)
  - contact (EN + CZ)

## 1. Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
```

## 2. Create a Sanity project

If you don't have the Sanity CLI:

```bash
npm install -g sanity@latest
```

Then:

```bash
cd sanity
sanity init
```

- Choose "use existing config" or update `sanity.config.ts` with your projectId and dataset.
- Copy your `projectId` and `dataset` into `.env.local` in the root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
```

## 3. Add your Creatura font files

In this starter, the global CSS still uses system fonts.

To use Creatura:

1. Put your webfont files (e.g. `creatura-book.woff2`, `creatura-press1.woff2`) into a `fonts/` folder.
2. Update `app/globals.css` or create a dedicated font CSS with `@font-face` declarations.
3. Replace `font-family` usages (e.g. in `Sidebar`) to use your Creatura font family name.

For example:

```css
@font-face {
  font-family: "Creatura Book";
  src: url("/fonts/creatura-book.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}
```

## 4. Run the dev server

From the project root:

```bash
npm run dev
```

Then open:

- EN: http://localhost:3000/(en)
- CZ: http://localhost:3000/(cz)/about (for the Czech-only pages)

## 5. How filtering works

- The sidebar links point to `/(en)?category=...` (or `/(cz)?category=...`).
- `ProjectGrid` reads `?category=` from the URL and filters the mock project list.
- Later you (or a developer) can replace the mock array with a real query to Sanity.

## 6. Next steps

- Replace the placeholder text in pages with components that fetch real data from Sanity.
- Style the layout (colors, spacing, typography) to match your Figma / visual references.
- Connect your domain on Vercel and update DNS A/CNAME records at WEDOS.

This starter is not a finished site but a solid technical base to build your custom portfolio with EN/CZ logic, single active filter, and a request-based shop.
