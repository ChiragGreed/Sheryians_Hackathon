import knowledgeSourceModel from "../models/knowledgeSourceModel.js";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { processText } from "../services/pipeline.service.js";

export const uploadPDF = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
        }

        const uint8Array = new Uint8Array(file.buffer);

        const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
        const pdf = await loadingTask.promise;

        let text = "";

        
        for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        const strings = content.items.map(item => item.str);
        text += strings.join(" ") + "\n";
        }

        
        const knowledge = await knowledgeSourceModel.create({
        type: "pdf",
        content: text,
        fileName: file.originalname,
        organizationId: "org1",
        status: "processing",
        });

        
        await processText(text, "org1");

        knowledge.status = "processed";
        await knowledge.save();

        res.json({ message: "PDF uploaded & processed successfully" });

    } catch (err) {
        console.error("❌ Upload Error:", err);
        res.status(500).json({ error: "Upload failed" });
    }
};