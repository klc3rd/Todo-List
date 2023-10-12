import express from "express";

import { fetchUser, createUser, loginUser } from "../controllers/users";

const router = express.Router();

router.post("/", createUser);
router.get("/info", fetchUser);
router.post("/login", loginUser);

export default router;
