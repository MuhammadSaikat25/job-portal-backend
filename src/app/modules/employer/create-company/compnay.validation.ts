import { z } from "zod";

export const companySchema = z.object({
  body: z.object({
    companyName: z.string(),
    email: z.string().email("Invalid email address"),
    phone: z.string(),
    website: z.string(),
    teamSize: z.string(),
    aboutCompany: z
      .array(z.string())
      .min(1, "At least one description is required"),
    CompanyDescription: z.string(),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    image: z.string().url("Invalid image URL"),
  }),
});
