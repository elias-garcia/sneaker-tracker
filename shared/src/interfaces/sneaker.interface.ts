import { Document } from "mongoose";

export interface ISneaker extends Document {
  name: string;
  description?: string;
  image: string;
  price: number;
  currency: string;
  ref: string;
}
