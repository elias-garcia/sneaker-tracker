import { Page } from "puppeteer";
import { ProductDataSelectors } from "../interfaces/shop-scraping-data.interface";
import { Sneaker } from "../interfaces/sneaker.interface";
import { processSelector } from "./dom.service";

export async function extractProductData(
  page: Page,
  productLink: string,
  productDataSelectors: ProductDataSelectors
) {
  try {
    await page.goto(productLink);
    await page.waitForSelector(productDataSelectors.name.selector);

    const sneakerData = await page.evaluate((selectors: ProductDataSelectors, link: string) => {
      const data: Sneaker = {
        name: processSelector(selectors.name),
        image: processSelector(selectors.image),
        price: processSelector(selectors.price),
        currency: processSelector(selectors.currency),
        url: link,
        ref: processSelector(selectors.ref)
      };

      if (selectors.description) {
        data.description = processSelector(selectors.description);
      }

      return data;
    }, productDataSelectors, productLink, processSelector);

    return sneakerData;
  } catch (e) {
    throw (e)
  }
};
