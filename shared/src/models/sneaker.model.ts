import { Model, model, Schema } from "mongoose";
import { Gender } from "../enums";
import { ISneaker } from "../interfaces/sneaker.interface";

export const SNEAKER_MODEL_NAME = "Sneaker";

const sneakerSchema: Schema<ISneaker> = new Schema({
  currency: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  gender: {
    type: String,
    enum: Object.keys(Gender).map((key: string) => Gender[key]),
    required: true,
  },
  image: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  ref: {
    required: true,
    type: String,
  },
});

export const Sneaker: Model<ISneaker> = model(SNEAKER_MODEL_NAME, sneakerSchema);
