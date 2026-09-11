"use client";

import { Box, Typography } from "@mui/material";
import {
  Alert,
  Card,
  pageLayoutTokens,
  spacing,
  useSemanticColors,
} from "@ssw/ui-library";
import {
  CodeExample,
  GuidelineList,
  Intro,
  Section,
} from "@/app/components/documentation";
import {
  AuthenticationFlowExample,
  AuthenticationLoginExample,
} from "@/app/components/examples";
import Page from "@/app/components/layout/Page";

const sections = [
  { label: "Overview", href: "#authentication" },
  { label: "Enable authentication", href: "#enable-authentication" },
  { label: "Login page", href: "#login-page" },
  { label: "Session expired", href: "#session-expired" },
  { label: "Authentication flow", href: "#auth-flow" },
  { label: "Route protection", href: "#route-protection" },
  { label: "API tokens", href: "#api-tokens" },
  { label: "Sign out", href: "#sign-out" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Security", href: "#security" },
] as const;

const environmentCode = `NEXT_PUBLIC_AUTH_ENABLED=true
NEXT_PUBLIC_AZURE_AD_CLIENT_ID=your-client-id
NEXT_PUBLIC_AZURE_AD_TENANT_ENDPOINT=https://login.microsoftonline.com/your-tenant-id
NEXT_PUBLIC_AZURE_AD_REDIRECT_URI=http://localhost:3000/login
NEXT_PUBLIC_AZURE_AD_POST_LOGOUT_REDIRECT_URI=http://localhost:3000/login
NEXT_PUBLIC_AZURE_AD_LOGIN_SCOPES=openid,profile,email`;

const loginPageCode = `import { Button, LoginPage } from "@ssw/ui-library";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

export default function Login() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  function signIn() {
    document.cookie = "auth=; path=/; Secure; SameSite=Lax; Max-Age=0";
    void instance.loginRedirect();
  }

  return (
    <LoginPage
      logo={<StreamLogo />}
      title="Welcome back"
      description="Sign in to your account"
      productName="Streamliner Customs"
      productDescription="Simplify your customs operations."
      signInAction={
        <Button variant="secondary" size="lg" onClick={signIn}>
          Continue with Microsoft
        </Button>
      }
      footer={\`© \${new Date().getFullYear()} Stream Software\`}
    />
  );
}`;

const sessionExpiredCode = `const [sessionExpired, setSessionExpired] = useState(false);

useEffect(() => {
  if (sessionStorage.getItem("sessionExpired") === "true") {
    setSessionExpired(true);
    sessionStorage.removeItem("sessionExpired");
  }
}, []);

<LoginPage
  notice={
    sessionExpired ? (
      <Alert
        severity="warning"
        title="Session expired"
        text="Your session has expired. Please sign in again."
      />
    ) : undefined
  }
  {...loginPageProps}
/>`;

const providerCode = `import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useIsAuthenticated } from "@azure/msal-react";

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,
    authority: process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ENDPOINT!,
    redirectUri: process.env.NEXT_PUBLIC_AZURE_AD_REDIRECT_URI!,
  },
  cache: { cacheLocation: "localStorage" },
});

let initialization: Promise<void> | null = null;

export function ensureMsalInitialized() {
  if (!initialization) {
    initialization = msalInstance.initialize().then(async () => {
      await msalInstance.handleRedirectPromise();
    });
  }

  return initialization;
}

function AuthSync() {
  const authenticated = useIsAuthenticated();

  useEffect(() => {
    if (authenticated) document.cookie = "auth=1; path=/; Secure; SameSite=Lax";
  }, [authenticated]);

  return null;
}

export function AuthenticationProvider({ children }) {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthSync />
      {children}
    </MsalProvider>
  );
}`;

const middlewareCode = `import { NextResponse } from "next/server";

export function authMiddleware(request) {
  const path = request.nextUrl.pathname;
  const callback = request.nextUrl.search.includes("code=") &&
    request.nextUrl.search.includes("state=");

  if (callback || path.startsWith("/_next") || path.startsWith("/api")) return null;

  const authenticated = request.cookies.get("auth")?.value === "1";
  const loginPage = path.startsWith("/login");

  if (!authenticated && !loginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authenticated && loginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return null;
}`;

const tokenCode = `import {
  CacheLookupPolicy,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { ensureMsalInitialized, msalInstance } from "./msalInstance";

export async function acquireAccessToken(scope) {
  await ensureMsalInitialized();
  const account = msalInstance.getAllAccounts()[0];
  if (!account) return null;

  try {
    const result = await msalInstance.acquireTokenSilent({
      scopes: [scope],
      account,
      cacheLookupPolicy: CacheLookupPolicy.AccessTokenAndRefreshToken,
    });

    return result.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      document.cookie = "auth=; path=/; Secure; SameSite=Lax; Max-Age=0";
      sessionStorage.setItem("sessionExpired", "true");
      await msalInstance.clearCache();
      window.location.assign("/login");
    }

    throw error;
  }
}`;

const signOutCode = `function signOut() {
  document.cookie = "auth=; path=/; Secure; SameSite=Lax; Max-Age=0";
  void instance.logoutRedirect();
}`;

const guidelines = [
  "Keep LoginPage visual and provider-independent; connect Microsoft, another identity provider or a BFF in application code.",
  "Initialize MSAL once and finish handleRedirectPromise before reading accounts or acquiring tokens.",
  "Keep tenant endpoints, client IDs, redirect URIs and API scopes in environment configuration.",
  "Show the session-expired message from a one-time session flag, not from a query parameter users can manufacture.",
  "Clear the navigation cookie on sign-in, expiry and sign-out before starting a redirect.",
  "Keep the login action a real button with visible focus, an accessible name and a disabled or loading state while redirecting.",
] as const;

const securityGuidelines = [
  "Treat the auth cookie as a navigation hint only. It is client-written and must never be the API authorization boundary.",
  "Validate every bearer token, tenant and permission on the server.",
  "Limit token scopes to the API currently being called and never log access or refresh tokens.",
  "Cassandra uses localStorage so authentication survives new tabs. A BFF with an HttpOnly, Secure cookie provides stronger protection for future applications.",
  "Allow the identity-provider callback through the route gate, but keep static assets and public endpoints explicitly scoped.",
] as const;

export default function AuthenticationPage() {
  const { secondaryText } = useSemanticColors();

  return (
    <Page pageId="authentication" sections={sections} maxWidth={pageLayoutTokens.dataContentMaxWidth}>
      <Intro
        title="Authentication"
        description="Authentication combines a consistent Stream login experience with application-owned identity, route protection, token acquisition, session expiry and sign-out behaviour."
        note="The styleguide uses the minimal MSAL flow from Cassandra when authentication is enabled. The UI package owns only LoginPage; credentials, Microsoft configuration, middleware and token handling stay inside the application."
      />

      <Section
        id="enable-authentication"
        title="Enable authentication"
        description="Register the local and deployed login URLs in Microsoft Entra ID, then provide the application configuration through environment variables."
        divider={false}
      >
        <CodeExample
          title="Environment configuration"
          code={environmentCode}
          preview={null}
        />
      </Section>

      <Section
        id="login-page"
        title="Login page"
        description="LoginPage provides the responsive Stream layout while the application supplies its logo, product copy and identity-provider action."
      >
        <CodeExample
          title="Microsoft sign-in"
          code={loginPageCode}
          preview={<AuthenticationLoginExample />}
          previewMinHeight={600}
        />
      </Section>

      <Section
        id="session-expired"
        title="Session expired"
        description="Set a one-time sessionStorage flag before redirecting. The login page reads and removes it so the warning appears only after a real expiry."
      >
        <CodeExample
          title="Expired session state"
          code={sessionExpiredCode}
          preview={<AuthenticationLoginExample sessionExpired />}
          previewMinHeight={600}
        />
      </Section>

      <Section
        id="auth-flow"
        title="Authentication flow"
        description="The route gate controls navigation, MSAL handles identity, the provider synchronizes client state and protected API calls receive a bearer token."
      >
        <Box sx={{ display: "grid", gap: spacing.lg }}>
          <AuthenticationFlowExample />
          <CodeExample title="MSAL provider" code={providerCode} preview={null} />
        </Box>
      </Section>

      <Section
        id="route-protection"
        title="Route protection"
        description="The middleware redirects visitors for navigation consistency while allowing the Microsoft callback and public application resources through."
      >
        <CodeExample title="Next.js route gate" code={middlewareCode} preview={null} />
      </Section>

      <Section
        id="api-tokens"
        title="API tokens"
        description="Acquire tokens silently from the cached account. When user interaction is required, clear the stale session and return to login with the one-time expiry state."
      >
        <CodeExample title="Silent token acquisition" code={tokenCode} preview={null} />
      </Section>

      <Section
        id="sign-out"
        title="Sign out"
        description="Clear the route-gate cookie before starting the identity-provider logout redirect."
      >
        <CodeExample title="Logout redirect" code={signOutCode} preview={null} />
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="Keep visual consistency in the package and keep authentication policy in the consuming application."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="security"
        title="Security"
        description="Authentication UI can guide navigation, but only server-side validation can authorize data and actions."
        last
      >
        <Box sx={{ display: "grid", gap: spacing.lg }}>
          <Alert
            severity="warning"
            title="The route cookie is not proof of identity"
            text="Cassandra's client-written auth cookie improves routing only. APIs must independently validate the bearer token and permissions."
          />
          <Card>
            <Typography variant="h3" sx={{ mb: spacing.sm }}>
              Protect the complete request path
            </Typography>
            <Typography variant="body2" sx={{ mb: spacing.lg, color: secondaryText, lineHeight: 1.7 }}>
              Apply the same rules to page navigation, API clients, backend endpoints, session expiry and logout so no single browser flag becomes a security boundary.
            </Typography>
            <GuidelineList items={securityGuidelines} />
          </Card>
        </Box>
      </Section>
    </Page>
  );
}
