import express from "express";
import { isAdmin, requireSignIn } from "./../middleware/auth.js";
import {
  CreateProduct,
  GetallProduct,
  Getoneproduct,
  ProductCount,
  ProductPage,
  Searchproductcollection,
  UpdateProduct,
  deleteproduct,
  filterproduct,
  findphoto,
  productDetailsCollection,
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
router.get("/get-product", GetallProduct);
router.get("/get-product/:slug", Getoneproduct);
router.delete("/delete-product/:pid", deleteproduct);
router.get("/product-photo/:pid", findphoto);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  UpdateProduct
);
router.post("/product-filters", filterproduct);
router.get("/product-count", ProductCount);
router.get("/product-list/:page", ProductPage);
// search
router.get("/search/:keyword", Searchproductcollection);
router.get("/related-product/:pid/:cid", productDetailsCollection);

export default router;
