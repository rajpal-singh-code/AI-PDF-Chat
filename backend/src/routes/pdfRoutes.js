const express = require("express");
const router = express.Router();
const fs = require("fs");
const pdfParse = require("pdf-parse");
const upload = require("../config/multer");
const groq = require("../utils/groq");


let storedPdfText = "";

// ✅ ROUTE 1: Upload & parse PDF
router.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    const cleanedText = pdfData.text.replace(/\s+/g, " ").trim();
    storedPdfText = cleanedText.substring(0, 12000);

    res.json({ success: true, message: "PDF uploaded and parsed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ROUTE 2: Ask question about stored PDF
router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!storedPdfText) {
      return res.status(400).json({ error: "No PDF uploaded yet. Please upload a PDF first." });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Answer ONLY from this PDF text: ${storedPdfText}`,
        },
        {
          role: "user",
          content: question,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    const answer = completion.choices[0].message.content;
    res.json({ success: true, answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;