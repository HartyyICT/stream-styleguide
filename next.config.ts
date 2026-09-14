import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The styleguide deploys to Azure Static Web Apps as plain files. Route
  // protection lives in AuthenticationProvider, so no server is needed.
  output: "export",

  // Emits every route as `<route>/index.html` instead of `<route>.html`, which
  // every static host serves as a directory index. Without this the export only
  // writes `<route>.html` and resolving `/borders` would depend on the host
  // guessing the extension.
  //
  // The trade-off is that `usePathname()` then returns "/borders/", so anything
  // comparing it to a href must tolerate the trailing slash.
  trailingSlash: true,
};

export default nextConfig;
