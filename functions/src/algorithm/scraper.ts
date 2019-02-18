import * as puppeteer from 'puppeteer';
import { shopsScrapingData } from './data';
import { Sneaker } from './interfaces/sneaker.interface';
import { processSelector } from './services/dom.service';
import { getProductLinks } from './services/pagination.service';
import { extractProductData } from './services/product.service';

const blockedResourceTypes: puppeteer.ResourceType[] = [
  'image',
  'media',
  'font',
  'texttrack',
  'media',
  'other',
  'manifest',
];

const skippedResources: string[] = [
  'quantserve',
  'adzerk',
  'doubleclick',
  'adition',
  'exelator',
  'sharethrough',
  'cdn.api.twitter',
  'google-analytics',
  'googletagmanager',
  'google',
  'fontawesome',
  'facebook',
  'analytics',
  'optimizely',
  'clicktale',
  'mixpanel',
  'zedo',
  'clicksor',
  'tiqcdn',
  'monetate',
  'intercom'
];


async function run(): Promise<any> {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  await page.exposeFunction('processSelector', processSelector);

  for (const shopData of shopsScrapingData) {
    await page.setRequestInterception(true);

    page.on('request', (request: puppeteer.Request) => {
      const requestUrl = request.url().split('?')[0].split('#')[0];

      if (
        blockedResourceTypes.indexOf(request.resourceType()) !== -1 ||
        skippedResources.some(resource => requestUrl.indexOf(resource) !== -1)
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.goto(shopData.urls[0].url);

    const productLinks = await getProductLinks(page, shopData.paginationData, shopData.productSelector);

    console.log(productLinks.length);

    for (let i = 0; i < (productLinks.length + 1); i++) {
      const sneakerData: Sneaker = await extractProductData(
        page,
        productLinks[i],
        shopData.productDataSelectors
      );

      console.log(sneakerData);
    }
  }

}

(async () => {
  try {
    await run();
  } catch (e) {
    console.error(e);
  }
})()
