import express from "express";
import {
  DeleteCategary,
  GetallCategary,
  GetoneCategary,
  UpadateCategary,
  CreateCotegary,
} from "./../collection/CotegaryCollection.js";
import requireSignIn, { isAdmin } from "./../middleware/auth.js";
const router = express.Router();

router.post("/create", requireSignIn, isAdmin, CreateCotegary);
router.post("/findOne/:slug", GetoneCategary);
router.put("/exchang/:id", requireSignIn, isAdmin, UpadateCategary);
router.get("/find", GetallCategary);
router.delete("/delete/:id", requireSignIn, isAdmin, DeleteCategary);
export default router;
