"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveUserFromToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => {
    const newUser = {
        email: user.email,
        rank: user.rank ? user.rank : 1,
    };
    return jsonwebtoken_1.default.sign({ user: newUser }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};
exports.generateToken = generateToken;
const retrieveUserFromToken = (token, handleError) => {
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return decodedToken.user;
    }
    catch (error) {
        handleError("INVALID_TOKEN");
    }
};
exports.retrieveUserFromToken = retrieveUserFromToken;
