import { Document } from "mongoose";
import { IShop } from "./shop.interface";
import { ISneaker } from "./sneaker.interface";

export interface ISneakerPrice extends Document {
  sneaker: string | ISneaker;
  shop: string | IShop;
  price: number;
  currency: string;
}
