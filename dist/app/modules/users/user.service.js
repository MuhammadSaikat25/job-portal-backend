"use strict";
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
exports.userService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("./user.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const createUser = (playLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(playLoad);
    return result;
});
const loginUser = (playLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.UserModel.findOne({ email: playLoad.email });
    if (!userExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const comparePassword = yield bcryptjs_1.default.compare(playLoad.password, userExist.password);
    if (!comparePassword) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const jwtPlayLoad = {
        _id: userExist._id,
        email: userExist.email,
        role: userExist.role,
        name: userExist.name,
    };
    const token = jsonwebtoken_1.default.sign(jwtPlayLoad, config_1.default.JWT, {
        expiresIn: "7d",
    });
    return token;
});
exports.userService = {
    createUser,
    loginUser,
};
