import { Browser, launch, Page, Request, ResourceType } from "puppeteer";
import { scraperConfig } from "./scraper.config";

const blockedResourceTypes: ResourceType[] = [
  "image",
  "media",
  "font",
  "texttrack",
  "media",
  "other",
  "manifest",
];
const skippedResources: string[] = [
  "quantserve",
  "adzerk",
  "doubleclick",
  "adition",
  "exelator",
  "sharethrough",
  "cdn.api.twitter",
  "google-analytics",
  "googletagmanager",
  "google",
  "fontawesome",
  "facebook",
  "analytics",
  "optimizely",
  "clicktale",
  "mixpanel",
  "zedo",
  "clicksor",
  "tiqcdn",
  "monetate",
  "intercom",
];

export async function configureBrowser(): Promise<Browser> {
  return await launch({
    headless: scraperConfig.production,
    defaultViewport: null,
  });
}

function blockResource(resourceType: ResourceType): boolean {
  return blockedResourceTypes.indexOf(resourceType) !== -1;
}

function skipResource(requestUrl: string): boolean {
  return skippedResources.some((resource) => requestUrl.indexOf(resource) !== -1);
}

export async function configurePage(browser: Browser): Promise<Page> {
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on("request", (request: Request) => {
    const requestUrl = request.url().split("?")[0].split("#")[0];

    if (blockResource(request.resourceType()) || skipResource(requestUrl)) {
      request.abort();
    } else {
      request.continue();
    }
  });

  return page;
}
