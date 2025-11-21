import express from "express";

import { createProfile, getProfile, updateProfile, deleteProfile } from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/create", createProfile);
router.get("/", getProfile);
router.put("/:profileId", updateProfile);
router.delete("/:profileId", deleteProfile);

export default router;


