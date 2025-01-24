# Civic API

## Description

The Civic API is a RESTful API built using Node.js, Express.js, and an SQLite in-memory database. The API provides functionalities to manage users, authentication, and todo items. This guide will walk you through the installation, setup, and usage of the API.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Postman Collection](#postman-collection)

---

## Features

- User registration and login with token-based authentication.
- CRUD operations for todos.
- User management with soft and hard delete options.
- SQLite in-memory database for data persistence during runtime.

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/victorazangu/civic_todo.git
   cd civic_todo
   ```

2. **Install dependencies**:
   Ensure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Create a `.env` file**:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=4500
   JWT_SECRET=ThisIsASecret
   JWT_EXPIRES_IN_MIN=30
   JWT_ALGORITHM=RS512
   JWT_ISSUER=issuer
   ```

---

## Running the Project

### Start the Server

1. To start the server in development mode:
   ```bash
   npm run dev
   ```

2. To start the server in production mode:
   ```bash
   npm start
   ```

The server will run at `http://localhost:4500` by default.

---

## API Endpoints

Below are the key API endpoints. Refer to the Postman collection for detailed usage.

### Authentication

- **Register User**: `POST /auth/register`
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }
  ```

- **Login User**: `POST /auth/login`
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }
  ```

- **Get Current User**: `GET /auth/me`  
  Requires `Authorization: Bearer TOKEN`.

---

### Users

- **Get All Users**: `GET /users`
- **Get Single User**: `GET /users/:id`
- **Update User**: `PATCH /users/:id`
- **Soft Delete User**: `DELETE /users/:id`
- **Hard Delete User**: `DELETE /users/:id/hard-delete`

---

### Todos

- **Create Todo**: `POST /todos`
  ```json
  {
    "title": "Sample Title",
    "description": "Sample description with multiple sentences.",
    "completed": true,
    "ownerId": 1
  }
  ```

- **Get All Todos**: `GET /todos`
- **Get Single Todo**: `GET /todos/:id`
- **Update Todo**: `PATCH /todos/:id`
- **Delete Todo**: `DELETE /todos/:id`

---

### Landing Page

- **Index**: `GET /`

---

## Environment Variables

| Variable             | Description                       | Example        |
|----------------------|-----------------------------------|----------------|
| `PORT`               | The port the server runs on       | `4500`         |
| `JWT_SECRET`         | Secret key for JWT authentication | `ThisIsASecret`|
| `JWT_EXPIRES_IN_MIN` | Token expiration time in minutes  | `30`           |
| `JWT_ALGORITHM`      | Algorithm used for JWT signing    | `RS512`        |
| `JWT_ISSUER`         | Issuer field for JWT              | `issuer`       |

---

## Postman Collection

You can use the provided Postman collection to test the API endpoints.  
1. Import the [Postman collection](./Civic.postman_collection.json) into your Postman workspace.
2. Set the `{{BASE_URL}}` variable to `http://localhost:4500`.
3. Use the `{{TOKEN}}` variable for endpoints requiring authentication this should be automatically set to every endpoints that needs auth.

---

## Notes

- SQLite is used as an in-memory database. All data will be reset when the server restarts.
- Extend the `.env` file for additional configurations as needed.

---

