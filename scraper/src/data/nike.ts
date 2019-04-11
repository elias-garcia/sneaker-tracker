import { Gender, NodeProperty, Pagination } from "shared/enums";
import { IScrapingData } from "shared/interfaces";

export const nike: IScrapingData = {
  urls: [
    {
      gender: Gender.Man,
      url: "https://store.nike.com/es/es_es/pw/hombre-zapatillas/7puZoi3",
    },
    {
      gender: Gender.Woman,
      url: "https://store.nike.com/es/es_es/pw/mujer-zapatillas/7ptZoi3",
    },
  ],
  paginationData: {
    type: Pagination.InfiniteScroll,
  },
  productSelector: "div.grid-item-image-wrapper > a",
  productFieldsSelectors: {
    name: {
      selector: "h1#pdp_product_title",
      property: NodeProperty.InnerText,
    },
    description: {
      selector: "div.description-preview",
      property: NodeProperty.InnerText,
    },
    image: {
      selector: 'meta[property="og:image"]',
      property: NodeProperty.Content,
    },
    price: {
      selector: 'meta[property="og:price:amount"]',
      property: NodeProperty.Content,
    },
    currency: {
      selector: 'meta[property="og:price:currency"]',
      property: NodeProperty.Content,
    },
    sizes: {
      selector: 'div[name="skuAndSize"] > input:not(:disabled) + label',
      property: NodeProperty.InnerText,
      textProcessingData: {
        regExpData: {
          regExp: "(?<=EU\s).*",
        },
      },
    },
    ref: {
      selector: 'meta[itemprop="productID"]',
      property: NodeProperty.Content,
      textProcessingData: {
        regExpData: {
          regExp: "(?<=:\\s).*",
        },
        textReplaceData: {
          regExpData: {
            regExp: "\\n",
            mode: "g",
          },
          replaceWith: "",
        },
      },
    },
  },
};
