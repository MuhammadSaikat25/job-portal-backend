import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../error/AppError";
import { UserModel } from "../modules/users/user.model";

export interface TRequest extends Request {
  user?: JwtPayload;
}

export const authValidation = (...UserRole: string[]) => {
  return async (req: TRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return next(new AppError(400, "you are unauthorize"));
      }

      const decoded = jwt.verify(
        token as string,
        process.env.JWT as string
      ) as JwtPayload;

      const userExist = await UserModel.findOne({ email: decoded.email });

      if (!userExist) {
        return next(new AppError(400, "You have no access to this route"));
      }

      if (UserRole && !UserRole.includes(decoded.role)) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "You have no access to this route",
        });
      }

      req.user = decoded as JwtPayload;
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};
