import { ObjectId } from "mongoose";

export interface User {
  id?: string;
  email: string;
  password?: string;
  createdOn?: Date;
  rank?: number;
}
