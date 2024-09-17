import { Router } from "express";
import { authValidation } from "../../middlewares/auth";
import { messageController } from "./message.controller";

const route = Router();
route.post(
  "/send-message/:id",
  authValidation("candidate", "employer"),
  messageController.sendMessage
);

route.get(
  "/get-massage/:id",
  authValidation("candidate", "employer"),
  messageController.getMessages
);
export const messageRouter = route;
