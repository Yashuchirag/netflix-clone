import express from "express";
import { getTrendingContent } from "../controllers/public.controller.js";

const router = express.Router();

router.get("/trending", getTrendingContent);

export default router;
