import type { Configuration, RedirectRequest } from "@azure/msal-browser";

const clientId = process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID?.trim() ?? "";
const authority =
  process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ENDPOINT?.trim() ?? "";
const redirectUri =
  process.env.NEXT_PUBLIC_AZURE_AD_REDIRECT_URI?.trim() ?? "";
const postLogoutRedirectUri =
  process.env.NEXT_PUBLIC_AZURE_AD_POST_LOGOUT_REDIRECT_URI?.trim() ||
  redirectUri;
const configuredScopes =
  process.env.NEXT_PUBLIC_AZURE_AD_LOGIN_SCOPES?.split(",")
    .map((scope) => scope.trim())
    .filter(Boolean) ?? [];

export const authenticationEnabled =
  process.env.NEXT_PUBLIC_AUTH_ENABLED !== "false";

export const authenticationConfigured =
  authenticationEnabled && Boolean(clientId && authority && redirectUri);

export const authenticationEnvironment = {
  clientId,
  authority,
  redirectUri,
  postLogoutRedirectUri,
} as const;

export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority,
    redirectUri,
    postLogoutRedirectUri,
  },
  cache: {
    cacheLocation: "localStorage",
  },
};

export const loginRequest: RedirectRequest = {
  scopes:
    configuredScopes.length > 0
      ? configuredScopes
      : ["openid", "profile", "email"],
};
