/**
 * Auth-related types aligned with the Angular app
 * `app_hr_com/src/app/services/auth/auth.service.ts` and login/signup components.
 */

export type TokenPair = {
  access: string;
  refresh: string;
};

/** Unwrapped JWT pair stored after login / refresh. */
export type AuthTokens = TokenPair;

export type AuthUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  email_verified: boolean;
  account_approved: boolean;
  company_profile_completed: boolean;
  company_name: string | null;
  company_email: string | null;
  company_website: string | null;
  intended_use: string | null;
};

export type AuthMeUser = AuthUser;

/**
 * HTTP JSON body for `POST ${apiUrl}/auth/login` — matches `AuthService.login()` payload.
 */
export type LoginPayload = {
  email: string;
  password: string;
};

/**
 * Successful login response — matches `loginResponse` in
 * `auth.service.ts` / `login.component.ts`.
 *
 * Note: Django wraps this inside `CustomResponse`; axios exposes the JSON body directly
 * as `response.data` (same shape the Angular `HttpClient` receives).
 */
export type LoginApiResponse = {
  data: {
    access: string;
    refresh: string;
  };
  error: string | null;
  message: string;
};

/**
 * Loose shape referenced by `AuthService` for signup / forgot / reset.
 * The API runtime uses `CustomResponse` (`data`, `message`, `error`).
 */
export type AuthServiceResponse = {
  token?: string;
  success?: boolean;
  message?: string;
  error?: string;
};

export type ApiEnvelope<T> = {
  data: T;
  message: string | null;
  error: unknown;
};

/**
 * Same fields as `AuthService.signup(first_name, last_name, email, password)` POST body.
 */
export type SignupPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type SignUpData = {
  access: string;
  refresh: string;
  user: AuthMeUser;
};

/** Same as `AuthService.forgotPassword(email)` POST body. */
export type ForgotPasswordPayload = {
  email: string;
};

/** Same as `AuthService.resetPassword(token, password)` POST body. */
export type ResetPasswordPayload = {
  token: string;
  password: string;
};
