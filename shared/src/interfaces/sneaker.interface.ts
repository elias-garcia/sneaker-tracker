import { Document } from "mongoose";
import { Gender } from "../enums";
import { IShop } from "./shop.interface";

export interface ISneakerSizesData {
  shop: string | IShop;
  sizes: string[];
  mostRecentPrice: number;
  currency: string;
}

export interface ISneaker extends Document {
  ref: string;
  name: string;
  gender: Gender;
  description?: string;
  image: string;
  sizesData: ISneakerSizesData[];
}
