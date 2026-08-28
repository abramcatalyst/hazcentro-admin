import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { LoginResponseProfileType } from "src/types/auth";
import { IToken } from "src/utils/types";
import {
  baseUrl,
  getAuthToken,
  getProfileFromStorage,
  isAuthTokenExpired,
  removeTokenFromStorage,
  saveTokenToStorage,
  setDefaultHeaders,
} from "src/utils";

export { AUTH_STORAGE_DAYS } from "src/utils";

/** Refresh when the token expires within this window (1 hour). */
const TOKEN_REFRESH_BUFFER_SECONDS = 60 * 60;

type AuthSessionFailureReason = "missing" | "invalid" | "refresh_failed";

export type AuthSessionResult =
  | { ok: true; profile: LoginResponseProfileType }
  | { ok: false; reason: AuthSessionFailureReason };

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<string | null> | null = null;
let sessionExpiredHandler: (() => void) | null = null;

/**
 * Register a callback invoked when refresh fails and the session cannot be restored.
 */
export function registerSessionExpiredHandler(handler: () => void): void {
  sessionExpiredHandler = handler;
}

/**
 * Decode the current token expiry timestamp, if available.
 */
export function getTokenExpiryTimestamp(): number | null {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<IToken>(token);
    return decoded.exp ?? null;
  } catch {
    return null;
  }
}

/**
 * True when the JWT exp claim is in the past.
 */
export function isTokenExpired(): boolean {
  return isAuthTokenExpired();
}

/**
 * True when the token should be refreshed before the next API call.
 */
export function shouldRefreshAuthToken(): boolean {
  const expiry = getTokenExpiryTimestamp();
  if (expiry === null) {
    return false;
  }

  const secondsRemaining = expiry - Date.now() / 1000;
  return secondsRemaining <= TOKEN_REFRESH_BUFFER_SECONDS;
}

/**
 * Exchange the current bearer token for a new access token.
 */
export async function refreshAuthToken(): Promise<string | null> {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  try {
    const { data } = await axios.post(
      `${baseUrl}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const newToken = data?.access_token as string | undefined;
    if (!newToken) {
      return null;
    }

    saveTokenToStorage(newToken);
    setDefaultHeaders();
    return newToken;
  } catch {
    return null;
  }
}

/**
 * Ensure a usable access token exists, refreshing when expired or near expiry.
 */
export async function ensureValidAccessToken(): Promise<string | null> {
  let token = getAuthToken();
  if (!token) {
    return null;
  }

  setDefaultHeaders();

  if (isAuthTokenExpired() || shouldRefreshAuthToken()) {
    if (!refreshPromise) {
      refreshPromise = refreshAuthToken().finally(() => {
        refreshPromise = null;
      });
    }

    token = await refreshPromise;
  }

  return token;
}

/**
 * Restore auth state from storage, refreshing the token when needed.
 */
export async function restoreAuthSession(): Promise<AuthSessionResult> {
  const token = await ensureValidAccessToken();
  if (!token) {
    return { ok: false, reason: getAuthToken() ? "refresh_failed" : "missing" };
  }

  const profileRaw = getProfileFromStorage();
  if (!profileRaw) {
    return { ok: false, reason: "invalid" };
  }

  try {
    const profile = JSON.parse(profileRaw) as LoginResponseProfileType;
    return { ok: true, profile };
  } catch {
    return { ok: false, reason: "invalid" };
  }
}

function notifySessionExpired(): void {
  removeTokenFromStorage();
  sessionExpiredHandler?.();
}

/**
 * Attach a global axios interceptor that refreshes on 401 and retries once.
 */
export function setupAxiosAuthInterceptors(): void {
  axios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetriableRequestConfig | undefined;
      if (!originalRequest || originalRequest._retry) {
        return Promise.reject(error);
      }

      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }

      const requestUrl = originalRequest.url ?? "";
      if (
        requestUrl.includes("/auth/refresh") ||
        requestUrl.includes("/auth/login")
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = refreshAuthToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newToken = await refreshPromise;
      if (!newToken) {
        notifySessionExpired();
        return Promise.reject(error);
      }

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axios(originalRequest);
    },
  );
}
