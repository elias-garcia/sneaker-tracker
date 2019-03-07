import * as mongoose from "mongoose";
import { Sneaker } from "../../../shared/src";
import { rollbar } from "../services/rollbar.service";
import { apiConfig } from "./api.config";

export async function configureMongoose() {
  mongoose.connection.on("connected", async () => {
    console.log("connected");
    rollbar.debug(`[DB] mongoose connection open to ${apiConfig.mongoUri}`);
  });

  mongoose.connection.on("error", (err) => {
    rollbar.error(`[DB] Mongoose connection error: ${err}`);
  });

  await mongoose.connect(apiConfig.mongoUri, { useNewUrlParser: true });

  try {
    await Sneaker.create({ name: "asd", ref: "asd" });
  } catch (e) {
    console.log(e);
  }

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      rollbar.debug("[DB] mongoose connection disconnected through app termination");
      process.exit(0);
    });
  });
}
