import { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";

export async function authMiddleware(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  const authHeader = req.header("Authorization");

  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    const token = authHeader.split(" ")[1];

    try {
      const user: admin.auth.DecodedIdToken =
        await admin.auth().verifyIdToken(token, true);

      (req as any).user = user;

      return next();
    } catch (e) {
      return next(new Error(`[AUTH] ${(e as admin.FirebaseError).message}`));
    }
  } else {
    return next(new Error("[AUTH] type not valid"));
  }
}
