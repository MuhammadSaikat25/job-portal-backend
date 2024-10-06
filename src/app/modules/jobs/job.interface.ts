import { Types } from "mongoose";

export interface TAppliedJOb {
  user: Types.ObjectId;
  resume: Types.ObjectId;
  job: Types.ObjectId;
  applicationStatus: "rejected" | "approved" | "pending";
}

export interface User {
  _id: Types.ObjectId;
  name: string;
  role: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppliedJob {
  _id: Types.ObjectId;
  job: Types.ObjectId;
  resume: Types.ObjectId;
  user: User;
  applicationStatus: "approved" | "pending" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}
