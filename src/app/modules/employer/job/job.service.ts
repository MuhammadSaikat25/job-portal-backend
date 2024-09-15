import { appliedJobModel } from "../../jobs/job.model";
import { CompanyModal } from "../create-company/company.modal";
import { TJob } from "./job.interface";
import { jobModel } from "./job.model";
import path from "path";
import ejs, { name } from "ejs";
import sendMail from "../../../../utils/sendMail";
import { UserModel } from "../../users/user.model";

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
      path: "resume",
      populate: {
        path: "candidateProfile",
      },
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
  const allJob = await jobModel.find().populate("company");
  const companyId = getCompany?._id.toString();
  const result = allJob.filter(
    (job) => job.company._id.toString() === companyId
  );
  return result;
};

const approvedApplication = async (id: string, companyEmail: string) => {
  const candidate = await appliedJobModel.findById(id).populate("user");

  const getCandidate = await UserModel.findById(candidate?.user?.id.toString());

  const company = await CompanyModal.findOne({ email: companyEmail });
  const image = company?.image;
  const companyName = company?.companyName;
  const result = await appliedJobModel.findByIdAndUpdate(id, {
    applicationStatus: "approved",
  });
  const mailData = {
    response: {
      image,
      companyName,
      candidateName: getCandidate?.name,
    },
  };

  const html = await ejs.renderFile(
    path.join(__dirname, "../../../../mail/approved-email.ejs"),
    mailData
  );
  await sendMail({
    email: getCandidate?.email as string,
    subject: "Update on Your Application",
    template: "approved-email.ejs",
    data: mailData,
    companyEmail,
  });

  return result;
};
const rejectApplication = async (id: string, companyEmail: string) => {
  const candidate = await appliedJobModel
    .findById(id)
    .populate("user")
    .populate("job");
  const getCandidate = await UserModel.findById(candidate?.user?.id.toString());

  const company = await CompanyModal.findOne({ email: companyEmail });
  const image = company?.image;
  const companyName = company?.companyName;

  const result = await appliedJobModel.findByIdAndUpdate(id, {
    applicationStatus: "rejected",
  });

  const mailData = {
    response: {
      image,
      companyName,
      candidateName: getCandidate?.name,
    },
  };
  const html = await ejs.renderFile(
    path.join(__dirname, "../../../../mail/rejected-email.ejs"),
    mailData
  );
  await sendMail({
    email: getCandidate?.email as string,
    subject: "Update on Your Application",
    template: "rejected-email.ejs",
    data: mailData,
    companyEmail,
  });
  return result;
};
const updateJob = async (playLoad: TJob, id: string) => {
  const result = await jobModel.findByIdAndUpdate(
    id,
    { ...playLoad },
    { new: true, upsert: true, runValidators: true }
  );
  return result;
};
export const jobService = {
  createJob,
  getAllApplicants,
  getCompanyAllJob,
  approvedApplication,
  rejectApplication,
  updateJob,
};
