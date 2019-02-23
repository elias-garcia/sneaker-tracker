import { Gender } from "./shop-scraping-data.interface";

export interface Shop {
  name: string;
  logo: string;
  sneakers: {
    [Gender.Man]: {},
    [Gender.Woman]: {},
  };
}
