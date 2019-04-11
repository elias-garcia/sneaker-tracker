import { NativeError } from "mongoose";
import { Sneaker } from "shared/models";
import { ISneakerScrapingFields } from "../interfaces/sneaker.interface";

// function createSneakerBulkOp(
//   sneaker: ISneaker,
//   shopId: string,
// ): any {
//   return {
//     updateOne: {
//       filter: { "ref": sneaker.ref, "sizesData.shop": shopId },
//       update: {
//         $set: {
//           "sizesData.$": { $max: { mostRecentPrice: sneaker.price } },
//         },
//       },
//       upsert: true,
//     },
//   };
// }

// function createSneakerPriceBulkOp(
//   sneaker: ISneaker,
//   shopId: string,
// ): any {
//   return {
//     insertOne: {
//       document: {
//         sneaker: sneaker.ref,
//         shop: shopId,
//         price: sneaker.price,
//         currency: sneaker.currency,
//       },
//     },
//   };
// }

// export function saveSneakers(
//   sneakers: ISneaker[],
//   shopId: string,
// ): Array<Promise<BulkWriteOpResultObject>> {
//   const sneakerBulkOps = [];
//   const sneakerPriceBulkOps = [];

//   for (const sneaker of sneakers) {
//     sneakerBulkOps.push(createSneakerBulkOp(sneaker, shopId));
//     sneakerPriceBulkOps.push(createSneakerPriceBulkOp(sneaker, shopId));
//   }

//   return [
//     Sneaker.bulkWrite(sneakerBulkOps),
//     SneakerPrice.bulkWrite(sneakerPriceBulkOps),
//   ];
// }

export function saveSneakers(
  sneakers: ISneakerScrapingFields[],
  shopId: any,
): void {
  for (const sneaker of sneakers) {
    Sneaker.findOne({ ref: sneaker.ref }).exec()
      .then((doc: ISneakerScrapingFields) => {
        if (doc) {
          Sneaker.updateOne(
            { "ref": sneaker.ref, "sizesData.shop": shopId },
            { $set: { "sizesData.$": { $max: { mostRecentPrice: sneaker.price } } } },
            { upsert: true },
          ).exec((err: NativeError, res: any) => {
            console.log("error", err);
            console.log("res", res);
          });
        } else {
          Sneaker.create({
            ref: sneaker.ref,
            name: sneaker.name,
            gender: "Man",
            description: sneaker.description,
            image: sneaker.image,
            sizesData: {
              shop: shopId,
              sizes: sneaker.sizes,
              mostRecentPrice: sneaker.price,
              currency: sneaker.currency,
            },
          }).then((createdDoc: ISneakerScrapingFields) => {
            console.log(createdDoc);
          });
        }
      });
  }
}
