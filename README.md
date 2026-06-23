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

- `src/app/theme` - design tokens and MUI theme configuration
- `src/app/components` - application layout and navigation
- `src/app/components/documentation` - reusable documentation components
- `src/views` - content for each design-foundation page
- `src/app/*/page.tsx` - Next.js routes

All visual color values must be defined in `src/app/theme/tokens.ts`.
