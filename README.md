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
- `src/app/components/atoms` - smallest reusable UI building blocks
- `src/app/components/molecules` - combined components such as fields, navigation items and toolbars
- `src/app/components/organisms` - larger interface sections such as the navbar, sidebar, search modal and sandbox examples
- `src/app/components/patterns` - reusable documentation patterns such as code examples and page navigation
- `src/views` - content for each documentation page
- `src/app/(routes)` - grouped Next.js routes

All visual color values must be defined in `src/app/theme/tokens.ts`.
