import { model, Schema } from "mongoose";
import { TJob } from "./job.interface";

const JobSchema = new Schema<TJob>(
  {
    company: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "company",
    },
    country: { type: String, required: true },
    deadline: { type: String, required: true },
    description: { type: String, required: true },
    experience: { type: String, required: true },
    gender: { type: String, required: true },
    jobType: { type: String, required: true },
    position: { type: String, required: true },
    responsibilities: { type: [String], required: true },
    salary: { type: String, required: true },
    skills: { type: [String], required: true },
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const jobModel = model<TJob>("job", JobSchema);
