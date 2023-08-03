import express from "express";
import {
  DeleteCategary,
  GetallCategary,
  GetoneCategary,
  UpadateCategary,
  CreateCotegary,
} from "./../collection/CotegaryCollection.js";
import { requireSignIn, isAdmin } from "./../middleware/auth.js";
const router = express.Router();

router.post("/create-category", requireSignIn, isAdmin, CreateCotegary);
router.post("/findOne/:slug", GetoneCategary);
router.put("/update-category/:id", requireSignIn, isAdmin, UpadateCategary);
router.get("/get-category", GetallCategary);
router.delete("/delete-category/:id", requireSignIn, isAdmin, DeleteCategary);
export default router;
