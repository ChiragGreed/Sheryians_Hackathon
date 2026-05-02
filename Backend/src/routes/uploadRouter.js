import express from "express";
import multer from "multer";
import { uploadPDF } from "../controllers/uploadController.js";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), uploadPDF);

export default router;