import { IShop } from "shared/interfaces";
import { Shop } from "shared/models";

export async function create(shop: IShop) {
  return await Shop.create(shop);
}

export async function findAll() {
  return await Shop.find({});
}
