# Corbin's CSE341 Project2 and Task Management API

This project is a RESTful API built with Node.js, Express, MongoDB, Mongoose, Passport and Google OAuth.

## Features

- MongoDB database
- Two main collections
- Projects collection
- Tasks collection
- User collection
- Full CRUD operations
- GET
- POST
- PUT
- DELETE
- Data validation
- Error handling
- Google OAuth authentication
- Protected API routes
- Swagger API documentation
- Render deployment

## Technologies

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Passport.js
- Google OAuth 2.0
- Express Validator
- Swagger UI
- Render

## Database Collections

### Projects

The Projects collection contains:

1. name
2. description
3. client
4. status
5. priority
6. budget
7. startDate
8. endDate
9. owner
10. createdAt

### Tasks

The Tasks collection contains:

1. title
2. description
3. projectId
4. assignedTo
5. status
6. priority
7. dueDate
8. estimatedHours
9. completed
10. createdAt

### Users

Users are created through Google OAuth.

## Installation

Clone the repository.

Install dependencies:

npm install

Create a .env file.

Add the required MongoDB and Google OAuth credentials.

Run the development server:

npm run dev

## Local URL

http://localhost:8080

## Swagger

http://localhost:8080/api-docs

## Authentication

Login:

GET /auth/google

Current user:

GET /auth/me

Logout:

GET /auth/logout

## Projects

GET /projects

GET /projects/:id

POST /projects

PUT /projects/:id

DELETE /projects/:id

## Tasks

GET /tasks

GET /tasks/:id

POST /tasks

PUT /tasks/:id

DELETE /tasks/:id

## HTTP Status Codes

200 - Successful request

201 - Resource created

400 - Validation or request error

401 - Authentication required

404 - Resource not found

500 - Server error

## Validation

POST and PUT operations for Projects and Tasks use express-validator.

The application validates:

- Required fields
- String length
- Numbers
- Dates
- MongoDB IDs
- Enumerated status values
- Enumerated priority values

## Authentication

Google OAuth 2.0 is used for user authentication.

Project and Task routes require authentication.

Unauthenticated users receive HTTP 401.

## Deployment

The API is designed to be deployed on Render.

Sensitive values such as MongoDB credentials and Google OAuth secrets are stored as environment variables and are not committed to GitHub.
