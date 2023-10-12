import mongoose from "mongoose";

const ToDo = new mongoose.Schema({
  body: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
  },
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  rank: {
    type: Number,
    default: 1,
  },
  todos: [ToDo],
});

export const UserModel = mongoose.model("User", UserSchema);
