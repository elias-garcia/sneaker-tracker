import { NextFunction, Request, Response } from "express";
import { toGenericDtoCollection } from "shared/utils";
import * as shopService from "./shop.service";

export async function createShop(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const createdShop = await shopService.create(req.body);

    return res.status(201).json(createdShop);
  } catch (err) {
    return next(err);
  }
}

export async function findAllShops(
  _: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const allShops = await shopService.findAll();

    return res.status(200).json(toGenericDtoCollection(allShops));
  } catch (err) {
    return next(err);
  }
}
