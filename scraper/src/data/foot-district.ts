import { Gender, NodeProperty, Pagination, ShopScrapingData } from "../interfaces/shop-scraping-data.interface";

export const footDistrict: ShopScrapingData = {
  name: "Foot District",
  logo: "",
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
    type: Pagination.Enumeration,
    data: {
      nextPageSelector: "a.next",
    },
  },
  productSelector: "h2.product-name > a",
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
    ref: {
      selector: 'meta[itemprop="productID"]',
      property: NodeProperty.Content,
    },
  },
};
