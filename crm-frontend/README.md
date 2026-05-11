# Mini CRM — Frontend (React + Vite)

SPA admin dashboard + public contact form for the Mini CRM. See root [README](../README.md) for full setup.

## Run

```bash
cp .env.example .env
npm install
npm run dev
```

Default dev URL: **http://localhost:5173**

## Pages

| Route             | Description                                |
| ----------------- | ------------------------------------------ |
| `/login`          | Admin sign-in                              |
| `/contact`        | Public contact form (no auth)              |
| `/dashboard`      | Stats + recent leads + pipeline breakdown  |
| `/leads`          | Searchable, filterable lead table          |
| `/leads/new`      | Create lead manually                       |
| `/leads/:id`      | Lead detail · notes · status history       |

## Tech

- React 18 + Vite 5
- Tailwind CSS 3
- React Router v6
- Axios with auth interceptor + 401 auto-redirect
- react-hot-toast for notifications
- lucide-react icons

## Folder map

```
src/
  pages/        LoginPage, DashboardPage, LeadsPage, CreateLeadPage, LeadDetailsPage, PublicContactPage
  components/   Sidebar, Topbar, StatCard, StatusBadge, ProtectedRoute, LoadingSpinner
  layouts/      DashboardLayout
  services/     api (axios), authService, leadService, dashboardService
  context/      AuthContext (login, logout, current user)
  hooks/        useAuth (re-export)
  utils/        constants (statuses + colors), formatters (dates, initials)
```

## Environment

| Variable             | Description                  | Default                       |
| -------------------- | ---------------------------- | ----------------------------- |
| `VITE_API_BASE_URL`  | Backend API base URL         | `http://localhost:8080/api`   |
