import { model, Schema } from "mongoose";
import { Gender, NodeProperty, Pagination } from "../enums";
import { IPaginationData, IProductFieldSelectorData, IProductFieldsSelectors, IProductUrlData, IRegExpData, IShop, ITextProcessingData } from "../interfaces";

export const SHOP_MODEL_NAME = "Shop";

const productUrlDataSchema: Schema<IProductUrlData> = new Schema({
  gender: {
    type: String,
    enum: Object.keys(Gender).map((key: string) => Gender[key]),
    required: true
  },
  url: {
    type: String,
    required: true
  }
}, { id: false });
const paginationDataSchema: Schema<IPaginationData> = new Schema({
  type: {
    type: String,
    enum: Object.keys(Pagination).map((key: string) => Pagination[key]),
    required: true
  },
  data: {
    nextPageSelector: {
      type: String,
    },
    loaderSelector: {
      type: String
    }
  }
}, { id: false });
const regExpDataSchema: Schema<IRegExpData> = new Schema({
  regExp: {
    type: String,
    required: true,
  },
  mode: {
    type: String
  }
}, { id: false });
const textProcessingDataSchema: Schema<ITextProcessingData> = new Schema({
  regExpData: {
    type: regExpDataSchema
  },
  textReplaceData: {
    regExpData: {
      type: regExpDataSchema,
      required: true
    },
    replaceWith: {
      type: String,
      required: true,
    }
  }
}, { id: false });
const productFieldSelectorDataSchema: Schema<IProductFieldSelectorData> = new Schema({
  selector: {
    type: String,
    required: true
  },
  property: {
    type: String,
    enum: Object.keys(NodeProperty).map((key: string) => NodeProperty[key])
  },
  textProcessingData: {
    type: textProcessingDataSchema
  }
}, { id: false });
const productFieldsSelectorSchema: Schema<IProductFieldsSelectors> = new Schema({
  name: {
    type: productFieldSelectorDataSchema,
    required: true
  },
  description: {
    type: productFieldSelectorDataSchema,
  },
  image: {
    type: productFieldSelectorDataSchema,
    required: true
  },
  price: {
    type: productFieldSelectorDataSchema,
    required: true
  },
  currency: {
    type: productFieldSelectorDataSchema,
    required: true
  },
  ref: {
    type: productFieldSelectorDataSchema,
    required: true
  },
}, { id: false });
const shopSchema: Schema<IShop> = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true
  },
  scrapingData: {
    urls: [productUrlDataSchema],
    paginationData: [paginationDataSchema],
    productSelector: {
      type: String,
      required: true
    },
    productFieldsSelectors: {
      type: productFieldsSelectorSchema,
      required: true
    }
  }
});

export const Shop = model(SHOP_MODEL_NAME, shopSchema);
