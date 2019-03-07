import * as Rollbar from "rollbar";
import { apiConfig } from "../config/api.config";

export let rollbar: Rollbar;

export function configureRollbar(): void {
  rollbar = new Rollbar({
    accessToken: apiConfig.rollbarToken,
    captureUncaught: true,
    captureUnhandledRejections: true,
    enabled: apiConfig.production,
  });
}
