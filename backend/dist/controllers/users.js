"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = exports.fetchUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../helpers/jwt");
const err_1 = __importStar(require("../models/err"));
const user_schema_1 = require("../models/user-schema");
const fetchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization) {
            throw new err_1.default(401, "INVALID_TOKEN");
        }
        const token = req.headers.authorization.split(" ")[1];
        const user = (0, jwt_1.retrieveUserFromToken)(token, (error) => {
            throw new err_1.default(406, error);
        });
        const foundUser = yield user_schema_1.UserModel.findOne({ email: user.email });
        if (!foundUser) {
            return new err_1.default(401, "USER_NOT_FOUND");
        }
        const returnUser = {
            id: foundUser.id,
            email: foundUser.email,
            rank: foundUser.rank,
            createdOn: foundUser === null || foundUser === void 0 ? void 0 : foundUser.createdOn,
        };
        res.json(returnUser);
    }
    catch (error) {
        (0, err_1.returnError)(res, error);
    }
});
exports.fetchUser = fetchUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/;
        if (!emailRegex.test(email)) {
            throw new err_1.default(400, "INVALID_EMAIL");
        }
        if (password.length < 8) {
            throw new err_1.default(400, "PASSWORD_LENGTH");
        }
        const existingUser = yield user_schema_1.UserModel.findOne({ email });
        if (existingUser) {
            throw new err_1.default(400, "EMAIL_EXISTS");
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new user_schema_1.UserModel({
            email,
            password: hashedPassword,
        });
        const retUser = yield user.save();
        res.json({
            message: "REGISTRATION_SUCCESS",
            token: (0, jwt_1.generateToken)(retUser),
        });
        return;
    }
    catch (error) {
        (0, err_1.returnError)(res, error);
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const foundUser = yield user_schema_1.UserModel.findOne({ email });
        if (!foundUser) {
            throw new err_1.default(401, "USER_NOT_FOUND");
        }
        if (!(yield bcrypt_1.default.compare(password, foundUser.password))) {
            throw new err_1.default(401, "INCORRECT_PASSWORD");
        }
        const token = (0, jwt_1.generateToken)(foundUser);
        res.json({ message: "LOGGED_IN", token });
    }
    catch (error) {
        (0, err_1.returnError)(res, error);
    }
});
exports.loginUser = loginUser;
