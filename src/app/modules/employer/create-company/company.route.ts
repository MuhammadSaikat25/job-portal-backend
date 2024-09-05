import { Router } from "express";
import { authValidation } from "../../../middlewares/auth";
import { companyController } from "./company.controller";
import { companySchema } from "./compnay.validation";
import { validateData } from "../../../middlewares/reqValidation";
import { USER_ROLE } from "../../users/user.const";

const route = Router();
route.put(
  "/create-company",
  authValidation(USER_ROLE.employer),
  validateData(companySchema),
  companyController.createCompany
);
route.get('/get-my-company',authValidation('employer'),companyController.getMyCompany)

export const companyRoute = route;
