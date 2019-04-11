import { Gender, NodeProperty, Pagination } from "shared/enums";
import { IScrapingData } from "shared/interfaces";

export const cuatroElementos: IScrapingData = {
  urls: [
    {
      gender: Gender.Man,
      url: "https://4elementos.es/es/7-calzado?genero=hombre",
    },
    {
      gender: Gender.Woman,
      url: "https://4elementos.es/es/7-calzado?genero=mujer",
    },
  ],
  paginationData: {
    type: Pagination.Numbered,
    data: {
      nextPageSelector: ".next.js-search-link",
    },
  },
  productSelector: "article.product-miniature > div > div > a",
  productFieldsSelectors: {
    name: {
      selector: "div#product-info-wrapper > h1",
      property: NodeProperty.InnerText,
    },
    image: {
      selector: 'meta[property="og:image"]',
      property: NodeProperty.Content,
    },
    price: {
      selector: 'meta[property="product:price:amount"]',
      property: NodeProperty.Content,
      textProcessingData: {
        textReplaceData: {
          regExpData: {
            regExp: ",",
            mode: "g",
          },
          replaceWith: ".",
        },
      },
    },
    currency: {
      selector: 'meta[property="product:price:currency"]',
      property: NodeProperty.Content,
    },
    sizes: {
      selector: 'div[id="size-pane"] label > span',
      property: NodeProperty.InnerText,
    },
    ref: {
      selector: "div#product-info-wrapper > h1",
      property: NodeProperty.InnerText,
      textProcessingData: {
        regExpData: {
          regExp: "(?!.*\\s).*",
        },
      },
    },
  },
};
