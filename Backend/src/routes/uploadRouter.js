import express from "express";
import multer from "multer";
import { uploadPDF,uploadText } from "../controllers/uploadController.js";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
import {verifyToken} from "../middleware/authMiddleware.js";

router.post("/upload",verifyToken, upload.single("file"), uploadPDF);

router.post("/upload-text", verifyToken, uploadText);

export default router;