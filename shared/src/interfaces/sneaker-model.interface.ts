import { Document } from "mongoose";
import { Gender } from "../enums";

export interface ISneakerModel extends Document {
  ref: string;
  name: string;
  gender: Gender;
}
