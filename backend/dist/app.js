"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
dotenv_1.default.config();
const DEFAULT_CONNECTION = "mongodb://localhost:27017/todo";
const PORT = process.env.PORT || 5000;
const CONNECTION = process.env.CONNECTION || DEFAULT_CONNECTION;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/users", users_1.default);
mongoose_1.default.connect(CONNECTION).then(() => {
    console.log("Connected to DB");
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
