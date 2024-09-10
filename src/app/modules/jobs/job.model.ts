import { model, Schema } from "mongoose";
import { TAppliedJOb } from "./job.interface";

const appliedJobSchema = new Schema<TAppliedJOb>({
  job:{
    type: Schema.Types.ObjectId,
      required: true,
      ref: "jobs",
  },
  resume:{
    type: Schema.Types.ObjectId,
      required: true,
      ref: "resumes",
  },
  user:{
    type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
  }
});

export const appliedJobModel=model('appliedJOb',appliedJobSchema)