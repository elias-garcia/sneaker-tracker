import { Gender, NodeProperty, Pagination, ShopScrapingData } from "../interfaces/shop-scraping-data.interface";

export const consuelaStore: ShopScrapingData = {
  name: 'Consuela Store',
  logo: '',
  urls: [
    {
      gender: Gender.Man,
      url: 'https://www.consuelastore.com/collections/men',
    },
    {
      gender: Gender.Woman,
      url: 'https://www.consuelastore.com/collections/woman'
    }
  ],
  paginationData: {
    type: Pagination.Enumeration,
    data: {
      nextPageSelector: '.pagination_next > a',
    }
  },
  productSelector: 'div > a.product-name',
  productDataSelectors: {
    name: {
      selector: 'meta[itemProp="name"]',
      property: NodeProperty.Content
    },
    description: {
      selector: 'div.panel-body',
      property: NodeProperty.InnerText,
      textProcessingData: {
        textReplaceData: {
          regExpData: {
            regExp: '\\n',
            mode: 'g',
          },
          replaceWith: ''
        }
      }
    },
    image: {
      selector: 'meta[itemProp="image"]',
      property: NodeProperty.Content
    },
    price: {
      selector: 'meta[property="og:price:amount"]',
      property: NodeProperty.Content
    },
    currency: {
      selector: 'meta[itemProp="priceCurrency"]',
      property: NodeProperty.Content
    },
    ref: {
      selector: 'div.panel-body',
      property: NodeProperty.InnerText,
      textProcessingData: {
        regExpData: {
          regExp: '(?<=Modelo:).*',
        },
        textReplaceData: {
          regExpData: {
            regExp: '\\n',
            mode: 'g',
          },
          replaceWith: ''
        }
      }
    }
  }
};
