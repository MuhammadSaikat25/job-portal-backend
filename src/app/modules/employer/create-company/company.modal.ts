import { model, Schema } from "mongoose";
import { TCompany } from "./company.interface";

const companySchema = new Schema<TCompany>(
  {
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String, default: "" },
    teamSize: { type: String, required: true },
    aboutCompany: { type: [String], required: true },
    CompanyDescription: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const CompanyModal = model<TCompany>("company", companySchema);
