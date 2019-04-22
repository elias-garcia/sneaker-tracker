import { IShop } from "shared/interfaces";
import { Shop } from "shared/models";

export async function getAllShops(): Promise<IShop[]> {
  return Shop.find().lean().exec();
}
