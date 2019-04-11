import { Document } from "mongoose";
import { IShop } from "./shop.interface";

export interface ISneakerSizesData {
  shop: string | IShop;
  sizes: number[];
  mostRecentPrice: number;
  currency: string;
  priceHistory: string[] | [];
}

export interface ISneaker extends Document {
  ref: string;
  name: string;
  description?: string;
  image: string;
  availability: ISneakerSizesData[];
}
