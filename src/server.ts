import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

async function main() {
  await mongoose.connect(config.db as string);
  app.listen(config.port!, () => {
    console.log(`Example app listening on port ${config.port!}`);
  });
}
main().catch((err) => console.log(err));
