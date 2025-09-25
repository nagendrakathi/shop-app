# Shop App

A full-stack e-commerce application built with:

Backend (server): Node.js, Express, TypeScript, MongoDB, JWT authentication

Frontend (client): React, Vite, TailwindCSS

This project provides a complete shop management system with user authentication, role-based access, and product management.

📂 Project Structure
shop-app/
├── client/   # React + Vite frontend
├── server/   # Express + MongoDB backend
└── README.md

⚙️ Prerequisites

Before you begin, ensure you have installed:

Node.js
 (v18 or higher recommended)

npm or yarn

MongoDB
 running locally (or a cloud connection string)

🔑 Environment Variables
Server (server/.env)
PORT=8000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/shop-app
JWT_SECRET="YIxPIhWl068gnhpNwbIu3wTfNz4/wzPx+r1ZFhdYoz4="
ADMIN_SECRET="notlikeus"
CLIENT_URL=http://localhost:5173

Client (client/.env)
VITE_BASE_URL=http://localhost:8000/api

🚀 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/nagendrakathi/shop-app.git
cd shop-app

2️⃣ Backend Setup (Server)
cd server
npm install


Run in development mode:

npm run dev


Build for production:

npm run build


Start production server:

npm start


The server will start at: http://localhost:8000

3️⃣ Frontend Setup (Client)
cd ../client
npm install


Run in development mode:

npm run dev


Vite will start at: http://localhost:5173

Build for production:

npm run build


Preview build:

npm run preview

📡 API Base URL

All frontend requests are made to:

http://localhost:8000/api

🛠 Tech Stack

Backend:

Node.js + Express

TypeScript

MongoDB + Mongoose

JWT Authentication

Bcrypt (password hashing)

Frontend:

React (with Vite)

React Router DOM

Axios

TailwindCSS

React Toastify

🧪 Development Notes

Make sure MongoDB is running locally on port 27017 or update MONGO_URI in .env.

CORS is configured to allow requests from the client (http://localhost:5173).

To access admin-only routes, use the ADMIN_SECRET during setup.

✅ Scripts Quick Reference
Server
Command	Description
npm run dev	Start server with hot reload (ts-node-dev)
npm run build	Compile TypeScript to JS (dist/)
npm start	Run compiled server (dist/index.js)
Client
Command	Description
npm run dev	Start Vite dev server
npm run build	Build production frontend
npm run preview	Preview production build
