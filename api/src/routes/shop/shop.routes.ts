import { Router } from "express";
import { createShop, findAllShops } from "./shop.controller";

export const shopsRoutes = Router()
  .post("/", createShop)
  .get("/", findAllShops);
