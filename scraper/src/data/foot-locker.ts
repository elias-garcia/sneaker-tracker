import { Gender, NodeProperty, Pagination } from "shared/enums";
import { IScrapingData } from "shared/interfaces";

export const footLocker: IScrapingData = {
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
  productFieldsSelectors: {
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
    sizes: {
      // tslint:disable-next-line:max-line-length
      selector: 'div[data-toggle-container="productSizeSelectionContainer"] section:nth-of-type(1) button:not(.fl-product-size--item__not-available) span',
      property: NodeProperty.InnerText,
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
