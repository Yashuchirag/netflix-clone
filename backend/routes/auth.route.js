import express from "express";
import { protectedRoute } from "../middleware/protectRoute.js";
import { authCheck, signup, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

router.get("/authCheck", protectedRoute, authCheck);

export default router;
