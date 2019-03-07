import { Router } from "express";
import { createShop } from "./shops.controller";

export const shopsRoutes = Router()
  .post("/", createShop);
