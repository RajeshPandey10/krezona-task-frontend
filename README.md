# Krezona Frontend — Documentation (Quick Start)

This document explains how to set up, run, and build the Next.js frontend for Krezona, and provides a short guide to the app structure and pages.

## Project Overview

- Framework: Next.js 16 (React 19)
- Language: TypeScript
- Styling: TailwindCSS + shadcn/ui
- State: Zustand
- Forms: react-hook-form + Zod
- HTTP: Axios (configured in `src/lib/axios.ts`)

## Environment

Create `.env.local` in the project root with at least:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

If you use different backend host/port, set `NEXT_PUBLIC_API_URL` to your backend URL (for Supabase/production set to production API URL).

## Install & Run (Development)

```bash
cd krezona-task-frontend
npm install
npm run dev
```

- Local dev server default: `http://localhost:3001` (check terminal output)
- Hot reload supported; edit code under `src/` and refresh.

## Build & Run (Production)

```bash
# build
npm run build
# start production server
npm run start
```

To deploy, use Vercel (recommended) or any Node host. Ensure `NEXT_PUBLIC_API_URL` is set in the deployment environment.

## Key Files & Folders

- `src/app/` — Next.js app routes (login, register, verify-otp, dashboard, admin, projects)
- `src/components/` — Reusable UI and feature components
- `src/lib/axios.ts` — Axios instance; set base URL from `NEXT_PUBLIC_API_URL`
- `src/services/` — API wrappers used by UI
- `src/schemas/` — Zod schemas for form validation
- `src/store/` — Zustand stores (auth state)
- `src/hooks/` — Custom hooks for reuse (useAuth, useProjects, etc.)

## Pages (Important)

- `/auth/login` — Login page
- `/auth/register` — Registration page (triggers OTP)
- `/auth/verify-otp` — OTP verification
- `/dashboard` — Role-aware dashboard
- `/dashboard/admin/users` — Admin user management
- `/dashboard/admin/subscriptions` — Admin subscription UI
- `/dashboard/projects` — Projects list and CRUD

## Connecting to Backend

- Axios client reads `NEXT_PUBLIC_API_URL`. Ensure backend is running and accessible.
- Authentication uses JWT: login returns token and app stores it (see `src/lib/axios.ts` and `src/store/auth.store.ts`).

## Testing

- Add unit tests with Jest + React Testing Library for components and Supertest/Jest for backend integration (optional)

## Deployment (Vercel)

1. Push to GitHub.
2. Create a Vercel project and connect the repo.
3. Set Environment Variable `NEXT_PUBLIC_API_URL` in Vercel to your backend URL.
4. Deploy.

## Troubleshooting

- CORS error: Ensure backend CORS allows the frontend origin.
- Auth issues: Confirm `NEXT_PUBLIC_API_URL` points to a running backend and that JWT secret/expiry match expected values on the server.
- Dev server port: If conflict, change in `package.json` or set `PORT` env for Next.

## Notes for Reviewers

- UI components follow shadcn patterns in `src/components/ui`.
- Business logic is kept in `src/services` and `src/hooks` to keep components thin.
- To move docs or notes, add a `docs/` folder in this repo or centralize docs in the `krezona` root per your preference.

## Next Steps (optional)

- Add `FRONTEND_DOCS.md` to repository root `docs/` or include links in repo README.
- Add simple unit tests for critical components (login, register, project form) to improve reliability.

---

If you want, I can:

- Update `krezona-task-frontend/README.md` with this content, or
- Create a `docs/` folder and copy `FRONTEND_DOCS.md` there and link it from README.
  Which do you prefer?
