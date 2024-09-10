import { jobModel } from "../employer/post-job/job.model";
import { TAppliedJOb } from "./job.interface";
import { appliedJobModel } from "./job.model";

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

const getSingleJob = async (id: string) => {
  const result = await jobModel.findById(id).populate("company");
  if (!result) {
    throw new Error("Job not found");
  }

  const jobTitle = new RegExp(result.title, "i");
  const Jobs = await jobModel.find({ title: jobTitle }).populate("company");
  const matchingJobs = Jobs.filter(
    (job: any) => job._id.toString() == id.toString()
  );

  return {
    singleJob: result,
    matchingJobs,
  };
};

const appliedJOb = async (payload: TAppliedJOb) => {
  const result = await appliedJobModel.create(payload);

  const job = await jobModel.findById(payload.job);

  if (!job) {
    return;
  }

  const currentApplications = job.applied ?? 0;

  await jobModel.findByIdAndUpdate(payload.job, {
    applied: Number(currentApplications) + 1,
  });

  return result;
};

const singleAppliedJob = async (id: string, email: string) => {
  const allAppliedJob = await appliedJobModel.find();
  const result=allAppliedJob.find((job)=>job.job.toString()===id)
  return result;
};
export const jobService = {
  getAllJob,
  getSingleJob,
  appliedJOb,
  singleAppliedJob,
};
