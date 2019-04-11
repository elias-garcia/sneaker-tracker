export interface ISneakerScrapingFields {
  name?: string | null;
  description?: string | null;
  image?: string | null;
  sizes?: string[];
  price?: string | null;
  currency?: string | null;
  url?: string | null;
  ref?: string | null;
}

export interface ISneakerNodes {
  name: Element | null;
  description?: Element | null;
  image: Element | null;
  sizes?: Array<Element | null>;
  price: Element | null;
  currency: Element | null;
  ref: Element | null;
}
