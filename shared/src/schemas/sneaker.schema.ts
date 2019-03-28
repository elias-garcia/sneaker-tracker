import { SchemaDefinition } from "mongoose";
import { Gender } from "../enums";

export const sneakerSchema: SchemaDefinition = {
  ref: {
    type: String,
    required: true,
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
};
