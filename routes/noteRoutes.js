import express from "express";
import {
  CreateNote,
  DeleteNote,
  UpdateNote,
  getNoteById,
  getNotes,
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", CreateNote);
router.get("/", getNotes);
router.get("/:id", getNoteById);
router.put("/:id", UpdateNote);
router.delete("/:id", DeleteNote);

export default router;
