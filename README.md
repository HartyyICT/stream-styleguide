# Stream Design System

Documentation for the Stream Software design foundations. The application
contains shared tokens, light and dark themes, accessibility guidance and
examples for consistent enterprise interfaces.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run check
```

This runs ESLint, TypeScript and the optimized Next.js production build.

## Project structure

- `packages/ui-library/src/theme` - shared design tokens and MUI theme configuration
- `packages/ui-library/src/components` - reusable product components grouped by purpose
- `src/app/components/documentation` - reusable styleguide-only documentation components
- `src/app/components/examples` - interactive previews used only by the styleguide
- `src/app/components/layout` - the styleguide application shell
- `src/app/components/molecules` - local navigation and search composition
- `src/app/components/organisms` - larger styleguide-only interface sections
- `src/views` - content for each documentation page
- `src/app/(routes)` - grouped Next.js routes

All shared visual values must come from `packages/ui-library/src/theme/tokens.ts`.
