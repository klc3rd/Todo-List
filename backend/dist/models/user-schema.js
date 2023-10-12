"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ToDo = new mongoose_1.default.Schema({
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
const UserSchema = new mongoose_1.default.Schema({
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
exports.UserModel = mongoose_1.default.model("User", UserSchema);
