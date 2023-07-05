import express from "express";
import { isAdmin, requireSignIn } from "./../middleware/auth.js";
import {
  CreateProduct,
  GetallProduct,
  Getoneproduct,
  ProductCount,
  ProductPage,
  UpdateProduct,
  deleteproduct,
  filterproduct,
  findphoto,
} from "./../collection/ProductCollection.js";
import formidable from "express-formidable";
const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  CreateProduct
);
router.get("/getall-product", GetallProduct);
router.get("/getone-Product/:slug", Getoneproduct);
router.delete("/delete-product/:pid", deleteproduct);
router.get("/find-photo/:pid", findphoto);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  UpdateProduct
);
router.post("/filter-product", filterproduct);
router.get("/product-count", ProductCount);
router.get("/product-list/:page", ProductPage);

export default router;
