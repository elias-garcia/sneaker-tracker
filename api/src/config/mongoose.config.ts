import * as mongoose from "mongoose";
import { apiConfig } from "./api.config";

export async function configureMongoose() {
  mongoose.connection.on("connected", async () => {
    console.log(`[db] mongoose connection open to ${apiConfig.mongoUri}`);
  });

  mongoose.connection.on("error", (err) => {
    console.log(`[db] Mongoose connection error: ${err}`);
    process.exit(1);
  });

  await mongoose.connect(apiConfig.mongoUri, { useNewUrlParser: true });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("[db] mongoose connection disconnected through app termination");
      process.exit(0);
    });
  });
}
