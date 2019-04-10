import { Request, Response } from "express";

export function notImplementedMiddleware(
  _: Request,
  res: Response,
) {
  return res.status(501).json();
}
