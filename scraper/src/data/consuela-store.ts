import { Gender, NodeProperty, Pagination } from "shared/enums";
import { IScrapingData } from "shared/interfaces";

export const consuelaStore: IScrapingData = {
  urls: [
    {
      gender: Gender.Man,
      url: "https://www.consuelastore.com/collections/men",
    },
    {
      gender: Gender.Woman,
      url: "https://www.consuelastore.com/collections/woman",
    },
  ],
  paginationData: {
    type: Pagination.Numbered,
    data: {
      nextPageSelector: ".pagination_next > a",
    },
  },
  productSelector: "div > a.product-name",
  productFieldsSelectors: {
    name: {
      selector: 'h1[itemProp="name"]',
      property: NodeProperty.InnerText,
    },
    description: {
      selector: "div.panel-body",
      property: NodeProperty.InnerText,
      textProcessingData: {
        textReplaceData: {
          regExpData: {
            regExp: "\\n",
            mode: "g",
          },
          replaceWith: "",
        },
      },
    },
    image: {
      selector: 'meta[itemProp="image"]',
      property: NodeProperty.Content,
    },
    price: {
      selector: 'meta[property="og:price:amount"]',
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
      selector: 'meta[itemProp="priceCurrency"]',
      property: NodeProperty.Content,
    },
    sizes: {
      selector: ".talla > .swatch-size.available > input",
      property: NodeProperty.Value,
    },
    ref: {
      selector: "div.panel-body",
      property: NodeProperty.InnerText,
      textProcessingData: {
        regExpData: {
          regExp: "(?<=Modelo:).*",
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
