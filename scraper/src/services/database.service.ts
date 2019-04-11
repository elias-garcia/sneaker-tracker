import { BulkWriteOpResultObject } from "mongodb";
import { Sneaker, SneakerPrice } from "shared/models";
import { Sneaker as ISneaker } from "../interfaces/sneaker.interface";

function createSneakerBulkOp(
  sneaker: ISneaker,
  shopId: string,
): any {
  return {
    updateOne: {
      filter: { "ref": sneaker.ref, "sizesData.shop": shopId },
      update: {
        $set: {
          "sizesData.$": { $max: { mostRecentPrice: sneaker.price } },
        },
      },
      upsert: true,
    },
  };
}

function createSneakerPriceBulkOp(
  sneaker: ISneaker,
  shopId: string,
): any {
  return {
    insertOne: {
      document: {
        sneaker: sneaker.ref,
        shop: shopId,
        price: sneaker.price,
        currency: sneaker.currency,
      },
    },
  };
}

export function saveSneakers(
  sneakers: ISneaker[],
  shopId: string,
): Array<Promise<BulkWriteOpResultObject>> {
  const sneakerBulkOps = [];
  const sneakerPriceBulkOps = [];

  for (const sneaker of sneakers) {
    sneakerBulkOps.push(createSneakerBulkOp(sneaker, shopId));
    sneakerPriceBulkOps.push(createSneakerPriceBulkOp(sneaker, shopId));
  }

  return [
    Sneaker.bulkWrite(sneakerBulkOps),
    SneakerPrice.bulkWrite(sneakerPriceBulkOps),
  ];
}
