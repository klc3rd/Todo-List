import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import UserRouter from "./routes/users";
import TodoRouter from "./routes/todos";

dotenv.config();

const DEFAULT_CONNECTION = "mongodb://localhost:27017/todo";

const PORT = process.env.PORT || 5000;
const CONNECTION = process.env.CONNECTION || DEFAULT_CONNECTION;

const app = express();

app.use(bodyParser.json());
app.use("/users", UserRouter);
app.use("/todos", TodoRouter);

mongoose.connect(CONNECTION).then(() => {
  console.log("Connected to DB");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
