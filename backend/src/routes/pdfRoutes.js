const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const groq = require("../utils/groq");


const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files allowed"), false);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    
    const pdfData = await pdfParse(req.file.buffer);

    const cleanedText = pdfData.text.replace(/\s+/g, " ").trim();
    const truncatedText = cleanedText.substring(0, 12000);

    res.json({ success: true, parsedText: truncatedText });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/ask", async (req, res) => {
  try {
    const { question, pdfText } = req.body;

    if (!pdfText) {
      return res.status(400).json({ error: "No PDF uploaded yet. Please upload first." });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Answer ONLY from this PDF text: ${pdfText}`,
        },
        {
          role: "user",
          content: question,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    res.json({ success: true, answer: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;