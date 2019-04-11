import { Types } from "mongoose";
import { configureMongoose } from "shared/config";
import { configureBrowser, configurePage } from "./config/puppeteer.config";
import { scraperConfig } from "./config/scraper.config";
import { shopsScrapingData } from "./data";
import { ISneakerScrapingFields } from "./interfaces/sneaker.interface";
import { saveSneakers } from "./services/database.service";
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
    const scrapedSneakersData = [];

    // for (let i = 0; i <= productLinks.length; i++) {
    for (let i = 0; i <= 5; i++) {
      const sneakerData: ISneakerScrapingFields = await extractProductData(
        page,
        productLinks[i],
        shopData.productFieldsSelectors,
      );

      scrapedSneakersData.push(sneakerData);
    }

    saveSneakers(scrapedSneakersData, Types.ObjectId());
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
