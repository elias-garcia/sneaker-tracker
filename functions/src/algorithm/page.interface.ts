export enum Pagination {
  InfiniteScroll = 'InfiniteScroll',
  Enumeration = 'Enumeration',
  LoadMore = 'LoadMore'
}

export interface EnumerationPagination {
  currentPageSelector: string;
  subSelectors?: string[];
}

export interface LoadMorePagination {
  selector: string;
}

export interface PageData {
  url: string;
  pagination: {
    type: Pagination;
    data?: EnumerationPagination | LoadMorePagination;
  }
}