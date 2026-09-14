# Stream Design System

Documentation for the Stream Software design foundations. The application
contains shared tokens, light and dark themes, accessibility guidance and
examples for consistent enterprise interfaces.

## Development

```bash
npm install
cp .env.example .env.local
npm run build --workspace=@ssw/ui-library
npm run dev
```

Open `http://localhost:3000`.

The two middle steps are easy to miss after a fresh clone, because git carries
neither file:

- `.env.local` holds the Azure AD configuration. `.env*` is gitignored, so copy
  it from `.env.example` on every machine. Without it the login page reports
  that authentication is not configured.
- `packages/ui-library/dist/` is gitignored as well. Without it, imports from
  `@ssw/ui-library` fail to resolve.

## Deployment

The site deploys to Azure Static Web Apps as a static export
(`next.config.ts` sets `output: "export"`), driven by `azure-pipelines.yml` on
every push to `main`.

There is no server: route protection is client-side in
`src/core/auth/AuthenticationProvider.tsx`, and security headers plus the
Content-Security-Policy come from `public/staticwebapp.config.json`. Because the
policy is served as a static file it cannot use a per-request nonce, so
`script-src` falls back to `'unsafe-inline'`.

All `NEXT_PUBLIC_*` values are inlined by `next build`, not read at runtime, so
they must be set as pipeline variables — setting them on the host after the
build has no effect.

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
