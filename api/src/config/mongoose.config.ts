import * as mongoose from "mongoose";
import { rollbar } from "../services/rollbar.service";
import { apiConfig } from "./api.config";

export async function configureMongoose() {
  mongoose.connection.on("connected", async () => {
    rollbar.debug(`[DB] mongoose connection open to ${apiConfig.mongoUri}`);
  });

  mongoose.connection.on("error", (err) => {
    rollbar.error(`[DB] Mongoose connection error: ${err}`);
  });

  await mongoose.connect(apiConfig.mongoUri, { useNewUrlParser: true });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      rollbar.debug("[DB] mongoose connection disconnected through app termination");
      process.exit(0);
    });
  });
}
