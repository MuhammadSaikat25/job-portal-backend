import { Router } from "express";
import { authValidation } from "../../../middlewares/auth";
import { companyController } from "./company.controller";
import { companySchema } from "./compnay.validation";
import { validateData } from "../../../middlewares/reqValidation";

const route = Router();
route.put(
  "/create-company",
  validateData(companySchema),
  companyController.createCompany
);

export const companyRoute = route;
