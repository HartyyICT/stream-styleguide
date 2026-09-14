"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import type { AccountInfo } from "@azure/msal-browser";
import { InteractionStatus } from "@azure/msal-browser";
import {
  MsalProvider,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import { usePathname, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { spacing, useSemanticColors } from "@ssw/ui-library";
import {
  authenticationConfigured,
  authenticationEnabled,
  authenticationEnvironment,
} from "./config";
import {
  clearAuthenticationCookie,
  hasAuthenticationCookie,
  setAuthenticationCookie,
} from "./cookie";
import { msalInstance } from "./msalInstance";

interface AuthenticationContextValue {
  enabled: boolean;
  configured: boolean;
  authenticated: boolean;
  initializing: boolean;
  account: AccountInfo | null;
  signOut: () => Promise<void>;
}

const unavailableAuthentication: AuthenticationContextValue = {
  enabled: authenticationEnabled,
  configured: authenticationConfigured,
  authenticated: !authenticationEnabled,
  initializing: false,
  account: null,
  signOut: () => Promise.resolve(),
};

const AuthenticationContext = createContext<AuthenticationContextValue>(
  unavailableAuthentication,
);

export function useAuthentication() {
  return useContext(AuthenticationContext);
}

function AuthenticationLoading() {
  const { secondaryText } = useSemanticColors();

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "grid", justifyItems: "center", gap: spacing.md }}>
        <CircularProgress size={28} />
        <Typography variant="body2" sx={{ color: secondaryText }}>
          Checking your session…
        </Typography>
      </Box>
    </Box>
  );
}

function AuthenticationSession({ children }: PropsWithChildren) {
  const { instance, accounts, inProgress } = useMsal();
  const authenticated = useIsAuthenticated();
  // `trailingSlash` is on for the static export, so usePathname() returns
  // "/login/". Normalize it before comparing, or the login page counts as a
  // protected route and renders the loading state forever.
  const pathname = usePathname().replace(/\/+$/, "") || "/";
  const router = useRouter();
  const account = accounts[0] ?? null;
  const initializing = inProgress !== InteractionStatus.None;

  useEffect(() => {
    if (initializing) {
      return;
    }

    if (authenticated) {
      setAuthenticationCookie();

      if (pathname === "/login") {
        router.replace("/");
      }

      return;
    }

    if (pathname !== "/login") {
      if (hasAuthenticationCookie()) {
        sessionStorage.setItem("sessionExpired", "true");
      }

      clearAuthenticationCookie();
      router.replace("/login");
    }
  }, [authenticated, initializing, pathname, router]);

  const signOut = useCallback(async () => {
    clearAuthenticationCookie();
    await instance.logoutRedirect({
      account: account ?? undefined,
      postLogoutRedirectUri: authenticationEnvironment.postLogoutRedirectUri,
    });
  }, [account, instance]);

  const value = useMemo<AuthenticationContextValue>(
    () => ({
      enabled: true,
      configured: true,
      authenticated,
      initializing,
      account,
      signOut,
    }),
    [account, authenticated, initializing, signOut],
  );

  const protectedRoute = pathname !== "/login";

  return (
    <AuthenticationContext.Provider value={value}>
      {protectedRoute && (initializing || !authenticated) ? (
        <AuthenticationLoading />
      ) : (
        children
      )}
    </AuthenticationContext.Provider>
  );
}

export default function AuthenticationProvider({
  children,
}: PropsWithChildren) {
  if (!authenticationConfigured || !msalInstance) {
    return (
      <AuthenticationContext.Provider value={unavailableAuthentication}>
        {children}
      </AuthenticationContext.Provider>
    );
  }

  return (
    <MsalProvider instance={msalInstance}>
      <AuthenticationSession>{children}</AuthenticationSession>
    </MsalProvider>
  );
}
