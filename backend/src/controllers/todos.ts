import { Response } from "express";
import { Todo } from "../models/todo";
import { UserModel } from "../models/user-schema";
import Err, { returnError } from "../models/err";

export const createTodo = async (req: any, res: Response) => {
  try {
    const email = req.user.email;

    const todo: Todo = {
      title: req.body.title,
      body: req.body.body,
    };

    if (!todo.title) {
      throw new Err(400, "INVALID_TITLE");
    }

    if (!todo.body) {
      throw new Err(400, "INVALID_BODY");
    }

    const foundUser = await UserModel.findOne({ email });

    if (!foundUser) {
      throw new Err(400, "INVALID_USER");
    }

    foundUser.todos.push(todo);
    await foundUser.save();

    res.json(todo);
  } catch (error) {
    returnError(res, error);
  }
};

export const fetchAllTodos = async (req: any, res: Response) => {
  try {
    const email = req.user.email;

    const foundUser = await UserModel.findOne({ email });

    if (!foundUser) {
      throw new Err(400, "INVALID_USER");
    }

    const todos = foundUser.todos;

    res.json(todos);
  } catch (error) {
    returnError(res, error);
  }
};
