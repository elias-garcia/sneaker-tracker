import { Gender, NodeProperty, Pagination, ShopScrapingData } from "../interfaces/shop-scraping-data.interface";

export const cuatroElementos: ShopScrapingData = {
  name: "4 Elementos",
  logo: "",
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
    type: Pagination.Enumeration,
    data: {
      nextPageSelector: ".next.js-search-link",
    },
  },
  productSelector: "article.product-miniature > div > div > a",
  productDataSelectors: {
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
    },
    currency: {
      selector: 'meta[property="product:price:currency"]',
      property: NodeProperty.Content,
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
