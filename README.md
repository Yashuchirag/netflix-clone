# 🎬 Netflix Clone by Chirag

A full-stack **Netflix Clone** built using the **MERN stack** with modern UI powered by **React, TailwindCSS, Zustand**, and **Vite** — complete with authentication, movie streaming previews, and responsive design.

---

## 🚀 Features

- 🔐 **Authentication** with JWT & Bcrypt  
- 🎞️ **Movie browsing** with categorized listings  
- ❤️ **Watchlist** management with user profiles  
- 📱 **Responsive UI** (mobile-first with TailwindCSS + DaisyUI)  
- ⚡ **React Query** for blazing-fast API caching  
- 🍪 **Cookie-based session handling**  
- 🧠 **Zustand store** for lightweight global state management  
- 🎥 **React Player** for embedded video previews  

---

## 🧩 Tech Stack

### **Frontend**
- ⚛️ React 19  
- ⚡ Vite  
- 🎨 TailwindCSS + DaisyUI  
- 🔄 React Query + Zustand  
- 🔔 React Hot Toast / React Toastify for notifications  

### **Backend**
- 🧠 Node.js + Express 5  
- 🗄️ MongoDB + Mongoose  
- 🔐 JWT Authentication  
- 🧂 Bcrypt for password hashing  
- 🌍 RESTful API structure  

---

## 📁 Project Structure

```
netflix-clone/
│
├── backend/                # Express backend server
│   ├── server.js           # Main entry file
│   ├── config/             # MongoDB connection, environment setup
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routes (auth, movies, etc.)
│   ├── controllers/        # Business logic
│   └── middleware/         # Auth, error handling
│
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages (Home, Login, etc.)
│   │   ├── store/          # Zustand store
│   │   ├── hooks/          # Custom hooks (React Query, Auth)
│   │   └── App.jsx         # Root component
│   ├── index.html
│   └── vite.config.js
│
└── package.json            # Root scripts for build and dev
```

---

## ⚙️ Setup & Installation

### 🧱 Prerequisites
- Node.js (v18 or later)
- MongoDB instance (local or Atlas)
- npm or yarn

---

### 🪄 1. Clone the repository

```bash
git clone https://github.com/Yashuchirag/netflix-clone.git
cd netflix-clone
```

---

### 🧰 2. Install dependencies

```bash
# Root
npm install

# Frontend
cd frontend
npm install
```

---

### 🔑 3. Configure Environment Variables

Create a `.env` file inside `/backend`:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
COOKIE_SECRET=your_cookie_secret
```

---

### 🧪 4. Run the development servers

#### Run backend (Express)
```bash
npm run dev
```

#### Run frontend (React + Vite)
```bash
cd frontend
npm run dev
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:5000`

---

## 🏗️ Build for Production

To build both frontend and backend:

```bash
npm run build
```

This command will:
- Install dependencies
- Build the React app under `/frontend/dist`
- Prepare everything for production deployment

Start the production server:

```bash
npm start
```

---

## 🚀 Deployment Tips

### 🧩 Netlify (Frontend)
- Set the build command: `npm run build`
- Publish directory: `frontend/dist`

### ☁️ Render / Railway / Vercel (Backend)
- Point the start command to:  
  ```bash
  npm start
  ```
- Make sure `.env` variables are set in your dashboard.

---

## 🧑‍💻 Scripts Overview

| Command | Description |
|----------|-------------|
| `npm run dev` | Run backend in dev mode (nodemon) |
| `npm start` | Run backend in production mode |
| `npm run build` | Build both backend and frontend |
| `cd frontend && npm run dev` | Start frontend dev server |
| `cd frontend && npm run build` | Build frontend for production |

---

## 🧠 Future Enhancements
- 🔎 Search and filter movies by genre
- 💬 Comments and ratings system
- 🌐 Multi-language support
- 📊 Admin dashboard for movie management

---

## 💡 Author

**Chirag Chandrashekar**  
💼 Full-Stack Developer | UI/UX Enthusiast  
🌐 [Portfolio](https://www.chiragch.com)  
📧 [Email](mailto:chiragchandrashekar@gmail.com)

Netflix is hosted at https://netflix-clone.chiragch.com/ or https://netflix-clone-cwrx.onrender.com/

---

## 🪪 License

This project is licensed under the **ISC License**.

---

### ⭐ If you found this helpful, don’t forget to give it a star on GitHub!
