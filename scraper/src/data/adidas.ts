import { Gender, NodeProperty, Pagination } from "shared/enums";
import { IScrapingData } from "shared/interfaces";

export const adidas: IScrapingData = {
  urls: [
    {
      gender: Gender.Man,
      url: "https://www.adidas.es/calzado-lifestyle-hombre",
    },
    {
      gender: Gender.Woman,
      url: "https://www.adidas.es/calzado-lifestyle-mujer",
    },
  ],
  paginationData: {
    type: Pagination.Numbered,
    data: {
      nextPageSelector: '[class*="pagination__control--next"] > a',
    },
  },
  productSelector: "div.gl-product-card__details > a",
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
      selector: 'div[data-auto-id="size-selector"] li.gl-menu__item',
      property: NodeProperty.Title,
    },
    ref: {
      selector: 'meta[itemprop="sku"]',
      property: NodeProperty.Content,
    },
  },
};
