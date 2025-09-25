# Shop App

This is a full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js) and TypeScript.

## Features

*   User authentication (registration and login) with JWT.
*   Product listing and management.
*   Shopping cart functionality.
*   Admin panel for managing products.

## Technologies Used

### Frontend

*   **Framework**: React 19
*   **Build Tool**: Vite
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Routing**: React Router DOM
*   **HTTP Client**: Axios

### Backend

*   **Framework**: Express.js
*   **Language**: TypeScript
*   **Database**: MongoDB with Mongoose
*   **Authentication**: JSON Web Tokens (JWT)
*   **Middleware**: CORS, Cookie Parser, Morgan

## Project Structure

The project is organized into two main directories: `client` and `server`.

```
shop-app/
├── client/         # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   └── pages/
│   └── ...
└── server/         # Backend Express.js application
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middlewares/
    │   ├── models/
    │   └── routes/
    └── ...
```

## Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm (or yarn)
*   MongoDB instance (local or cloud)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/shop-app.git
    cd shop-app
    ```

2.  **Install backend dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1.  **Configure the backend:**
    *   In the `server` directory, create a `.env` file.
    *   Add the following environment variables:
        ```
        PORT=5000
        MONGO_URI=<your_mongodb_connection_string>
        JWT_SECRET=<your_jwt_secret>
        ```

2.  **Start the backend server:**
    ```bash
    cd server
    npm run dev
    ```
    The server will be running on `http://localhost:5000`.

3.  **Start the frontend development server:**
    ```bash
    cd client
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Available Scripts

### Client (`client/`)

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the app for production.
*   `npm run lint`: Lints the code.
*   `npm run preview`: Previews the production build.

### Server (`server/`)

*   `npm run dev`: Starts the development server with hot-reloading.
*   `npm run build`: Compiles TypeScript to JavaScript.
*   `npm run start`: Starts the production server.

## API Endpoints

The backend provides the following API endpoints:

*   **Auth:**
    *   `POST /api/auth/register`
    *   `POST /api/auth/login`
    *   `POST /api/auth/logout`
*   **User:**
    *   `GET /api/user/profile`
*   **Admin:**
    *   `GET /api/admin/products`
    *   `POST /api/admin/products`
    *   `PUT /api/admin/products/:id`
    *   `DELETE /api/admin/products/:id`

## License

This project is licensed under the ISC License.
