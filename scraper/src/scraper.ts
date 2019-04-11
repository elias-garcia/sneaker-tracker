import { configureMongoose } from "shared/config";
import { configureBrowser, configurePage } from "./config/puppeteer.config";
import { scraperConfig } from "./config/scraper.config";
import { shopsScrapingData } from "./data";
import { Sneaker } from "./interfaces/sneaker.interface";
import { getProductLinks } from "./services/pagination.service";
import { extractProductData } from "./services/product.service";

async function run(): Promise<any> {
  const browser = await configureBrowser();
  const page = await configurePage(browser);

  for (const shopData of shopsScrapingData) {
    await page.goto(shopData.urls[0].url);

    const productLinks = await getProductLinks(
      page,
      shopData.paginationData,
      shopData.productSelector,
    );

    console.log(productLinks.length);

    for (let i = 0; i <= productLinks.length; i++) {
      const sneakerData: Sneaker = await extractProductData(
        page,
        productLinks[i],
        shopData.productDataSelectors,
      );

      console.log(sneakerData);
    }
  }

}

(async () => {
  try {
    await configureMongoose(scraperConfig.mongoUri);
    await run();
  } catch (e) {
    console.error(e);
  }
})();
