import { IShop } from "shared/interfaces";
import { Shop } from "shared/models";

export async function create(shop: IShop) {
  await Shop.create(shop);
}

export async function findAll() {
  await Shop.find({});
}
