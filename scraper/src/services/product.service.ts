import { Page } from "puppeteer";
import { IProductFieldSelectorData, IProductFieldsSelectors } from "shared/interfaces";
import { ISneakerScrapingFields } from "../interfaces/sneaker-scraping-fields.interface";
import { processSelector } from "./dom.service";

export async function extractProductData(
  page: Page,
  productLink: string,
  productFieldsSelectors: IProductFieldsSelectors,
) {
  const sneakerData: ISneakerScrapingFields = { url: productLink };

  await page.goto(productLink);

  try {
    const awaitForSelectorsPromises = Object.keys(productFieldsSelectors)
      .map((key: string) => page.waitForSelector(productFieldsSelectors[key].selector, { timeout: 3000 }));

    await Promise.all(awaitForSelectorsPromises);
  } catch (e) {
    if (e.name === "TimeoutError") {
      console.log("[scraper] some scraping data is not available");
    }
  } finally {
    await Promise.all(
      Object.keys(productFieldsSelectors).map(async (key: string) => {
        const selectorData: IProductFieldSelectorData = (productFieldsSelectors as any)[key];
        const value = await processSelector(page, selectorData);

        (sneakerData as any)[key] = value;
      }),
    );
  }

  return sneakerData;
}
