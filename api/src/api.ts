import * as express from "express";
import { apiConfig } from "./config/api.config";
import { authMiddleware } from "./middlewares/auth.middleware";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";
import { configureFirebaseAdmin } from "./services/firebase-admin.service";
import { configureRollbar, rollbar } from "./services/rollbar.service";

const app: express.Express = express();

configureFirebaseAdmin();
configureRollbar();

app.use([
  authMiddleware,
  errorHandlerMiddleware,
]);

app.listen(apiConfig.port, () => {
  rollbar.debug(`[SERVER] started on port ${apiConfig.port}`);
});
