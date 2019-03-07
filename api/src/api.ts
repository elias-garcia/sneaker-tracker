import * as express from "express";
import { apiConfig } from "./config/api.config";
import { configureFirebaseAdmin } from "./config/firebase-admin.config";
import { configureMongoose } from "./config/mongoose.config";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";
import { routes } from "./routes";
import { configureRollbar, rollbar } from "./services/rollbar.service";

const app: express.Express = express();

(async () => {
  configureRollbar();
  await configureMongoose();
  configureFirebaseAdmin();

  app.use(express.json());

  app.use(apiConfig.apiPath, routes);

  app.use(errorHandlerMiddleware);

  app.listen(apiConfig.port, () => {
    rollbar.debug(`[SERVER] started on port ${apiConfig.port}`);
  });

})();
