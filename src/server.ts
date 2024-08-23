import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
}
main().catch((err) => console.log(err));
