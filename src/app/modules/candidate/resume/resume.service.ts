import { TResume } from "./resume.interface";
import { ResumeModel } from "./resume.model";

const createResume = async (playLoad: TResume) => {
  const result = await ResumeModel.findOneAndUpdate(
    { email: playLoad.email },
    {
      ...playLoad,
    },
    { new: true, upsert: true, runValidators: true }
  );
  return result;
 
};
const getMyResume = async (email: string) => {
  const result = await ResumeModel.findOne({ email });
  return result;
};
export const resumeService = {
  createResume,
  getMyResume
};
