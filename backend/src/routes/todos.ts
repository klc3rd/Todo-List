import { getAuthUser } from "./../controllers/middleware/auth";
import express from "express";
import { createTodo, fetchAllTodos, fetchTodo } from "../controllers/todos";

const router = express.Router();

router.get("/", getAuthUser, fetchAllTodos);
router.post("/", getAuthUser, createTodo);
router.get("/:id", getAuthUser, fetchTodo);

export default router;
