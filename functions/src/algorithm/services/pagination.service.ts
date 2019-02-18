import { Page } from "puppeteer";
import { EnumerationPaginationData, LoadMorePaginationData, Pagination, PaginationData } from "../interfaces/shop-scraping-data.interface";

async function autoScroll(
  page: Page,
  productSelector: string
): Promise<string[]> {
  let productLinks: string[] = [];

  try {
    await page.evaluate((): Promise<any> => {
      return new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 200;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;

          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    productLinks = await page.evaluate((selector: string) => {
      const productNodes: NodeList = document.querySelectorAll(selector);
      const newProductLinks: string[] = [];

      productNodes.forEach((node: Node) => {
        newProductLinks.push((<HTMLAnchorElement>node).href);
      });

      return newProductLinks;
    }, productSelector);
  } catch (e) {
    console.log(e);
  }

  return productLinks;
}

async function enumeratedPages(
  page: Page,
  data: EnumerationPaginationData,
  productSelector: string
): Promise<string[]> {
  const nextPageSelector = data.nextPageSelector;
  let areMorePages = true;
  let productLinks: string[] = [];

  while (areMorePages) {
    try {
      await page.waitForSelector(nextPageSelector, { visible: true, timeout: 3000 });
      await page.waitFor((selector): boolean => {
        const nextPageElement = <HTMLAnchorElement>document.querySelector(selector);
        const currentUrl = window.location.href;

        return (nextPageElement !== null)
          && (currentUrl !== nextPageElement.href);
      }, { timeout: 3000 }, nextPageSelector);

      productLinks = await page.evaluate((selector: string, links: string[]): string[] => {
        const productNodes: NodeList = document.querySelectorAll(selector);
        const newProductLinks: string[] = [];

        productNodes.forEach((node: Node) => {
          newProductLinks.push((<HTMLAnchorElement>node).href);
        });

        return [...links, ...newProductLinks];
      }, productSelector, productLinks);

      await page.evaluate((selector) => {
        document.querySelector(selector).click();
      }, nextPageSelector);
    } catch (e) {
      console.log(e);
      areMorePages = false;
    }
  }

  return productLinks;
}

async function loadMore(
  page: Page,
  data: LoadMorePaginationData,
  productSelector: string
): Promise<string[]> {
  const nextPageSelector = data.nextPageSelector;
  const loaderSelector = data.loaderSelector;
  let productLinks: string[] = [];
  let areMorePages = true;

  while (areMorePages) {
    try {
      await page.waitFor((visibleSelector, hiddenSelector): boolean => {
        const nextPageButton = document.querySelector(visibleSelector);
        const loaderElement = document.querySelector(hiddenSelector);

        return (nextPageButton !== null && loaderElement === null);
      }, { timeout: 7000 }, nextPageSelector, loaderSelector);
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight)
      });
      await page.evaluate((selector) => {
        document.querySelector(selector).click();
      }, nextPageSelector);

      productLinks = await page.evaluate((selector: string, links: string[]): string[] => {
        const productNodes: NodeList = document.querySelectorAll(selector);
        const newProductLinks: string[] = [];

        productNodes.forEach((node: Node) => {
          newProductLinks.push((<HTMLAnchorElement>node).href);
        });

        return newProductLinks;
      }, productSelector, productLinks);
    } catch (e) {
      console.log(e);
      areMorePages = false;
    }
  }

  return productLinks;
}

export function getProductLinks(
  page: Page,
  paginationData: PaginationData,
  productSelector: string
): Promise<string[]> {
  switch (paginationData.type) {
    case Pagination.InfiniteScroll:
      return autoScroll(page, productSelector);
    case Pagination.Enumeration:
      return enumeratedPages(
        page,
        <EnumerationPaginationData>paginationData.data,
        productSelector
      );
    case Pagination.LoadMore:
      return loadMore(
        page,
        <LoadMorePaginationData>paginationData.data,
        productSelector
      );
  }
}
