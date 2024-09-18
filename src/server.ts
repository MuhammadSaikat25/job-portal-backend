import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import { server } from "./socket/socket";

async function main() {
  await mongoose.connect(config.db as string);
  app.listen(config.port!, () => {
    console.log(`Example app listening on port ${config.port!}`);
    console.log("i have to solve get all job problem (filter by salary)");
  });
}
main().catch((err) => console.log(err));
