# Mini CRM - Full Stack Lead Management System

Mini CRM is a full-stack web application that helps businesses capture, manage, and track customer leads throughout the sales process.

I built this project to gain hands-on experience developing and deploying a complete business application using Java Spring Boot, React, PostgreSQL, and JWT authentication. The project allowed me to work through real-world challenges such as authentication, API integration, database management, cloud deployment, and production debugging.

## Live Demo

### Frontend

[Fronted web page](https://future-fs-02-hh8h.onrender.com)

### Backend API

[Backend API](https://mini-crm-backend-cr6q.onrender.com)

## Features

### Authentication & Security

* User login with JWT authentication
* Secure password encryption using BCrypt
* Protected application routes
* Role-based access control
* Session persistence

### Lead Management

* Create, view, update, and delete leads
* Search and filter lead records
* Track lead status changes
* Add notes to leads
* Organize leads through different stages of the sales pipeline

### Public Lead Capture

* Public contact form
* Automatic lead creation from customer inquiries
* Lead source tracking

### Dashboard

* Lead statistics overview
* Pipeline visibility
* Status-based lead tracking

## Technologies Used

### Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS

### Backend

* Java 17
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* Maven

### Database

* PostgreSQL
* Neon Database

### Deployment

* Render
* GitHub

## Application Architecture

```text
React Frontend
      │
      ▼
Spring Boot REST API
      │
      ▼
PostgreSQL Database
```

## Running Locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
mvn spring-boot:run
```

## Challenges Solved

While building and deploying this application, I worked through several common software engineering challenges, including:

* JWT authentication implementation
* CORS configuration
* Frontend and backend integration
* PostgreSQL cloud database connectivity
* Environment variable management
* API deployment on Render
* Protected route handling
* Authentication persistence
* Debugging production deployment issues

## What I Learned

This project strengthened my understanding of:

* Full-stack application development
* REST API design and development
* Spring Boot backend architecture
* Authentication and authorization
* Database integration with PostgreSQL
* Cloud deployment workflows
* Debugging and troubleshooting production issues
* Secure application development practices

## Future Improvements

* Email notifications
* Advanced analytics dashboard
* User management features
* Activity tracking and audit logs
* Docker containerization
* Automated testing
* CI/CD pipeline integration

## Author

**Nqobizitha Mbuyisa**

Computer Science & Information Technology Graduate

Aspiring Java Software Engineer with an interest in backend development, enterprise applications, and full-stack software engineering.

