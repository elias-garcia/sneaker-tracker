import { Request, Response } from "express";
import { IError } from "../interfaces/error.interface";
import { rollbar } from "../services/rollbar.service";

export function errorHandlerMiddleware(
  err: IError,
  _: Request,
  res: Response,
): Response {
  const error = {
    message: err.message,
    status: err.status,
  };

  rollbar[err.type](err.message);

  return res.status(err.status)
    .json({ error });
}
