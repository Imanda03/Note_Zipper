import express from "express";
import {
  login,
  register,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/:id", updateUserProfile);

export default router;
