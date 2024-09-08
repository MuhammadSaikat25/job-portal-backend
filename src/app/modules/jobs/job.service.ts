import { jobModel } from "../employer/post-job/job.model";

const getAllJob = async (query: any) => {
  const { jobType, jobPosition, experience, salary } = query;

  const filter: any = {};

  if (jobType) filter.jobType = new RegExp(jobType, "i");
  if (jobPosition) filter.position = new RegExp(jobPosition, "i");
  if (experience) filter.experience = experience;

  if (salary && salary.includes(",")) {
    const salaryRange = salary.split(",").map(Number);
    filter.salary = {
      $gte: salaryRange[0],
      $lte: salaryRange[1],
    };
  }


  const result = await jobModel.find(filter).populate("company");
  return result;
};

export const jobService = {
  getAllJob,
};
