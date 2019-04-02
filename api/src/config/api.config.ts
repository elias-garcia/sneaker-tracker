// tslint:disable:max-line-length
import { config } from "dotenv";

if (process.env.NODE_ENV === "development") {
  config();
}

export const apiConfig = {
  apiPath: process.env.API_PATH,
  bugsnagApiKey: process.env.BUGSNAG_API_KEY,
  firebase: {
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    projectId: process.env.FIREBASE_PROJECT_ID,
  },
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT,
};
