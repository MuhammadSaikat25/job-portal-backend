import { TCompany } from "./company.interface";
import { CompanyModal } from "./company.modal";

const createCompany = async (Payload: TCompany) => {
  const result = await CompanyModal.findOneAndUpdate(
    { email: Payload.email },
    {
      ...Payload,
    },
    { new: true, upsert: true, runValidators: true }
  );
  return result
};
export const companyService = {
  createCompany,
};
