import { NextFunction, Request, Response } from "express";

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log(err);
  if (err.name === "ValidationError") {
    return res.status(400).json();
  } else {
    return res.status(500).json(null);
  }
}
