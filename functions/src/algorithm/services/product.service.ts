import { Page } from "puppeteer";
import { ProductDataSelectors, SelectorData } from "../interfaces/shop-scraping-data.interface";
import { Sneaker } from "../interfaces/sneaker.interface";
import { processSelector } from "./dom.service";

export async function extractProductData(
  page: Page,
  productLink: string,
  productDataSelectors: ProductDataSelectors
) {
  try {
    const sneakerData: Sneaker = { url: productLink };

    await page.goto(productLink);
    await page.waitForSelector(productDataSelectors.name.selector);

    await Promise.all(
      Object.keys(productDataSelectors).map(async (key: string) => {
        const selectorData: SelectorData = (<any>productDataSelectors)[key];
        const value = await processSelector(page, selectorData);

        (<any>sneakerData)[key] = value;
      })
    );

    return sneakerData;
  } catch (e) {
    throw (e)
  }
};
