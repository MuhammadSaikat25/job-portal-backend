import { model, Schema } from "mongoose";
import { TResume } from "./resume.interface";

const educationSchema = new Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
});

const worksSchema = new Schema({
  positionName: { type: String, required: true },
  company: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
});

const projectSchema = new Schema({
  projectName: { type: String, required: true },
  liveLink: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
});

const resumeSchema = new Schema<TResume>(
  {
    email: String,
    description: String,
    candidateProfile: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "candidateProfile",
    },
    skill: [String],
    education: [educationSchema],
    works: [worksSchema],
    project: [projectSchema],
  },
  {
    timestamps: true,
  }
);

export const ResumeModel = model("resume", resumeSchema);
