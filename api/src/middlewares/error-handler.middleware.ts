import { IError } from "../interfaces/error.interface";
import { rollbar } from "../services/rollbar.service";

export function errorHandlerMiddleware(
  err: IError,
): void {
  rollbar[err.type](err.message);
}
