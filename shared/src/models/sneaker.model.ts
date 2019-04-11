import { Model, model, Schema } from "mongoose";
import { Gender } from "../enums";
import { ISneaker, ISneakerSizesData } from "../interfaces/sneaker.interface";
import { SHOP_MODEL_NAME } from "./shop.model";

export const SNEAKER_MODEL_NAME = "Sneaker";

const sneakerSizesDataSchema: Schema<ISneakerSizesData> = new Schema({
  shop: {
    type: Schema.Types.ObjectId,
    ref: SHOP_MODEL_NAME,
  },
  sizes: [{
    type: String,
  }],
  mostRecentPrice: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
}, { _id: false });

const sneakerSchema: Schema<ISneaker> = new Schema({
  ref: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: Object.keys(Gender).map((key: string) => Gender[key]),
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  sizesData: [sneakerSizesDataSchema],
}, { timestamps: true });

export const Sneaker: Model<ISneaker> = model(SNEAKER_MODEL_NAME, sneakerSchema);
