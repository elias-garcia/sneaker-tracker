export interface Sneaker {
  name?: string | null;
  description?: string | null;
  image?: string | null;
  sizes?: { [size: number]: boolean; };
  price?: string | null;
  currency?: string | null;
  url?: string | null;
  ref?: string | null;
}

export interface SneakerNodes {
  name: Element | null;
  description?: Element | null;
  image: Element | null;
  sizes?: Array<Element | null>;
  price: Element | null;
  currency: Element | null;
  ref: Element | null;
}
