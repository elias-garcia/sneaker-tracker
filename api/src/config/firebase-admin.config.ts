import * as admin from "firebase-admin";
import { apiConfig } from "./api.config";

export function configureFirebaseAdmin(): void {
  admin.initializeApp({
    credential: admin.credential.cert(apiConfig.firebase),
  });
}
