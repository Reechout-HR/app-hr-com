# Angular → Next.js porting status

This document compares routes defined in the Angular app (`app_hr_com/src/app/app.routes.ts`) with the Next.js app in this directory (`app-hr-com`). Update it when you add or ship pages.

## Legend

- **Ported** — A corresponding route exists in Next.js (behavior may still differ).
- **Remaining** — Not yet implemented in Next.js (or only partially).

---

## Ported pages

Route paths match Angular (`app_hr_com/src/app/app.routes.ts`). Implementation lives under `app-hr-com/app/…`.

| Route | Next.js file |
|-------|----------------|
| `/` | `app/page.tsx` |
| `/login` | `app/(auth)/login/page.tsx` |
| `/signup` | `app/(auth)/signup/page.tsx` |
| `/forgot-password` | `app/(auth)/forgot-password/page.tsx` |
| `/reset-password` | `app/(auth)/reset-password/page.tsx` |
| `/interview` | `app/interview/page.tsx` (marketing: phone interviews) |
| `/questionnaire` | `app/questionnaire/page.tsx` (marketing: builder) |
| `/reports` | `app/reports/page.tsx` (marketing: candidate reports) |
| `/about-us` | `app/about-us/page.tsx` |
| `/blog` | `app/blog/page.tsx` |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` (post detail) |
| `/contact` | `app/contact/page.tsx` |
| `/privacy-policy` | `app/privacy-policy/page.tsx` |
| `/terms-of-service` | `app/terms-of-service/page.tsx` |
| `/security` | `app/security/page.tsx` |

---

## Remaining pages

These routes exist in Angular but do **not** have a matching Next.js page yet (dashboard, interview flows, and catch-all).

| Angular route | Angular component area | Notes |
|---------------|------------------------|--------|
| `/interviews` | Dashboard: interviews list | `AuthGuard` |
| `/interviews/:id` | Interview detail | `AuthGuard` |
| `/interviews/agent/:id` | Web voice agent | Public/agent flow |
| `/interview/create` | Create interview | `AuthGuard` |
| `/interview/screening/:id` | Interview prefilter / screening | |
| `/interview/share/:id/candidate/:candidateId` | Interview share (candidate) | |
| `/interview/edit/:id` | Edit interview | `AuthGuard` |
| `/questionnaires` | Dashboard: questionnaires list | `AuthGuard` |
| `/questionnaires/:id` | Questions for a questionnaire | `AuthGuard` |
| `/**` (wildcard) | Not found | Next.js can use `not-found.tsx`; Angular uses `NotFoundComponent` |

---

## Quick counts

- **Ported:** 15 route groups (including auth and marketing; blog counts as list + `[slug]`).
- **Remaining:** 10 Angular-specific routes (dashboard and interview management flows) plus an optional dedicated 404.

---

## Maintaining this file

When you port a route, move its row from **Remaining** to **Ported** and add the `app/.../page.tsx` path. When Angular gains new routes, append them here from `app_hr_com/src/app/app.routes.ts`.
