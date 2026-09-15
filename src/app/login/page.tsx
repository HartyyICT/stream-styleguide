"use client";

import { Alert, Button, LoginPage } from "@ssw/design-system";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { MicrosoftMark, StreamLogo } from "@/app/components/layout/StreamBrand";
import { useAuthentication } from "@/core/auth/AuthenticationProvider";
import { loginRequest } from "@/core/auth/config";
import { clearAuthenticationCookie } from "@/core/auth/cookie";

function LoginLayout({
  action,
  notice,
}: {
  action: React.ReactNode;
  notice?: React.ReactNode;
}) {
  return (
    <LoginPage
      logo={<StreamLogo />}
      title="Welcome back"
      description="Sign in to your account"
      productName="Stream Design System"
      productDescription="One shared foundation for consistent Stream Software applications."
      signInAction={action}
      notice={notice}
      footer={`© ${new Date().getFullYear()} Stream Software. All rights reserved.`}
    />
  );
}

function MicrosoftLogin() {
  const { instance } = useMsal();
  const authenticated = useIsAuthenticated();
  const { initializing } = useAuthentication();
  const [sessionExpired, setSessionExpired] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("sessionExpired") === "true") {
      sessionStorage.removeItem("sessionExpired");
      const frame = window.requestAnimationFrame(() => setSessionExpired(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  async function signIn() {
    clearAuthenticationCookie();
    setRedirecting(true);
    setError(false);

    try {
      await instance.loginRedirect(loginRequest);
    } catch {
      setRedirecting(false);
      setError(true);
    }
  }

  const notice = error ? (
    <Alert
      severity="error"
      title="Sign-in failed"
      text="Microsoft sign-in could not be started. Please try again."
      sx={{ borderRadius: 0 }}
    />
  ) : sessionExpired ? (
    <Alert
      severity="warning"
      title="Session expired"
      text="Your session has expired. Please sign in again."
      sx={{ borderRadius: 0 }}
    />
  ) : undefined;

  return (
    <LoginLayout
      notice={notice}
      action={
        <Button
          variant="secondary"
          size="lg"
          startIcon={<MicrosoftMark />}
          loading={redirecting || initializing || authenticated}
          onClick={signIn}
        >
          Continue with Microsoft
        </Button>
      }
    />
  );
}

export default function Login() {
  const { enabled, configured } = useAuthentication();

  if (!enabled) {
    return (
      <LoginLayout
        notice={
          <Alert
            severity="info"
            title="Authentication is disabled"
            text="Set NEXT_PUBLIC_AUTH_ENABLED to true to protect the styleguide."
            sx={{ borderRadius: 0 }}
          />
        }
        action={
          <Button variant="secondary" size="lg" disabled>
            Continue with Microsoft
          </Button>
        }
      />
    );
  }

  if (!configured) {
    return (
      <LoginLayout
        notice={
          <Alert
            severity="error"
            title="Authentication is not configured"
            text="Add the required Azure environment variables before signing in."
            sx={{ borderRadius: 0 }}
          />
        }
        action={
          <Button variant="secondary" size="lg" disabled>
            Continue with Microsoft
          </Button>
        }
      />
    );
  }

  return <MicrosoftLogin />;
}
