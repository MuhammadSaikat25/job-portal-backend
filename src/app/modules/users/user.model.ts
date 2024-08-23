import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const UserSchema = new Schema<TUser>({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  role: {
    type: String,
    enum: ["admin", "candidate", "employee"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

export const UserModel=model('user',UserSchema)