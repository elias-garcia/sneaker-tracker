import * as puppeteer from 'puppeteer';

async function autoScroll(page: puppeteer.Page): Promise<any> {
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
}

async function iterateOverEnumeratedPages(page: puppeteer.Page) {
  const selector = '.current + li';
  const subSelector = ':first-child';
  let areMorePages = true;

  while (areMorePages) {
    const oldNextPageUrl = await page.evaluate((sel, subSel): string => {
      return (<HTMLLIElement>document.querySelector(sel)).querySelector(subSel).href;
    }, selector, subSelector);

    console.log(oldNextPageUrl);
    await Promise.all([
      page.click(selector),
      page.waitFor((sel, subSel, oldUrl) => {
        return document.querySelector(sel).querySelector(subSel).href !== oldUrl
      }, {}, selector, subSelector, oldNextPageUrl)
    ]);

    const newNextPageUrl = await page.evaluate((sel, subSel): string => {
      return (<HTMLAnchorElement>document.querySelector(sel)).querySelector(subSel).href;
    }, selector, subSelector);

    console.log(newNextPageUrl);
    if (oldNextPageUrl === newNextPageUrl) {
      areMorePages = false;
    }
  }
}

async function run(): Promise<any> {
  const url = 'https://footdistrict.com/zapatillas/zapatillas-hombre/where/p/1.html';

  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

  await iterateOverEnumeratedPages(page);
  //await autoScroll(page);
}

(async () => {
  try {
    await run();
  } catch (e) {
    console.log(e);
  }
})()
