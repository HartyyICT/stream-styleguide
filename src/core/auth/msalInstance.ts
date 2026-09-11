import { PublicClientApplication } from "@azure/msal-browser";
import { authenticationConfigured, msalConfig } from "./config";

export const msalInstance = authenticationConfigured
  ? new PublicClientApplication(msalConfig)
  : null;

let initialization: Promise<void> | null = null;

export function ensureMsalInitialized() {
  if (!msalInstance) {
    return Promise.resolve();
  }

  if (!initialization) {
    initialization = msalInstance.initialize().then(async () => {
      await msalInstance.handleRedirectPromise();
    });
  }

  return initialization;
}
