# 🛒 TesloShop

**TesloShop** is a full-stack e-commerce application built with **React + TypeScript**, developed as part of my React course by Fernando Herrera **https://www.udemy.com/course/react-cero-experto/**.  
It includes a public shopping interface and an **admin dashboard** for managing products, users, and authentication.

This project was designed to reinforce key React ecosystem concepts such as:

- Routing and lazy loading  
- Query parameters and state persistence  
- Data fetching and mutations with **TanStack Query**  
- State management with **Zustand**  
- Authentication with **JWT** and role-based route protection  
- Form handling and validation with **react-hook-form**  
- Backend communication using **Axios** and **NestJS API**

---

## 🚀 Features

### 🛍️ Shop Module
- Product listing with pagination and filters  
- Dynamic product detail pages  
- Category-based navigation  
- Fully responsive UI using **Tailwind CSS + shadcn/ui**

### 🔐 Auth Module
- User login/logout with token persistence  
- Zustand global store for auth state  
- Token verification with Axios interceptors  
- Role-based route protection (user / admin)

### ⚙️ Admin Module
- Admin panel for managing products (CRUD)  
- Product creation and editing with form validation  
- Image upload preview and validation  
- Optimistic UI updates and cache synchronization  
- Product deletion with confirmation modal  

---

## 🧱 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React + TypeScript + Vite (SWC), TanStack Query, React Router, Zustand, Tailwind CSS, shadcn/ui |
| **Backend** | NestJS + PostgreSQL (Neon) |
| **Deployment** | Render (backend), Netlify (frontend) |
| **Utilities** | Axios, React Hook Form, Sonner (toast notifications) |

---

## ⚡ Setup & Installation

1. **Clone the repository**
2. **Rename .env.template to .env**
3. **Run the npm install command to install the dependencies.**
4. **Verify that the backend is running on port 3000.**
5. **Run the npm run dev command to start the development server.**
