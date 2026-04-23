/**
 * Auth URL paths relative to `environment.apiUrl` / `NEXT_PUBLIC_API_URL` (no trailing slash on base).
 *
 * Keep in sync with:
 * `app_hr_com/src/app/services/auth/auth.service.ts` — `${apiUrl}/auth/...`
 * `api-hr-io/authentication/urls.py`
 */
export const AUTH_API_PATHS = {
  /** `POST` body `{ email, password }` — matches `AuthService.login`. */
  login: "auth/login",
  /** `POST` body `{ first_name, last_name, email, password }` — matches `AuthService.signup`. */
  signup: "auth/signup",
  /** `POST` body `{ email }` — matches `AuthService.forgotPassword`. */
  forgotPassword: "auth/forgot-password",
  /** `POST` body `{ token, password }` — matches `AuthService.resetPassword`. */
  resetPassword: "auth/reset-password",
  /**
   * `POST` body `{ refresh }` — not exposed on `AuthService`; used by axios refresh.
   * @see api-hr-io `path("login/refresh/", ...)`
   */
  loginRefresh: "auth/login/refresh/",
  /** `POST` body `{ token, device_id }`. */
  registerFCMToken: "auth/fcm-token",
} as const;
