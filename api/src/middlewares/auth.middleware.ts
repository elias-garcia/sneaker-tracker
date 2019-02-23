import { NextFunction, Request, Response } from "express";
import { firebaseAdmin } from "../services/firebase-admin.service";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.header("Authorization");

  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    const token = authHeader.split(" ")[1];

    try {
      const user = firebaseAdmin.auth().verifyIdToken(token);

      (req as any).user = user;

      return next();
    } catch (e) {
      return next(new Error("[AUTH] token not valid"));
    }
  } else {
    return next(new Error("[AUTH] type not valid"));
  }
}
