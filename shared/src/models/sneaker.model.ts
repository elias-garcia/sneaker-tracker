import { Document, Schema } from "mongoose";
import { Gender } from "../enums/gender.enum";

export interface ISneakerModel extends Document {
  ref: string;
  name: string;
  gender: Gender;
}

export const sneakerSchema: Schema = new Schema({
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
});

// export const Sneaker: Model<ISneakerModel> = model<ISneakerModel>("Product", sneakerSchema);
