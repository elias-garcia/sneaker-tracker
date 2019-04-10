import { NextFunction, Request, Response } from "express";
import { create, findAll } from "./shop.service";

export async function createShop(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const createdShop = await create(req.body);

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
    const allShops = await findAll();

    return res.status(200).json(allShops);
  } catch (err) {
    return next(err);
  }
}
