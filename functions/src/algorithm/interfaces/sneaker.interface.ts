
export interface Sneaker {
  name: string | null;
  description?: string | null;
  image: string | null;
  sizes?: { [size: number]: boolean; };
  price: string | null;
  currency: string | null;
  url: string | null;
  ref: string | null;
}
