import { appliedJobModel } from "../../jobs/job.model";
import { CompanyModal } from "../create-company/company.modal";
import { TJob } from "./job.interface";
import { jobModel } from "./job.model";

const createJob = async (playLod: TJob) => {
  const result = await jobModel.create(playLod);
  return result;
};
const getAllApplicants = async (email: string) => {
  const getAllApplicants = await appliedJobModel
    .find()
    .populate({
      path: "job",
      populate: {
        path: "company",
      },
    })
    .populate({
      path:"resume",
      populate:{
        path:"candidateProfile"
      }
    })
    .populate({
      path: "user",
      select: "-password",
    });

  const myApplicants = getAllApplicants.filter(
    (job: any) => job.job.company.email === email
  );

  return myApplicants;
};

const getCompanyAllJob = async (email: string) => {
  const getCompany = await CompanyModal.findOne({ email });
  const allJob = await jobModel.find();
  const companyId = getCompany?._id.toString();
  const result = allJob.filter((job) => job.company.toString() === companyId);
  return result;
};
export const jobService = {
  createJob,
  getAllApplicants,
  getCompanyAllJob,
};
