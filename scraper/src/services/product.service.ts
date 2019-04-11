import { Page } from "puppeteer";
import { IProductFieldSelectorData, IProductFieldsSelectors } from "shared/interfaces";
import { ISneakerScrapingFields } from "../interfaces/sneaker.interface";
import { processSelector } from "./dom.service";

export async function extractProductData(
  page: Page,
  productLink: string,
  productDataSelectors: IProductFieldsSelectors,
) {
  try {
    const sneakerData: ISneakerScrapingFields = { url: productLink };

    await page.goto(productLink);
    await page.waitForSelector(productDataSelectors.name.selector);

    await Promise.all(
      Object.keys(productDataSelectors).map(async (key: string) => {
        const selectorData: IProductFieldSelectorData = (productDataSelectors as any)[key];
        const value = await processSelector(page, selectorData);

        (sneakerData as any)[key] = value;
      }),
    );

    return sneakerData;
  } catch (e) {
    throw (e);
  }
}
