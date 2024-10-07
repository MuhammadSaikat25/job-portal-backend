import { jobModel } from "../employer/job/job.model";
import { UserModel } from "../users/user.model";
import { AppliedJob, TAppliedJOb } from "./job.interface";
import { appliedJobModel } from "./job.model";
import mongoose from "mongoose";

const getAllJob = async (query: any) => {
  const {
    jobType,
    jobPosition,
    experience,
    salary,
    limit = 10,
    page = 1,
  } = query || {};
  const filter: any = {};

  if (jobType) {
    filter.jobType = {
      $in: jobType
        .split(",")
        .map((type: string) => new RegExp(type.trim(), "i")),
    };
  }

  if (jobPosition) {
    filter.position = {
      $in: jobPosition
        .split(",")
        .map((position: string) => new RegExp(position.trim(), "i")),
    };
  }

  if (experience) {
    filter.experience = {
      $in: experience.split(",").map((exp: string) => exp.trim()),
    };
  }

  if (salary) {
    const salaryArray = salary.split(",").map(Number);
    if (
      salaryArray.length === 2 &&
      !isNaN(salaryArray[0]) &&
      !isNaN(salaryArray[1])
    ) {
      filter.salary = {
        $gte: salaryArray[0],
        $lte: salaryArray[1],
      };
    }
  }

  const skip = (page - 1) * (limit || 10);

  const totalJob = await jobModel.countDocuments();

  const result = await jobModel
    .find(filter)
    .populate("company")
    .skip(skip)
    .limit(limit);

  return {
    result,
    totalJob,
  };
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

const candidateOverview = async (email: string) => {
  const allAppliedJob = await appliedJobModel.find().populate("user");

  const myAppliedJob = allAppliedJob.filter(
    (applied: any) => applied.user.email === email
  );

  const approved = myAppliedJob.filter(
    (applied) => applied.applicationStatus === "approved"
  );
  const pending = myAppliedJob.filter(
    (applied) => applied.applicationStatus === "pending"
  );
  const rejected = myAppliedJob.filter(
    (applied) => applied.applicationStatus === "rejected"
  );
  const applications = myAppliedJob;

  const analytics: { [key: string]: number } = {};

  for (let month = 0; month < 12; month++) {
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth() - month, 1);
    const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    analytics[yearMonth] = 0;
  }

  applications.forEach((app: any) => {
    const createdAt = new Date(app.createdAt);

    const yearMonth = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    if (analytics[yearMonth] !== undefined) {
      analytics[yearMonth]++;
    }
  });

  return {
    myAppliedJob,
    approved,
    pending,
    rejected,
    analytics,
  };
};

const searchJob = async (query: any) => {
  const { title, location } = query;

  const searchConditions: any[] = [];

  if (title && typeof title === "string") {
    searchConditions.push({ title: { $regex: title, $options: "i" } });
  }

  if (location && typeof location === "string") {
    searchConditions.push({ country: { $regex: location, $options: "i" } });
  }

  if (searchConditions.length > 0) {
    const result = await jobModel
      .find({
        $or: searchConditions,
      })
      .populate("company");
    return result;
  } else {
    return [];
  }
};

export const jobService = {
  getAllJob,
  getSingleJob,
  appliedJOb,
  singleAppliedJob,
  getAllAppliedJob,
  popularJob,
  candidateOverview,
  searchJob,
};
