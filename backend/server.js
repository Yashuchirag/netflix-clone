import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import publicRoutes from "./routes/public.route.js";

import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
import { protectedRoute } from "./middleware/protectRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/public", publicRoutes)
app.use("/api/v1/movie", protectedRoute, movieRoutes)
app.use("/api/v1/tv", protectedRoute, tvRoutes)
app.use("/api/v1/search", protectedRoute, searchRoutes)


app.listen(ENV_VARS.PORT || 4000, () => {
    console.log(`Server is running on port ${ENV_VARS.PORT}`);
    connectDB();
});
