import knowledgeSourceModel from "../models/knowledgeSourceModel.js";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { processText } from "../services/pipeline.service.js";


export const uploadPDF = async (req, res) => {
    try {
        const file = req.file;
        const organizationId = req.user?.organizationId;

        if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
        }

        if (!organizationId) {
        return res.status(401).json({ error: "organizationId is required" });
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
        organizationId,
        status: "processing",
        });

        
        await processText(text, organizationId);

        knowledge.status = "processed";
        await knowledge.save();

        res.json({
        message: "PDF uploaded & processed successfully",
        });

    } catch (err) {
        console.error("❌ Upload Error:", err);
        res.status(500).json({ error: "Upload failed" });
    }
};



export const uploadText = async (req, res) => {
    try {
        const { text } = req.body;
        const organizationId= req.user?.organizationId;

        if (!text) {
        return res.status(400).json({ error: "Text is required" });
        }

        if (!organizationId) {
        return res.status(400).json({ error: "organizationId is required" });
        }

        const knowledge = await knowledgeSourceModel.create({
            type: "text",
            content: text,
            organizationId,
            status: "processing",
        });

        
        await processText(text, organizationId);

        knowledge.status = "processed";
        await knowledge.save();

        res.json({
        message: "Text processed successfully",
        });

    } catch (err) {
        console.error("❌ Upload Text Error:", err);
        res.status(500).json({ error: "Text upload failed" });
    }
};