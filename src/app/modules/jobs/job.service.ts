import { jobModel } from "../employer/job/job.model";
import { UserModel } from "../users/user.model";
import { TAppliedJOb } from "./job.interface";
import { appliedJobModel } from "./job.model";
import mongoose from "mongoose";

const getAllJob = async (query: any) => {
  const { jobType, jobPosition, experience, salary } = query;

  const filter: any = {};

  if (jobType) filter.jobType = new RegExp(jobType, "i");
  if (jobPosition) filter.position = new RegExp(jobPosition, "i");
  if (experience) filter.experience = experience;

  if (salary && salary.includes(",")) {
    const salaryRange = salary.split(",").map(Number);
    // filter.salary = {
    //   $gte: salaryRange[0],
    //   $lte: salaryRange[1],
    // };
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
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const loginUser = user._id;
  const allAppliedJob = await appliedJobModel.find({
    user: new mongoose.Types.ObjectId(loginUser),
    job: new mongoose.Types.ObjectId(id),
  });

  return allAppliedJob;
};
const getAllAppliedJob = async (email: string) => {
  const getCandidate = await UserModel.findOne({ email });
  const getCandidateApplied = await appliedJobModel
    .find({
      user: getCandidate?._id,
    })
    .populate("resume")
    .populate("user")
    .populate({
      path: "job",
      populate: {
        path: "company",
      },
    });

  return getCandidateApplied;
};
const popularJob = async () => {
  const result = await jobModel.find().populate("company");
  const popularJob = result
    .sort((a, b) => Number(b.applied) - Number(a.applied))
    .slice(0, 6);
  return popularJob;
};

export const jobService = {
  getAllJob,
  getSingleJob,
  appliedJOb,
  singleAppliedJob,
  getAllAppliedJob,
  popularJob,
};
