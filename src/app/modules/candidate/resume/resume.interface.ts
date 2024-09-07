import { Types } from "mongoose";

export interface TResume {
  candidateProfile:Types.ObjectId,
  description:string,
  skill:[String],
  email: string;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    description: string;
  }>;
  works: Array<{
    positionName: string;
    company: string;
    year: string;
    description: string;
  }>;
  project: Array<{
    projectName: string;
    liveLink: string;
    year: string;
    description: string;
  }>;
}
