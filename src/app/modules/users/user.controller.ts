import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";
import httpStatus from "http-status";

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
export const userController = {
  createUser,
  logInUser,
};
