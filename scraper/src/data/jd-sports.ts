import { Gender, NodeProperty, Pagination } from "shared/enums";
import { IScrapingData } from "shared/interfaces";

export const jdSports: IScrapingData = {
  urls: [
    {
      gender: Gender.Man,
      url: "https://www.jdsports.es/hombre/calzado-de-hombre/zapatillas",
    },
    {
      gender: Gender.Woman,
      url: "https://www.jdsports.es/mujer/calzado-de-mujer/zapatillas",
    },
  ],
  paginationData: {
    type: Pagination.Numbered,
    data: {
      nextPageSelector: 'a[rel="next"]',
    },
  },
  productSelector: "span.itemTitle > a",
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
      selector: 'div[id="productSizeStock"] > button',
      property: NodeProperty.InnerText,
    },
    ref: {
      selector: 'meta[itemprop="productID"]',
      property: NodeProperty.Content,
    },
  },
};
