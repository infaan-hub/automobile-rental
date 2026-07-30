import { CUSTOMER_TOKEN_KEY } from "./config";

const CUSTOMER_RENTAL_KEY = "automobile-rental-customer-rental";

export function getCustomerToken() {
  return window.localStorage.getItem(CUSTOMER_TOKEN_KEY) || "";
}

export function isCustomerLoggedIn() {
  return Boolean(getCustomerToken());
}

export function saveRentalDraft(payload) {
  window.localStorage.setItem(CUSTOMER_RENTAL_KEY, JSON.stringify(payload));
}

export function getRentalDraft() {
  try {
    return JSON.parse(window.localStorage.getItem(CUSTOMER_RENTAL_KEY) || "null");
  } catch {
    return null;
  }
}

export function clearRentalDraft() {
  window.localStorage.removeItem(CUSTOMER_RENTAL_KEY);
}
