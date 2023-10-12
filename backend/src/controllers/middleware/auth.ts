import { Response, NextFunction } from "express";

import { retrieveUserFromToken } from "../../utils/jwt";
import { UserModel } from "../../models/user-schema";
import Err, { returnError } from "../../models/err";

export const getAuthUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Err(406, "INVALID_TOKEN");
    }

    const userInfo = retrieveUserFromToken(token, (err) => {
      throw new Err(406, err);
    });

    const foundUser = await UserModel.findOne({ email: userInfo.email });

    if (!foundUser) {
      throw new Err(400, "INVALID_USER");
    }

    req.user = {
      email: foundUser.email,
      rank: foundUser.rank,
    };

    next();
  } catch (error) {
    returnError(res, error);
  }
};
