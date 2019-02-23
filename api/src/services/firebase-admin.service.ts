import * as admin from "firebase-admin";
import { apiConfig } from "../config/api.config";

export let firebaseAdmin: admin.app.App;

export function configureFirebaseAdmin(): void {
  firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(apiConfig.firebase),
  });
}
