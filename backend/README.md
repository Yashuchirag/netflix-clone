# 🎬 Streaming App API

A RESTful backend API built with **Node.js** and **Express.js** for a movie and TV show streaming platform. It supports user authentication, browsing movies/TV shows, searching content, and user profile management — all backed by a MongoDB database.

---

## 📁 Project Structure

```
├── config/
│   ├── db.js               # MongoDB connection logic
│   └── envVars.js          # Environment variable definitions
├── middleware/
│   └── protectRoute.js     # JWT authentication middleware
├── routes/
│   ├── auth.route.js       # Authentication routes
│   ├── movie.route.js      # Movie-related routes (protected)
│   ├── tv.route.js         # TV show routes (protected)
│   ├── search.route.js     # Search routes (protected)
│   ├── public.route.js     # Public/unauthenticated routes
│   └── profile.route.js    # User profile routes (protected)
├── frontend/
│   └── dist/               # Built React frontend (served in production)
├── .env                    # Environment variables (not committed)
└── server.js               # App entry point
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm or yarn


### Environment Variables

Create a `.env` file in the root with the following keys:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development        # or "production"
```

> All environment variables are managed through `config/envVars.js` for consistency and type safety.

---

## 🧪 Running the App

### Development

```bash
npm run dev
```

The server will start on the port specified in `ENV_VARS.PORT` (default: `4000`).

### Production

```bash
NODE_ENV=production npm start
```

In production mode, the server also serves the built React frontend from `frontend/dist/` and handles client-side routing via a catch-all route.

---

## 🗺️ API Routes

### Base URL
```
http://localhost:4000/api/v1
```

### 🔓 Public Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| `*`    | `/auth/*`   | Registration, login, logout |
| `*`    | `/public/*` | Publicly accessible content |

### 🔐 Protected Routes
> All routes below require a valid JWT (sent via cookie).

| Method | Endpoint | Description |
|--------|----------|-------------|
| `*` | `/movie/*`   | Browse and fetch movie data |
| `*` | `/tv/*`      | Browse and fetch TV show data |
| `*` | `/search/*`  | Search across movies and TV shows |
| `*` | `/profile/*` | View and update user profile |

---

## 🔐 Authentication

Authentication is handled using **JWT tokens stored in HTTP-only cookies**.

- The `protectedRoute` middleware (in `middleware/protectRoute.js`) validates the cookie on every protected request.
- If the token is missing or invalid, the request is rejected with a `401 Unauthorized` response.
- Auth routes (`/api/v1/auth`) are publicly accessible and handle login, registration, and logout.

---

## 🗄️ Database

MongoDB is used as the primary database. The connection is established on server start via `connectDB()` from `config/db.js`.

```js
app.listen(PORT, () => {
    connectDB(); // connects to MongoDB after the server starts
});
```

---

## 🌐 Frontend Integration (Production)

In production, the Express server serves the compiled React app:

```js
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend", "dist")));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}
```

This catch-all route ensures that React Router handles all client-side navigation correctly when the app is deployed as a single binary.

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `dotenv` | Load environment variables from `.env` |
| `cookie-parser` | Parse cookies from incoming requests |
| `mongoose` *(implied)* | MongoDB ODM via `connectDB` |

---

## 🛡️ Security Notes

- JWT secrets should be long, random strings — never hardcoded.
- HTTP-only cookies prevent XSS access to tokens.
- Consider adding `helmet` and `rate-limiting` middleware for production hardening.
- Ensure `MONGO_URI` credentials are never committed to version control.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).