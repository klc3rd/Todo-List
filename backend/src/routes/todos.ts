import { getAuthUser } from "./../controllers/middleware/auth";
import express from "express";
import { createTodo, fetchAllTodos } from "../controllers/todos";

const router = express.Router();

router.get("/", getAuthUser, fetchAllTodos);
router.post("/", getAuthUser, createTodo);

export default router;
