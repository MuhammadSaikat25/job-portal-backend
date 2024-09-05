import { Types } from "mongoose";

export interface TJob {
    company:Types.ObjectId
  country: string;
  deadline: string;
  description: string;
  experience: string;
  gender: string;
  jobType: string;
  position: string;
  responsibilities: string[];
  salary: string;
  skills: string[];
  title: string;
}
