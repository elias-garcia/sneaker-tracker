import bugsnag, { Bugsnag } from "@bugsnag/js";
import bugsnagExpress from "@bugsnag/plugin-express";
import * as express from "express";
import { Gender } from "shared";
import { apiConfig } from "./config/api.config";
import { configureFirebaseAdmin } from "./config/firebase-admin.config";
import { configureMongoose } from "./config/mongoose.config";
import { routes } from "./routes";

const app: express.Express = express();
const bugsnagClient: Bugsnag.Client = bugsnag(apiConfig.bugsnagApiKey);

bugsnagClient.use(bugsnagExpress);
const asd: Gender;
const bugsnagMiddleware = bugsnagClient.getPlugin("express");

(async () => {
  await configureMongoose();
  configureFirebaseAdmin();
  app.use(bugsnagMiddleware.requestHandler);
  app.use(express.json());
  app.use(apiConfig.apiPath, routes);
  app.use(bugsnagMiddleware.errorHandler);
  app.listen(apiConfig.port, () => {
    console.log(`[server] started on port ${apiConfig.port}`);
  });
})();
