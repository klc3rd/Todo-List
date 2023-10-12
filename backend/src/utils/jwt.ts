import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const generateToken = (user: User) => {
  const newUser = {
    email: user.email,
    rank: user.rank ? user.rank : 1,
  };

  return jwt.sign({ user: newUser }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
};

export const retrieveUserFromToken = (
  token: string,
  handleError: (error: string) => void
) => {
  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken.user;
  } catch (error) {
    handleError("INVALID_TOKEN");
  }
};
