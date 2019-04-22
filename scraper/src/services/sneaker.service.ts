import { Gender } from "shared/enums";
import { ISneaker, ISneakerPrice, ISneakerSizesData } from "shared/interfaces";
import { Sneaker, SneakerPrice } from "shared/models";
import { ISneakerScrapingFields } from "../interfaces/sneaker-scraping-fields.interface";

function createSneaker(
  sneaker: ISneakerScrapingFields,
  shopId: string,
  gender: Gender,
): Promise<ISneaker> {
  return Sneaker.create({
    ref: sneaker.ref,
    name: sneaker.name,
    gender,
    description: sneaker.description,
    image: sneaker.image,
    sizesData: {
      shop: shopId,
      sizes: sneaker.sizes,
      mostRecentPrice: sneaker.price,
      currency: sneaker.currency,
    },
  });
}

function updateSneaker(
  sneakerScrapingData: ISneakerScrapingFields,
  sneaker: ISneaker,
  shopId: string,
): Promise<ISneaker> {
  const sneakerSizesDataFound = sneaker.sizesData.find(
    (value: ISneakerSizesData) => value.shop === shopId,
  );
  const newPrice = Number(sneakerScrapingData.price);

  if (sneakerSizesDataFound) {
    sneakerSizesDataFound.mostRecentPrice = newPrice;
  } else {
    sneaker.sizesData.push({
      shop: shopId,
      currency: sneakerScrapingData.currency,
      sizes: sneakerScrapingData.sizes,
      mostRecentPrice: newPrice,
    });
  }

  if (sneakerScrapingData.description
    && sneakerScrapingData.description.length > sneaker.description.length) {
    sneaker.description = sneakerScrapingData.description;
  }

  return sneaker.save();
}

function createSneakerPrice(
  sneakerId: string,
  price: string,
  currency: string,
  shopId: string,
): Promise<ISneakerPrice> {
  return SneakerPrice.create({
    sneaker: sneakerId,
    shop: shopId,
    price,
    currency,
  });
}

async function saveOrUpdateSneaker(
  sneakerScrapingData: ISneakerScrapingFields,
  shopId: string,
  gender: Gender,
): Promise<ISneaker> {
  let sneaker = await Sneaker.findOne({ ref: sneakerScrapingData.ref });

  sneaker = sneaker
    ? await updateSneaker(sneakerScrapingData, sneaker, shopId)
    : await createSneaker(sneakerScrapingData, shopId, gender);

  await createSneakerPrice(
    sneaker.id,
    sneakerScrapingData.price,
    sneakerScrapingData.currency,
    shopId,
  );

  return sneaker;
}

export async function saveSneakers(
  sneakersScrapingData: ISneakerScrapingFields[],
  shopId: any,
  gender: Gender,
): Promise<ISneaker[]> {
  const promises = sneakersScrapingData.map(
    (sneakerScrapingData: ISneakerScrapingFields) => {
      return saveOrUpdateSneaker(
        sneakerScrapingData,
        shopId,
        gender,
      );
    },
  );

  return Promise.all(promises);
  // try {
  //   const results = await Promise.all(promises);

  //   console.log(results);
  // } catch (e) {
  //   console.log(e);
  // }
}
