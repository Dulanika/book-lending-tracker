# 📚 MERN Book Management App

A full-stack web application that allows authenticated users to manage their personal book collection, lend books to others, and track lending history. Built using the MERN stack (MongoDB, Express.js, React, Node.js) with modern tooling like Tailwind CSS and Docker.

---

## 🚀 Problem Being Solved

Managing personal book collections manually or with spreadsheets is inefficient and lacks collaboration. This project provides a simple, responsive web app where users can:

- 🔐 Register & log in securely
- 📖 Add new books with title, author, and genre
- 📄 View a list of all books
- 🗑️ Delete or update book entries

---

## 📌 Key Features

- ✅ **Add a Book** with title, author, genre, and custom tags
- 🔄 **Update / Delete** book entries
- 📤 **Lend a Book** to someone by entering:
  - Borrower's name
  - Lend date
  - Expected return date
- 📜 **View Lending History** of each book
- ✔️ **Mark Book as Returned**
- 📊 **Dashboard** shows:
  - 📚 Total books owned
  - 📕 Currently borrowed books
  - ⏰ Overdue books based on expected return date

---

## 🧰 Tech Stack

### ✅ Frontend
- React 19
- React Router v7
- Axios (for API requests)
- React Toastify (notifications)
- Tailwind CSS
- Vite (for fast dev builds)

### ✅ Backend
- Node.js 20.15
- Express.js 5
- MongoDB + Mongoose
- JSON Web Tokens (JWT) for auth
- bcrypt for password hashing
- CORS and dotenv

### ✅ Dev Tools
- ESLint for linting
- Nodemon for dev server auto-reloading

### ✅ Dockerized
- Backend & frontend containers
- MongoDB as a service

---

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git [clone https://github.com/Dulanika/book-lending-tracker.git]
cd mern-book-app

2. Backend Setup
cd backend
npm install
Backend will run on http://localhost:5000

### 🔐 Environment Variables

Create a `.env` file in the `/root` `/backend` `/forntend` directory with the following structure:
Start the backend:
npm run dev

3. Frontend Setup
cd ../frontend
npm install
npm run dev
Frontend will run on http://localhost:5173

📂 Folder Structure
mern-book-app/
│
├── backend/
│   ├── src/
│   └── .env
│
├── frontend/
│   └── src/
|   └── .env
│
├── docker-compose.yml
|── .env
└── README.md
