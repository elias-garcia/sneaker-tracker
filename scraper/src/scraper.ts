import { configureMongoose, disconnectFromMongoDb } from "shared/config";
import * as UserAgent from "user-agents";
import { configureBrowser, configurePage } from "./config/puppeteer.config";
import { scraperConfig } from "./config/scraper.config";
import { ISneakerScrapingFields } from "./interfaces/sneaker-scraping-fields.interface";
import { getProductsLinks } from "./services/pagination.service";
import { extractProductData } from "./services/product.service";
import { getAllShops } from "./services/shop.service";
import { saveSneakers } from "./services/sneaker.service";

async function run(): Promise<void> {
  const browser = await configureBrowser();
  const page = await configurePage(browser);
  const shops = await getAllShops();

  for (const shop of shops) {
    console.log(`[scraper] scraping ${shop.name}`);
    for (const shopUrlData of shop.scrapingData.urls) {
      console.log(`[scraper] scraping gender ${shopUrlData.gender}`);
      await page.setUserAgent(new UserAgent().toString());
      await page.goto(shopUrlData.url);

      const productLinks = await getProductsLinks(
        page,
        shop.scrapingData.paginationData,
        shop.scrapingData.productSelector,
      );
      const scrapedSneakersData = [];

      // for (let i = 0; i <= productLinks.length; i++) {
      for (let i = 0; i < 5; i++) {
        const sneakerData: ISneakerScrapingFields = await extractProductData(
          page,
          productLinks[i],
          shop.scrapingData.productFieldsSelectors,
        );

        scrapedSneakersData.push(sneakerData);
      }

      try {
        const results = await saveSneakers(
          scrapedSneakersData,
          shop._id,
          shopUrlData.gender,
        );
        // console.log(results);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return await browser.close();
}

(async () => {
  try {
    await configureMongoose(scraperConfig.mongoUri);
    await run();
    await disconnectFromMongoDb();
  } catch (e) {
    console.error(e);
  }
})();
