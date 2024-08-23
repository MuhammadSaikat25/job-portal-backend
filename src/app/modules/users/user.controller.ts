import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await userService.createUser(req.body)
   
  }
);

export const userController = {
  createUser,
};
