# Uber Clone Backend API Documentation

This document explains the main API routes and core logic implemented in the backend files of the Uber Clone project.

---

## Table of Contents

- [Overview](#overview)
- [User API Routes](#user-api-routes)
- [Captain API Routes](#captain-api-routes)
- [Authentication Tokens](#authentication-tokens)
- [Models](#models)
- [Error and Response Handling](#error-and-response-handling)
- [Other Files](#other-files)
- [Example Usage](#example-usage)
- [Notes](#notes)

---

## Overview

The backend is built using **Node.js**, **Express.js**, and **MongoDB** (via Mongoose). It provides user and captain authentication using JWT tokens, secure cookie handling, and basic profile management.

---

## User API Routes

All user-related routes are prefixed with `/api/v1/users`.

### Register User

- **Endpoint:** `POST /api/v1/users/register`
- **Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**  
  Returns the created user object (without password and refreshToken) and a success message.

### Login User

- **Endpoint:** `POST /api/v1/users/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**  
  Sets `accessToken` and `refreshToken` as HTTP-only cookies and returns:
  ```json
  {
    "user": { ...userData },
    "accessToken": "JWT_ACCESS_TOKEN",
    "refreshToken": "JWT_REFRESH_TOKEN"
  }
  ```
- **Notes:**  
  - Tokens are also sent in the response body for convenience.
  - Cookies are set with `httpOnly` and `secure` flags for security.

### Get User Profile

- **Endpoint:** `GET /api/v1/users/profile`
- **Headers:**  
  Requires a valid JWT (usually sent via cookie or Authorization header).
- **Response:**  
  Returns the user's profile (excluding password and refreshToken).

### Logout User

- **Endpoint:** `POST /api/v1/users/logout`
- **Headers:**  
  Requires authentication.
- **Response:**  
  Clears the authentication cookies and returns a logout success message.

---

## Captain API Routes

All captain-related routes are prefixed with `/api/v1/captains`.

### Register Captain

- **Endpoint:** `POST /api/v1/captains/register`
- **Body:**
  ```json
  {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@captain.com",
    "password": "yourpassword",
    "color": "Red",
    "plateNumber": "ABC-1234",
    "capacity": 4,
    "type": "car"
  }
  ```
- **Response:**  
  Returns the created captain object (without password and refreshToken) and a success message.

### Login Captain

- **Endpoint:** `POST /api/v1/captains/login`
- **Body:**
  ```json
  {
    "email": "jane@captain.com",
    "password": "yourpassword"
  }
  ```
- **Response:**  
  Sets `AccessToken` and `RefreshToken` as HTTP-only cookies and returns:
  ```json
  {
    "captain": { ...captainData },
    "accessToken": "JWT_ACCESS_TOKEN",
    "refreshToken": "JWT_REFRESH_TOKEN"
  }
  ```
- **Notes:**  
  - Tokens are also sent in the response body for convenience.
  - Cookies are set with `httpOnly` and `secure` flags for security.

### Get Captain Profile

- **Endpoint:** `GET /api/v1/captains/profile`
- **Headers:**  
  Requires a valid JWT (usually sent via cookie or Authorization header).
- **Response:**  
  Returns the captain's profile (excluding password and refreshToken).

### Logout Captain

- **Endpoint:** `POST /api/v1/captains/logout`
- **Headers:**  
  Requires authentication.
- **Response:**  
  Clears the authentication cookies and returns a logout success message.

---

## Authentication Tokens

- **Access Token:**  
  Short-lived JWT used for authenticating API requests.
- **Refresh Token:**  
  Longer-lived JWT used to obtain new access tokens. Stored in the database and as an HTTP-only cookie.

**Cookie Options:**
```js
const options = {
  httpOnly: true,
  secure: true
}
```
- `httpOnly`: Prevents JavaScript access to cookies (mitigates XSS).
- `secure`: Ensures cookies are sent only over HTTPS.

---

## Models

### User Model

Defined in `models/user.model.js`:

- **Fields:**  
  - `fullName` (with `firstName` and `lastName`)
  - `email`
  - `password` (hashed with bcrypt)
  - `refreshToken`
  - `socketId` (for real-time features)

- **Methods:**  
  - `isPasswordCorrect(password)`: Compares a plain password with the hashed one.
  - `generateAccessToken()`: Returns a signed JWT for access.
  - `generateRefreshToken()`: Returns a signed JWT for refresh.

### Captain Model

Defined in `models/captain.model.js`:

- **Fields:**  
  - `fullName` (with `firstName` and `lastName`)
  - `email`
  - `password` (hashed with bcrypt)
  - `refreshToken`
  - `socketId`
  - `status` (active/inactive)
  - `vehicle` (color, plateNumber, capacity, type)
  - `location` (latitude, longitude)

- **Methods:**  
  - `isPasswordCorrect(password)`: Compares a plain password with the hashed one.
  - `generateAccessToken()`: Returns a signed JWT for access.
  - `generateRefreshToken()`: Returns a signed JWT for refresh.

---

## Error and Response Handling

- **ApiError:**  
  Custom error class for consistent error responses.
- **ApiResponse:**  
  Standardizes successful API responses.

---

## Other Files

- **app.js:**  
  Sets up Express app, middleware, and routes.
- **server.js:**  
  Loads environment variables, connects to MongoDB, and starts the server.
- **db/db.js:**  
  Handles MongoDB connection logic.
- **routes/user.routes.js:**  
  Defines user-related API endpoints and applies authentication middleware.
- **routes/captain.routes.js:**  
  Defines captain-related API endpoints and applies authentication middleware.

---

## Example Usage

**Register User:**
```bash
curl -X POST http://localhost:8000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"yourpassword"}'
```

**Login User:**
```bash
curl -X POST http://localhost:8000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"yourpassword"}'
```

**Register Captain:**
```bash
curl -X POST http://localhost:8000/api/v1/captains/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Smith","email":"jane@captain.com","password":"yourpassword","color":"Red","plateNumber":"ABC-1234","capacity":4,"type":"car"}'
```

**Login Captain:**
```bash
curl -X POST http://localhost:8000/api/v1/captains/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@captain.com","password":"yourpassword"}'
```

---

## Notes

- All sensitive data (passwords, tokens) are handled securely.
- JWT secrets and expiry times are configured via environment variables.
- Error handling is consistent and uses custom classes for clarity.

---

For further details, refer to the code in each file.