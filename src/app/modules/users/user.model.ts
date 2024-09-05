import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcryptjs";

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userSchema = new Schema<TUser>(
  {
    name: String,
    role: {
      type: String,
      enum: ["admin", "candidate", "employer"],
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (email: string) {
          return emailRegex.test(email);
        },
        message: "please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
export const UserModel = model("user", userSchema);
