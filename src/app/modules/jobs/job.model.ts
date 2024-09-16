import { model, Schema } from "mongoose";
import { TAppliedJOb } from "./job.interface";

const appliedJobSchema = new Schema<TAppliedJOb>(
  {
    job: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "job",
    },
    resume: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "resume",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    applicationStatus: {
      type: String,
      enum: ["rejected", "approved", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const appliedJobModel = model("appliedJOb", appliedJobSchema);
