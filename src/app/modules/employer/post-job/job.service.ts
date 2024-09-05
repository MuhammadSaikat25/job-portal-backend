import { TJob } from "./job.interface";
import { jobModel } from "./job.model";

const createJob = async (playLod: TJob) => {
  const result = await jobModel.create(playLod);
  return result;
};

export const jobService = {
  createJob,
};
