import { Request, Response, NextFunction, RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";
import httpStatus from "http-status";
import { UserModel } from "./user.model";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.createUser(req.body);

    res.status(httpStatus.OK).json({
      success: true,
      message: "user register successful",
      data: result,
    });
  }
);
const logInUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.loginUser(req.body);
    res.cookie("token", result);
    res.status(httpStatus.OK).json({
      success: true,
      message: "login successful",
      data: result,
    });
  }
);

const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserModel.find();
    res.status(httpStatus.OK).json({
      data: result,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      data: error,
    });
  }
};
export const userController = {
  createUser,
  logInUser,
  getAllUser
};
