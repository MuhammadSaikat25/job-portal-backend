import { Router } from "express";
import { userController } from "./user.controller";

import { createUserValidation } from "./user.validation";
import { validateData } from "../../middlewares/reqValidation";
const router = Router();

router.post(
  "/create-user",
  validateData(createUserValidation),
  userController.createUser
);
router.post("/login-user", userController.logInUser);
router.get('/get-all-user',userController.getAllUser)
export const userRoute = router;
