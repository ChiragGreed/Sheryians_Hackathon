import express from "express";
import multer from "multer";
import { uploadPDF,uploadText } from "../controllers/uploadController.js";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), uploadPDF);

router.post("/upload-text", uploadText);

export default router;