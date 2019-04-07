import { NextFunction, Request, Response } from "express";

export function createShop(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return res.status(200).json({ hello: "world" });
}
