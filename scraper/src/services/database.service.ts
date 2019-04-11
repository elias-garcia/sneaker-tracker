import { BulkWriteOpResultObject } from "mongodb";
import { Sneaker } from "shared/models";
import { Sneaker as ISneaker } from "../interfaces/sneaker.interface";

export function saveSneakers(
  sneakers: ISneaker[],
  shopId: string,
): Promise<BulkWriteOpResultObject> {
  const bulkOps = [];

  for (const sneaker of sneakers) {
    bulkOps.push({
      updateOne: {
        filter: { "ref": sneaker.ref, "sizesData.shop": shopId },
        update: {
          $set: {
            "sizesData.$": { $max: { mostRecentPrice: sneaker.price } },
          },
        },
        upsert: true,
      },
    });
  }

  return Sneaker.bulkWrite(bulkOps);
}
