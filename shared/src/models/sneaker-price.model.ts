import { Model, model, Schema } from "mongoose";
import { ISneakerPrice } from "../interfaces/sneaker-price.interface";
import { SHOP_MODEL_NAME } from "./shop.model";
import { SNEAKER_MODEL_NAME } from "./sneaker.model";

const SNEAKER_PRICE_MODEL_NAME = "Sneaker Price";

const sneakerPriceSchema: Schema<ISneakerPrice> = new Schema({
  sneaker: {
    type: Schema.Types.ObjectId,
    ref: SNEAKER_MODEL_NAME,
    required: true,
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: SHOP_MODEL_NAME,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
});

export const SneakerPrice: Model<ISneakerPrice> = model(
  SNEAKER_PRICE_MODEL_NAME,
  sneakerPriceSchema,
);
