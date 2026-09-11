import { NextResponse, type NextRequest } from "next/server";

const authenticationEnabled =
  process.env.NEXT_PUBLIC_AUTH_ENABLED !== "false";

export function proxy(request: NextRequest) {
  if (!authenticationEnabled) {
    return NextResponse.next();
  }

  const path = request.nextUrl.pathname;
  const callback =
    request.nextUrl.searchParams.has("code") &&
    request.nextUrl.searchParams.has("state");

  if (callback) {
    return NextResponse.next();
  }

  const authenticated = request.cookies.get("auth")?.value === "1";
  const loginPage = path === "/login";

  if (!authenticated && !loginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authenticated && loginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|brand|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
