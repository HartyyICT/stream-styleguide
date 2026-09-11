export const authenticationCookieName = "auth";

function secureAttribute() {
  return window.location.protocol === "https:" ? "; Secure" : "";
}

export function hasAuthenticationCookie() {
  return document.cookie
    .split(";")
    .some((cookie) => cookie.trim() === `${authenticationCookieName}=1`);
}

export function setAuthenticationCookie() {
  document.cookie = `${authenticationCookieName}=1; Path=/; SameSite=Lax${secureAttribute()}`;
}

export function clearAuthenticationCookie() {
  document.cookie = `${authenticationCookieName}=; Path=/; SameSite=Lax; Max-Age=0${secureAttribute()}`;
}
