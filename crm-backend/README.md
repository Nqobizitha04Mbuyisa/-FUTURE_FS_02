# Mini CRM — Backend (Spring Boot)

REST API for the Mini CRM. See the root [README](../README.md) for end-to-end setup.

## Run locally

```bash
cp .env.example .env
mvn spring-boot:run
```

Default port: **8080** · Health: `GET /api/health`

## Build a fat JAR

```bash
mvn clean package
java -jar target/crm-1.0.0.jar
```

## Tech

- Java 17, Spring Boot 3.3, Spring Security, Spring Data JPA
- JJWT 0.12, BCrypt
- Microsoft SQL Server JDBC driver
- Lombok, Bean Validation
- spring-dotenv (loads `.env` at startup)

## Folder map

```
src/main/java/com/example/crm/
  config/        SecurityConfig, DataSeeder
  controller/    Auth, PublicLead, Lead, Dashboard, Health
  service/       Auth, Lead, Dashboard
  repository/    JPA repositories
  model/         Entities + enums
  dto/           Request/response DTOs
  mapper/        LeadMapper
  security/      JwtService, JwtAuthFilter, UserPrincipal, UserDetailsService
  exception/     GlobalExceptionHandler + exceptions
src/main/resources/
  application.properties
  db/schema.sql, db/seed.sql
```

## Default admin (seeded)

`admin@crm.com / Admin@123` — change via `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` **before first boot**.
