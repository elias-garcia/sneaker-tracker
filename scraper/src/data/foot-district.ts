import { Gender, NodeProperty, Pagination } from "shared/enums";
import { IScrapingData } from "shared/interfaces";

export const footDistrict: IScrapingData = {
  urls: [
    {
      gender: Gender.Man,
      url: "https://footdistrict.com/zapatillas/zapatillas-hombre.html",
    },
    {
      gender: Gender.Woman,
      url: "https://footdistrict.com/zapatillas/zapatillas-mujer.html",
    },
  ],
  paginationData: {
    type: Pagination.Numbered,
    data: {
      nextPageSelector: "a.next",
    },
  },
  productSelector: "h2.product-name > a",
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
      selector: 'meta[itemprop="image"]',
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
      selector: "div.product-options select > option:not(:disabled):not(:first-child)",
      property: NodeProperty.InnerText,
    },
    ref: {
      selector: 'meta[itemprop="productID"]',
      property: NodeProperty.Content,
    },
  },
};
