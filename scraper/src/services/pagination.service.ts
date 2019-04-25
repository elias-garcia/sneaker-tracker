import { Page } from "puppeteer";
import { Pagination } from "shared/enums";
import { ILoadMorePaginationData, INumberedPaginationData, IPaginationData } from "shared/interfaces";

async function autoScroll(
  page: Page,
  productSelector: string,
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
        newProductLinks.push((node as HTMLAnchorElement).href);
      });

      return newProductLinks;
    }, productSelector);
  } catch (e) {
    if (e.name === "TimeoutError") {
      console.log("[scraper] no more scroll available");
    } else {
      console.log(e);
    }
  }

  return productLinks;
}

async function numberedPages(
  page: Page,
  data: INumberedPaginationData,
  productSelector: string,
): Promise<string[]> {
  const nextPageSelector = data.nextPageSelector;
  let areMorePages = true;
  let productLinks: string[] = [];

  while (areMorePages) {
    try {
      await page.waitForSelector(nextPageSelector, { visible: true, timeout: 3000 });
      await page.waitFor((selector): boolean => {
        const nextPageElement = document.querySelector(selector) as HTMLAnchorElement;
        const currentUrl = window.location.href;

        return (nextPageElement !== null)
          && (currentUrl !== nextPageElement.href);
      }, { timeout: 3000 }, nextPageSelector);

      productLinks = await page.evaluate((selector: string, links: string[]): string[] => {
        const productNodes: NodeList = document.querySelectorAll(selector);
        const newProductLinks: string[] = [];

        productNodes.forEach((node: Node) => {
          newProductLinks.push((node as HTMLAnchorElement).href);
        });

        return [...links, ...newProductLinks];
      }, productSelector, productLinks);

      await page.evaluate((selector) => {
        document.querySelector(selector).click();
      }, nextPageSelector);
    } catch (e) {
      if (e.name === "TimeoutError") {
        console.log("[scraper] no more pages");
      } else {
        console.log(e);
      }
      areMorePages = false;
    }
  }

  return productLinks;
}

async function loadMore(
  page: Page,
  data: ILoadMorePaginationData,
  productSelector: string,
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
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.evaluate((selector) => {
        document.querySelector(selector).click();
      }, nextPageSelector);

      productLinks = await page.evaluate((selector: string, links: string[]): string[] => {
        const productNodes: NodeList = document.querySelectorAll(selector);
        const newProductLinks: string[] = [];

        productNodes.forEach((node: Node) => {
          newProductLinks.push((node as HTMLAnchorElement).href);
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

export function getProductsLinks(
  page: Page,
  paginationData: IPaginationData,
  productSelector: string,
): Promise<string[]> {
  switch (paginationData.type) {
    case Pagination.InfiniteScroll:
      return autoScroll(page, productSelector);
    case Pagination.Numbered:
      return numberedPages(
        page,
        paginationData.data as INumberedPaginationData,
        productSelector,
      );
    case Pagination.LoadMore:
      return loadMore(
        page,
        paginationData.data as ILoadMorePaginationData,
        productSelector,
      );
    default: console.log("[scraper] invalid pagination type");
  }
}

// async function loadMore(
//   page: Page,
//   data: ILoadMorePaginationData,
//   productSelector: string,
// ): Promise<string[]> {
//   const nextPageSelector = data.nextPageSelector;
//   const productLinks: string[] = [];
//   let areMorePages = true;

//   while (areMorePages) {
//     try {
//       await page.waitForSelector(nextPageSelector, { visible: true, timeout: 3000 });
//       await page.evaluate(() => {
//         window.scrollTo(0, document.body.scrollHeight);
//       });
//       await page.evaluate((selector) => {
//         document.querySelector(selector).click();
//       }, nextPageSelector);

//       await page.waitFor((nextPageSel: string, productSel: string, previousProducts: number): boolean => {
//         const nextPageButton = document.querySelector(nextPageSel);
//         const products = document.querySelectorAll(productSel);

//         return (nextPageButton !== null && products.length > previousProducts);
//       }, { timeout: 7000 }, nextPageSelector, productSelector, productLinks.length);

//       const newProductsLinks = await page.evaluate((selector: string): string[] => {
//         const productNodes: NodeList = document.querySelectorAll(selector);
//         const newProducts: string[] = [];

//         productNodes.forEach((node: Node) => {
//           newProducts.push((node as HTMLAnchorElement).href);
//         });

//         return newProducts;
//       }, productSelector);

//       productLinks.push(...newProductsLinks);
//     } catch (e) {
//       if (e.name === "TimeoutError") {
//         console.log("[scraper] no more pages available");
//       }
//       console.log(e);
//       areMorePages = false;
//     }
//   }

//   return productLinks;
// }
