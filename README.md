# Mini CRM — Full Stack Lead Management System

## Overview

Mini CRM is a production-ready full-stack lead management platform designed to help businesses capture, organize, and manage customer leads efficiently.

The application was built using a modern full-stack architecture with a React frontend, Spring Boot backend, PostgreSQL database integration, JWT authentication, and cloud deployment.

This project demonstrates practical software engineering skills including:

* Full-stack application development
* REST API design
* JWT authentication & authorization
* PostgreSQL database integration
* Cloud deployment
* Production debugging
* Environment variable management
* Frontend/backend integration
* Secure API communication

---

# Live Demo

## Frontend

[https://future-fs-02-hh8h.onrender.com](https://future-fs-02-hh8h.onrender.com)

## Backend API

[https://mini-crm-backend-cr6q.onrender.com](https://mini-crm-backend-cr6q.onrender.com)

---

# Features

## Authentication & Security

* JWT Authentication
* Secure password hashing using BCrypt
* Protected routes
* Role-based authorization
* Persistent login sessions
* Automatic logout on unauthorized access

## Lead Management

* Create leads
* View all leads
* Update lead information
* Delete leads
* Search and filter leads
* Update lead statuses
* Add notes to leads

## Public Lead Capture

* Public contact form
* Automatic lead generation from inquiries
* Lead source tracking

## Dashboard

* Dashboard statistics
* Lead pipeline tracking
* Status-based organization

## Deployment & Infrastructure

* Frontend deployed on Render
* Backend deployed on Render
* PostgreSQL database hosted on Neon
* Environment variable configuration
* Production-ready REST API

---

# Tech Stack

## Frontend

* React
* Vite
* Axios
* React Router
* Tailwind CSS

## Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* Hibernate / JPA
* Maven

## Database

* PostgreSQL
* Neon Database

## Deployment

* Render (Frontend & Backend)
* GitHub

---

# System Architecture

Frontend (React + Vite)
↓
REST API (Spring Boot)
↓
PostgreSQL Database (Neon)

---

# API Endpoints

## Authentication

* POST /api/auth/login
* GET /api/auth/me

## Leads

* GET /api/leads
* POST /api/leads
* PUT /api/leads/{id}
* DELETE /api/leads/{id}
* PUT /api/leads/{id}/status
* POST /api/leads/{id}/notes

## Public

* POST /api/public/leads

---

# Environment Variables

## Frontend (.env)

```env
VITE_API_BASE_URL=https://mini-crm-backend-cr6q.onrender.com/api
```

## Backend

```env
SPRING_DATASOURCE_URL=your_database_url
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=your_secret
APP_CORS_ALLOWED_ORIGINS=https://future-fs-02-hh8h.onrender.com
```

---

# Local Installation

## Clone Repository

```bash
git clone <repository-url>
cd mini-crm
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Backend Setup

```bash
cd backend
mvn spring-boot:run
```

---

# Production Challenges Solved

This project involved solving several real-world production deployment challenges including:

* CORS configuration issues
* JWT authentication integration
* Frontend/backend API routing mismatches
* Environment variable configuration
* SPA routing issues on Render
* PostgreSQL cloud database integration
* API deployment debugging
* Protected route handling
* Persistent authentication sessions

---

# What I Learned

Through building this project, I strengthened my understanding of:

* Full-stack software engineering
* Backend API architecture
* Authentication systems
* Database integration
* Cloud deployment workflows
* Production debugging techniques
* Frontend/backend communication
* Secure application design

---


# Future Improvements

* Email notifications
* Analytics dashboard
* User management
* Pagination improvements
* Advanced filtering
* Activity logs
* Docker support
* CI/CD pipeline
* Unit and integration testing

---

# Author

Nqobizitha Mbuyisa

Computer Science & IT Graduate
Full-Stack & Software Engineering Enthusiast


