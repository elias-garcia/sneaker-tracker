import { Gender, NodeProperty, Pagination, ShopScrapingData } from "../interfaces/shop-scraping-data.interface";

export const adidas: ShopScrapingData = {
  name: "Adidas",
  logo: "",
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
    type: Pagination.Enumeration,
    data: {
      nextPageSelector: '[class*="pagination__control--next"] > a',
    },
  },
  productSelector: "div.gl-product-card__details > a",
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
      selector: 'meta[itemprop="sku"]',
      property: NodeProperty.Content,
    },
  },
};
