import { Router } from "express";
import { shopsRoutes } from "./shop/shop.routes";

export const routes = Router()
  .use("/shops", shopsRoutes);
