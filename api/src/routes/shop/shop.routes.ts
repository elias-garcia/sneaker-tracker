import { Router } from "express";
import { createShop } from "./shop.controller";

export const shopsRoutes = Router()
  .post("/", createShop);
