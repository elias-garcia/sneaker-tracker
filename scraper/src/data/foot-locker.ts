import { Gender, NodeProperty, Pagination, ShopScrapingData } from "../interfaces/shop-scraping-data.interface";

export const footLocker: ShopScrapingData = {
  name: "Foo Locker",
  logo: "",
  urls: [
    {
      gender: Gender.Man,
      url: "https://www.footlocker.es/es/hombre/zapatos/",
    },
    {
      gender: Gender.Woman,
      url: "https://www.footlocker.es/es/mujer/zapatos/",
    },
  ],
  paginationData: {
    type: Pagination.LoadMore,
    data: {
      nextPageSelector: '[data-ajaxcontent="productpagebutton"] div.fl-btn',
      loaderSelector: '[data-ajaxcontent="productpagebutton"] div.fl-btn.hide',
    },
  },
  productSelector: "div.fl-product-tile--details > a",
  productDataSelectors: {
    name: {
      selector: 'meta[itemprop="name"]',
      property: NodeProperty.Content,
    },
    description: {
      selector: 'meta[itemprop="description"]',
      property: NodeProperty.Content,
    },
    image: {
      selector: 'meta[property="og:image"]',
      property: NodeProperty.Content,
    },
    price: {
      selector: 'meta[itemprop="price"]',
      property: NodeProperty.Content,
    },
    currency: {
      selector: 'meta[itemprop="priceCurrency"]',
      property: NodeProperty.Content,
    },
    ref: {
      selector: 'meta[itemprop="og:description"]',
      property: NodeProperty.Content,
      textProcessingData: {
        regExpData: {
          regExp: "(?<=\().*(?=\))",
        },
      },
    },
  },
};
