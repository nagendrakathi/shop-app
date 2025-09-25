# API Documentation

This document provides a detailed overview of the API endpoints for the shop-app.

## Authentication Routes

### Register
- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user or admin.
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "'user' or 'admin'",
    "secret": "string (required if role is 'admin')"
  }
  ```
- **Response:**
  - `201`: User/Admin registered successfully.
  - `400`: Bad request (e.g., missing fields, user already exists).
  - `403`: Forbidden (invalid admin secret).
  - `500`: Internal server error.

### Login
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Logs in a user or admin.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `200`: Login successful.
  - `400`: Bad request (e.g., missing fields, invalid credentials).
  - `500`: Internal server error.

### Logout
- **URL:** `/api/auth/logout`
- **Method:** `POST`
- **Description:** Logs out the current user.
- **Response:**
  - `200`: Logged out successfully.
  - `500`: Internal server error.

### Get Profile
- **URL:** `/api/auth/profile`
- **Method:** `GET`
- **Description:** Fetches the profile of the authenticated user.
- **Authentication:** `verifyToken` middleware required.
- **Response:**
  - `200`: User details fetched successfully.

### Delete User
- **URL:** `/api/auth/delete`
- **Method:** `POST`
- **Description:** Deletes the authenticated user's account.
- **Authentication:** `verifyToken` middleware required.
- **Request Body:**
  ```json
  {
    "password": "string"
  }
  ```
- **Response:**
  - `200`: User deleted successfully.
  - `400`: Bad request (e.g., missing password, invalid password).
  - `404`: User not found.
  - `500`: Internal server error.

## User Routes

### Add to Cart
- **URL:** `/api/user/add-to-cart`
- **Method:** `POST`
- **Description:** Adds a product to the user's cart.
- **Authentication:** `verifyToken` and `isUser` middleware required.
- **Request Body:**
  ```json
  {
    "productId": "string",
    "quantity": "number"
  }
  ```
- **Response:**
  - `200`: Product added to cart successfully.
  - `400`: Bad request (e.g., invalid productId or quantity, insufficient stock).
  - `401`: Unauthorized.
  - `404`: Product not found.
  - `500`: Internal server error.

### Get Cart
- **URL:** `/api/user/get-cart`
- **Method:** `GET`
- **Description:** Fetches the user's cart.
- **Authentication:** `verifyToken` and `isUser` middleware required.
- **Response:**
  - `200`: Cart fetched successfully.
  - `401`: Unauthorized.
  - `500`: Internal server error.

### Remove from Cart
- **URL:** `/api/user/remove-from-cart`
- **Method:** `DELETE`
- **Description:** Removes a product from the user's cart.
- **Authentication:** `verifyToken` and `isUser` middleware required.
- **Request Body:**
  ```json
  {
    "productId": "string"
  }
  ```
- **Response:**
  - `200`: Product removed from cart successfully.
  - `400`: Bad request (e.g., invalid productId).
  - `401`: Unauthorized.
  - `404`: Cart or product not found.
  - `500`: Internal server error.

### Clear Cart
- **URL:** `/api/user/clear-cart`
- **Method:** `DELETE`
- **Description:** Clears all items from the user's cart.
- **Authentication:** `verifyToken` and `isUser` middleware required.
- **Response:**
  - `200`: Cart cleared successfully.
  - `401`: Unauthorized.
  - `404`: Cart not found.
  - `500`: Internal server error.

### Checkout
- **URL:** `/api/user/check-out`
- **Method:** `POST`
- **Description:** Processes the checkout.
- **Authentication:** `verifyToken` and `isUser` middleware required.
- **Response:**
  - `200`: Checkout successful.
  - `400`: Bad request (e.g., cart is empty).
  - `401`: Unauthorized.
  - `500`: Internal server error.

## Admin Routes

### Create Product
- **URL:** `/api/admin/create-product`
- **Method:** `POST`
- **Description:** Creates a new product.
- **Authentication:** `verifyToken` and `isAdmin` middleware required.
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "stock": "number (optional, default: 1)",
    "images": "string[] (optional)",
    "status": "string (optional, default: 'In stock')"
  }
  ```
- **Response:**
  - `201`: Product created successfully.
  - `400`: Bad request (e.g., missing required fields).
  - `500`: Internal server error.

### Update Product
- **URL:** `/api/admin/update-product/:id`
- **Method:** `PATCH`
- **Description:** Updates an existing product.
- **Authentication:** `verifyToken` and `isAdmin` middleware required.
- **URL Parameters:**
  - `id`: Product ID
- **Request Body:**
  ```json
  {
    "name": "string (optional)",
    "description": "string (optional)",
    "price": "number (optional)",
    "stock": "number (optional)",
    "images": "string[] (optional)"
  }
  ```
- **Response:**
  - `200`: Product updated successfully.
  - `404`: Product not found.
  - `500`: Internal server error.

### Delete Product
- **URL:** `/api/admin/delete-product/:id`
- **Method:** `DELETE`
- **Description:** Deletes a product.
- **Authentication:** `verifyToken` and `isAdmin` middleware required.
- **URL Parameters:**
  - `id`: Product ID
- **Response:**
  - `200`: Product deleted successfully.
  - `404`: Product not found.
  - `500`: Internal server error.

### Get All Products
- **URL:** `/api/admin/get-all-products`
- **Method:** `GET`
- **Description:** Fetches all products.
- **Authentication:** `verifyToken` middleware required.
- **Response:**
  - `200`: Products fetched successfully.
  - `500`: Internal server error.

### Get Product By ID
- **URL:** `/api/admin/get-product/:id`
- **Method:** `GET`
- **Description:** Fetches a single product by its ID.
- **Authentication:** `verifyToken` and `isAdmin` middleware required.
- **URL Parameters:**
  - `id`: Product ID
- **Response:**
  - `200`: Product fetched successfully.
  - `404`: Product not found.
  - `500`: Internal server error.

### Get All Users
- **URL:** `/api/admin/get-all-users`
- **Method:** `GET`
- **Description:** Fetches all users with the role 'user'.
- **Authentication:** `verifyToken` and `isAdmin` middleware required.
- **Response:**
  - `200`: Users fetched successfully.
  - `500`: Internal server error.

### Get User By ID
- **URL:** `/api/admin/get-user/:id`
- **Method:** `GET`
- **Description:** Fetches a single user by their ID.
- **Authentication:** `verifyToken` and `isAdmin` middleware required.
- **URL Parameters:**
  - `id`: User ID
- **Response:**
  - `200`: User fetched successfully.
  - `404`: User not found.
  - `500`: Internal server error.

### Delete User (Admin)
- **URL:** `/api/admin/delete-user/:userId`
- **Method:** `DELETE`
- **Description:** Deletes a user by their ID.
- **Authentication:** `verifyToken` and `isAdmin` middleware required.
- **URL Parameters:**
  - `userId`: User ID
- **Response:**
  - `200`: User deleted successfully.
  - `404`: User not found.
  - `500`: Internal server error.
