import { config } from "dotenv";

if (process.env.NODE_ENV === "development") {
  config();
}

export const scraperConfig = {
  bugsnagApiKey: process.env.BUGNSAG_API_KEY,
  mongoUri: process.env.MONGO_URI,
  production: process.env.NODE_ENV === "production" ? true : false,
};
