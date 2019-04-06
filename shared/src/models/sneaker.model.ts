import { Gender } from "../enums";

export const sneakerSchema = {
  currency: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  gender: {
    enum: Object.keys(Gender).map((key: string) => Gender[key]),
    required: true,
    type: String,
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
};

// export const Sneaker: Model<ISneaker> = model("Sneaker", sneakerSchema);
