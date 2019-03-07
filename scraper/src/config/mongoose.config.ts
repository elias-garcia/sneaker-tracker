import * as mongoose from "mongoose";
import { scraperConfig } from "./scraper.config";

export async function configureMongoose() {
  mongoose.connection.on("connected", async () => {
    console.log(`[DB] mongoose connection open to ${scraperConfig.mongoUri}`);
  });

  mongoose.connection.on("error", (err) => {
    console.log(`[DB] Mongoose connection error: ${err}`);
  });

  await mongoose.connect(scraperConfig.mongoUri, { useNewUrlParser: true });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("[DB] mongoose connection disconnected through app termination");
      process.exit(0);
    });
  });
}
