import express from "express";
const router = express.Router();
import {
  LoginUsers,
  forget_Password,
  register,
  testing,
} from "../collection/Usercollection.js";

import { requireSignIn, isAdmin } from "../middleware/auth.js";

router.post("/sign", register);
router.post("/login", LoginUsers);
router.get("/get", requireSignIn, testing);
router.get("/forget", forget_Password);
router.get("/user-auth", requireSignIn, (req, resp) => {
  resp.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, resp) => {
  resp.status(200).send({ ok: true });
});

export default router;
