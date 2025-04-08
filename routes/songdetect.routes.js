const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { detectSongAndSinger } = require("../services/voice-ai.service");

// Config for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("audio"), async (req, res) => {
  try {
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({ success: false, message: "No audio file uploaded." });
    }

    // Save temp input
    const tempPath = path.join(__dirname, "../temp", `${Date.now()}-detect.wav`);
    fs.writeFileSync(tempPath, audioFile.buffer);

    // Run detection
    const { songTitle, detectedSinger } = await detectSongAndSinger(tempPath);

    // Delete temp
    fs.unlinkSync(tempPath);

    return res.json({
      success: true,
      message: "Song and singer detected.",
      songTitle,
      singer: detectedSinger,
    });
  } catch (err) {
    console.error("Song detection error:", err);
    return res.status(500).json({ success: false, message: "Song detection failed." });
  }
});

module.exports = router;
