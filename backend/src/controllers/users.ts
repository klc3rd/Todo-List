import { Request, Response } from "express";
import bcrpyt from "bcrypt";

import { generateToken, retrieveUserFromToken } from "../utils/jwt";
import Err, { returnError } from "../models/err";
import { UserModel } from "../models/user-schema";
import { User } from "../models/user";

export const fetchUser = async (req: Request, res: Response) => {
  try {
    if (!req.headers.authorization) {
      throw new Err(401, "INVALID_TOKEN");
    }

    const token = req.headers.authorization.split(" ")[1];

    const user = retrieveUserFromToken(token, (error) => {
      throw new Err(406, error);
    });

    const foundUser = await UserModel.findOne({ email: user.email });

    if (!foundUser) {
      throw new Err(401, "USER_NOT_FOUND");
    }

    const returnUser: User = {
      id: foundUser!.id,
      email: foundUser!.email,
      rank: foundUser!.rank,
      createdOn: foundUser?.createdOn,
    };

    res.json(returnUser);
  } catch (error) {
    returnError(res, error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/;
    if (!emailRegex.test(email)) {
      throw new Err(400, "INVALID_EMAIL");
    }

    if (password.length < 8) {
      throw new Err(400, "PASSWORD_LENGTH");
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Err(400, "EMAIL_EXISTS");
    }

    const hashedPassword = await bcrpyt.hash(password, 10);

    const user = new UserModel({
      email,
      password: hashedPassword,
    });

    const retUser: User = await user.save();

    res.json({
      message: "REGISTRATION_SUCCESS",
      token: generateToken(retUser),
    });
  } catch (error) {
    returnError(res, error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const foundUser = await UserModel.findOne({ email });

    if (!foundUser) {
      throw new Err(401, "USER_NOT_FOUND");
    }

    if (!(await bcrpyt.compare(password, foundUser.password))) {
      throw new Err(401, "INCORRECT_PASSWORD");
    }

    const token = generateToken(foundUser);

    res.json({ message: "LOGGED_IN", token });
  } catch (error) {
    returnError(res, error);
  }
};
