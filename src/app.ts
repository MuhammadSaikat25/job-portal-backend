import express from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { userRoute } from "./app/modules/users/user.route";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Looking for job ?");
});
app.use("/api/v1", userRoute);

app.use(globalErrorHandler);
app.use(notFound);
export default app;
