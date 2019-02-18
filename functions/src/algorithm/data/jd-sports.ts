import { Gender, NodeProperty, Pagination, ShopScrapingData } from "../interfaces/shop-scraping-data.interface";

export const jdSports: ShopScrapingData = {
  name: 'JD Sports',
  logo: '',
  urls: [
    {
      gender: Gender.Man,
      url: 'https://www.jdsports.es/hombre/calzado-de-hombre/zapatillas',
    },
    {
      gender: Gender.Woman,
      url: 'https://www.jdsports.es/mujer/calzado-de-mujer/zapatillas'
    }
  ],
  paginationData: {
    type: Pagination.Enumeration,
    data: {
      nextPageSelector: 'a[rel="next"]'
    }
  },
  productSelector: 'span.itemTitle > a',
  productDataSelectors: {
    name: {
      selector: 'meta[itemprop="name"]',
      property: NodeProperty.Content
    },
    description: {
      selector: 'meta[itemprop="description"]',
      property: NodeProperty.Content
    },
    image: {
      selector: 'meta[itemprop="image"]',
      property: NodeProperty.Content
    },
    price: {
      selector: 'meta[itemprop="price"]',
      property: NodeProperty.Content
    },
    currency: {
      selector: 'meta[itemprop="priceCurrency"]',
      property: NodeProperty.Content
    },
    ref: {
      selector: 'meta[itemprop="productID"]',
      property: NodeProperty.Content
    }
  }
};
