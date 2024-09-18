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
exports.authValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../error/AppError"));
const user_model_1 = require("../modules/users/user.model");
const authValidation = (...UserRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return next(new AppError_1.default(400, "you are unauthorize"));
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT);
            const userExist = yield user_model_1.UserModel.findOne({ email: decoded.email });
            if (!userExist) {
                return next(new AppError_1.default(400, "You have no access to this route"));
            }
            if (UserRole && !UserRole.includes(decoded.role)) {
                return res.status(401).json({
                    success: false,
                    statusCode: 401,
                    message: "You have no access to this route",
                });
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    });
};
exports.authValidation = authValidation;
