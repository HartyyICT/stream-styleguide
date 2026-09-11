"use client";

import { Box, Typography } from "@mui/material";
import { KeyRound, LogIn, Route, ShieldCheck } from "lucide-react";
import {
  Alert,
  Button,
  Card,
  LoginPage,
  radius,
  spacing,
  useSemanticColors,
} from "@ssw/ui-library";
import { MicrosoftMark, StreamLogo } from "@/app/components/layout/StreamBrand";

export function AuthenticationLoginExample({ sessionExpired = false }: { sessionExpired?: boolean }) {
  return (
    <LoginPage
      logo={<StreamLogo />}
      title="Welcome back"
      description="Sign in to your account"
      productName="Streamliner Customs"
      productDescription="Simplify customs operations with intelligent consignment and transport management."
      signInAction={
        <Button variant="secondary" size="lg" startIcon={<MicrosoftMark />}>
          Continue with Microsoft
        </Button>
      }
      notice={
        sessionExpired ? (
          <Alert
            severity="warning"
            title="Session expired"
            text="Your session has expired. Please sign in again."
            sx={{ borderRadius: 0 }}
          />
        ) : undefined
      }
      footer={`© ${new Date().getFullYear()} Stream Software. All rights reserved.`}
      sx={{ minHeight: 600 }}
    />
  );
}

const flowSteps = [
  { title: "Route gate", text: "Send logged-out visitors to the login route.", icon: Route },
  { title: "Microsoft sign-in", text: "Start the MSAL redirect from one clear action.", icon: LogIn },
  { title: "Session sync", text: "Process the redirect and expose the signed-in account.", icon: ShieldCheck },
  { title: "API token", text: "Acquire a bearer token silently for protected requests.", icon: KeyRound },
] as const;

export function AuthenticationFlowExample() {
  const { accent, selectedBackground, secondaryText } = useSemanticColors();

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, minmax(0, 1fr))" }, gap: spacing.md }}>
      {flowSteps.map(({ title, text, icon: Icon }, index) => (
        <Card key={title} sx={{ height: "100%" }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              mb: spacing.md,
              display: "grid",
              placeItems: "center",
              color: accent,
              backgroundColor: selectedBackground,
              borderRadius: radius.medium,
            }}
          >
            <Icon size={20} aria-hidden="true" />
          </Box>
          <Typography variant="overline" sx={{ color: accent }}>
            Step {index + 1}
          </Typography>
          <Typography variant="h3" sx={{ mb: spacing.sm }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: secondaryText, lineHeight: 1.7 }}>
            {text}
          </Typography>
        </Card>
      ))}
    </Box>
  );
}
