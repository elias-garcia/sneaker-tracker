export enum Gender {
  Man = 'Man',
  Woman = 'Woman'
}

export enum Pagination {
  InfiniteScroll = 'InfiniteScroll',
  Enumeration = 'Enumeration',
  LoadMore = 'LoadMore'
}

export enum NodeProperty {
  InnerText = 'innerText',
  Content = 'content'
}

export interface PaginationData {
  type: Pagination;
  data?: EnumerationPaginationData | LoadMorePaginationData;
}

export interface EnumerationPaginationData {
  nextPageSelector: string;
}

export interface LoadMorePaginationData {
  nextPageSelector: string;
  loaderSelector: string;
}

export interface UrlData {
  gender: Gender,
  url: string;
}

export interface RegExpData {
  regExp: string;
  mode?: string;
}

export interface TextReplaceData {
  regExpData: RegExpData,
  replaceWith: string;
}

export interface TextProcessingData {
  regExpData?: RegExpData;
  textReplaceData?: TextReplaceData;
}

export interface SelectorData {
  selector: string;
  property: NodeProperty;
  textProcessingData?: TextProcessingData;
}

export interface ProductDataSelectors {
  name: SelectorData;
  description?: SelectorData;
  image: SelectorData;
  price: SelectorData;
  currency: SelectorData;
  ref: SelectorData;
}

export interface ShopScrapingData {
  name: string;
  logo: string;
  urls: UrlData[];
  paginationData: PaginationData;
  productSelector: string;
  productDataSelectors: ProductDataSelectors;
}
