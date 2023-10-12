import mongoose from "mongoose";

const ToDo = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  completedOn: {
    type: Date,
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
