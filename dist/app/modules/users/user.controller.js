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
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("./user.model");
const createUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.createUser(req.body);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "user register successful",
        data: result,
    });
}));
const logInUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.loginUser(req.body);
    res.cookie("token", result);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "login successful",
        data: result,
    });
}));
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_model_1.UserModel.find();
        res.status(http_status_1.default.OK).json({
            data: result,
        });
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).json({
            data: error,
        });
    }
});
exports.userController = {
    createUser,
    logInUser,
    getAllUser
};
