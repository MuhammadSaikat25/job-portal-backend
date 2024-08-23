import bcrypt from "bcryptjs";
import { UserModel } from "./user.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUser = async (playLoad: any) => {
  const result = await UserModel.create(playLoad);
  return result;
};

const loginUser = async (playLoad: any) => {
  const userExist = await UserModel.findOne({ email: playLoad.email });
  if (!userExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const comparePassword = await bcrypt.compare(
    playLoad.password,
    userExist.password
  );
  if (!comparePassword) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const jwtPlayLoad = {
    _id: userExist._id,
    email: userExist.email,
    role: userExist.role,
    name: userExist.name,
  };
  const token = jwt.sign(jwtPlayLoad, config.JWT as string, {
    expiresIn: "7d",
  });
  return token;
};
export const userService = {
  createUser,
  loginUser,
};
