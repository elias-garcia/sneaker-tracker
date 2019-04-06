import { Gender, NodeProperty, Pagination } from "../enums";

export interface IShopSchema {
  name: string;
  logo: string;
  urls: IProductsUrlData[];
  paginationData: IPaginationData;
  productSelector: string;
  productFieldsSelectors: IProductFieldsSelectors;
}

export interface IProductsUrlData {
  gender: Gender;
  url: string;
}

export interface IPaginationData {
  type: Pagination;
  data?: INumberedPaginationData | ILoadMorePaginationData;
}

export interface INumberedPaginationData {
  nextPageSelector: string;
}

export interface ILoadMorePaginationData extends INumberedPaginationData {
  loaderSelector: string;
}

export interface IProductFieldsSelectors {
  name: IProductFieldSelectorData;
  description?: IProductFieldSelectorData;
  image: IProductFieldSelectorData;
  price: IProductFieldSelectorData;
  currency: IProductFieldSelectorData;
  ref: IProductFieldSelectorData;
}

export interface IProductFieldSelectorData {
  selector: string;
  property: NodeProperty;
  textProcessingData?: ITextProcessingData;
}

export interface ITextProcessingData {
  regExpData?: IRegExpData;
  textReplaceData?: ITextReplaceData;
}

export interface ITextReplaceData {
  regExpData: IRegExpData;
  replaceWith: string;
}

export interface IRegExpData {
  regExp: string;
  mode?: string;
}
