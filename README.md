# Mini CRM — Lead Management System

A production-style **enterprise full-stack CRM** built intentionally on Java/Spring Boot (instead of Node) for enterprise-engineering alignment.

| Layer       | Stack                                                       |
| ----------- | ----------------------------------------------------------- |
| Frontend    | React 18 + Vite, Tailwind CSS, Axios, React Router v6       |
| Backend     | Java 17, Spring Boot 3, Spring Security, Spring Data JPA    |
| Auth        | JWT (Bearer) + BCrypt (cost 12)                             |
| Database    | Microsoft SQL Server                                        |
| Build       | Maven (backend) · npm/Vite (frontend)                       |

---

## Repository layout

```
.
├── crm-backend/      Spring Boot REST API
└── crm-frontend/     React + Vite SPA
```

Each subproject has its own README with deeper details. This file is the master setup guide.

---

## 1. Prerequisites

- **JDK 17+**
- **Maven 3.9+**
- **Node.js 18+** (npm or yarn)
- **Microsoft SQL Server** (any edition — Developer / Express / Docker)
- **VS Code** with these extensions (the project is optimised for them):
  - Extension Pack for Java
  - Spring Boot Extension Pack
  - ES7+ React/Redux/React-Native snippets
  - Prettier · ESLint · Thunder Client · GitLens

---

## 2. Set up SQL Server

Create an empty database — Hibernate (`spring.jpa.hibernate.ddl-auto=update`) will create tables automatically on first boot.

```sql
CREATE DATABASE mini_crm;
```

Reference DDL is at `crm-backend/src/main/resources/db/schema.sql` for manual provisioning.

**Docker shortcut:**
```bash
docker run -e ACCEPT_EULA=Y -e SA_PASSWORD='YourStrong!Passw0rd' \
  -p 1433:1433 -d --name mssql \
  mcr.microsoft.com/mssql/server:2022-latest
```

---

## 3. Run the backend

```bash
cd crm-backend
cp .env.example .env       # adjust DB_URL / DB_USERNAME / DB_PASSWORD as needed
mvn spring-boot:run
```

On first boot the **DataSeeder**:
1. Creates the default admin: `admin@crm.com` / `Admin@123` (role `ADMIN`).
2. Inserts 5 sample leads spanning every status.

Health check: `GET http://localhost:8080/api/health`

### Backend `.env` keys

| Key                | Default                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| `SERVER_PORT`      | `8080`                                                                                           |
| `DB_URL`           | `jdbc:sqlserver://localhost:1433;databaseName=mini_crm;encrypt=true;trustServerCertificate=true` |
| `DB_USERNAME`      | `sa`                                                                                             |
| `DB_PASSWORD`      | `YourStrong!Passw0rd`                                                                            |
| `JWT_SECRET`       | base64-encoded ≥32-byte random string                                                            |
| `JWT_EXPIRATION_MS`| `86400000` (24 h)                                                                                |
| `CORS_ORIGINS`     | `http://localhost:5173,http://localhost:3000`                                                    |
| `ADMIN_EMAIL`      | `admin@crm.com`                                                                                  |
| `ADMIN_PASSWORD`   | `Admin@123`                                                                                      |

---

## 4. Run the frontend

```bash
cd crm-frontend
cp .env.example .env       # adjust VITE_API_BASE_URL if needed
npm install
npm run dev
```

Open **http://localhost:5173**

- Sign in with **admin@crm.com / Admin@123**
- Public contact form (no auth) lives at `/contact`

---

## 5. API documentation

All endpoints are prefixed with `/api`. Authenticated endpoints expect `Authorization: Bearer <jwt>`.

### Auth
| Method | Path              | Body                  | Description                  |
| ------ | ----------------- | --------------------- | ---------------------------- |
| POST   | `/api/auth/login` | `{ email, password }` | Returns JWT + user profile   |
| GET    | `/api/auth/me`    | —                     | Current authenticated user   |

### Public
| Method | Path                | Description                                      |
| ------ | ------------------- | ------------------------------------------------ |
| POST   | `/api/public/leads` | Submit website contact form (creates `NEW` lead) |

### Leads (admin)
| Method | Path                       | Description                                       |
| ------ | -------------------------- | ------------------------------------------------- |
| GET    | `/api/leads`               | List leads · query: `q`, `status`, `page`, `size` |
| POST   | `/api/leads`               | Create lead manually                              |
| GET    | `/api/leads/{id}`          | Lead detail (with notes + status history)         |
| PUT    | `/api/leads/{id}`          | Update lead fields                                |
| DELETE | `/api/leads/{id}`          | Delete lead (ADMIN only)                          |
| PUT    | `/api/leads/{id}/status`   | Body `{ "status": "CONTACTED" }`                  |
| POST   | `/api/leads/{id}/notes`    | Body `{ "noteText": "..." }`                      |

### Dashboard
| Method | Path                    | Description                          |
| ------ | ----------------------- | ------------------------------------ |
| GET    | `/api/dashboard/stats`  | Aggregated stats + 5 most recent     |

### cURL examples

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@crm.com","password":"Admin@123"}'

# Submit public lead
curl -X POST http://localhost:8080/api/public/leads \
  -H "Content-Type: application/json" \
  -d '{
    "fullName":"Jane Doe","email":"jane@example.com",
    "phone":"+1 555 0100","company":"Doe Inc.",
    "leadSource":"Website","message":"Interested in a demo"
  }'

# Update status (auth required)
curl -X PUT http://localhost:8080/api/leads/1/status \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{"status":"CONTACTED"}'
```

---

## 6. Backend architecture

```
src/main/java/com/example/crm/
├── CrmApplication.java
├── config/        SecurityConfig · DataSeeder
├── controller/    Auth · PublicLead · Lead · Dashboard · Health
├── service/       Auth · Lead · Dashboard
├── repository/    User · Lead · LeadNote · LeadStatusHistory
├── model/         Entities + enums (LeadStatus, Role)
├── dto/           Request / response DTOs
├── mapper/        LeadMapper
├── security/      JwtService · JwtAuthFilter · UserPrincipal · CustomUserDetailsService
└── exception/     GlobalExceptionHandler + custom exceptions
```

**Highlights**
- DTO pattern · layered architecture (controller → service → repository).
- `@RestControllerAdvice` global exception handling for validation, auth, 404 and 500.
- Stateless JWT auth (`SessionCreationPolicy.STATELESS`), BCrypt cost 12.
- `@PreAuthorize("hasRole('ADMIN')")` for destructive endpoints.
- `LeadStatusHistory` records every status transition (audit trail).

---

## 7. Database design

```
users (id PK, name, email UNIQUE, password_hash, role, active, created_at, updated_at)
leads (id PK, full_name, email, phone, company, lead_source, message, status, created_at, updated_at)
lead_notes (id PK, lead_id FK→leads, author_id FK→users, note_text, created_at)
lead_status_history (id PK, lead_id FK→leads, from_status, to_status, changed_by_id FK→users, changed_at)
```

**Indexes:** `users(email)`, `leads(status)`, `leads(email)`, `leads(created_at)`, `lead_notes(lead_id)`, `lead_status_history(lead_id)`.

---

## 8. Default credentials (seeded)

| Email           | Password    | Role   |
| --------------- | ----------- | ------ |
| admin@crm.com   | Admin@123   | ADMIN  |

Override via `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars **before first boot**.

---

## 9. Production notes

- Generate a strong `JWT_SECRET` (e.g. `openssl rand -base64 64`).
- Switch `spring.jpa.hibernate.ddl-auto` to `validate` and use Flyway/Liquibase migrations.
- Run behind HTTPS; restrict `CORS_ORIGINS` to your real frontend domain.
- Build the frontend with `npm run build` and serve `dist/` via nginx or a CDN.
- Build the backend with `mvn clean package` → `java -jar target/crm-1.0.0.jar`.

---

## License

MIT
