import { Router } from "express";
import { shopsRoutes } from "./shops/shops.routes";

export const routes = Router()
  .use("/shops", shopsRoutes);
