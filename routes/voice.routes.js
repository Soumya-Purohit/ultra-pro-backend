const express = require("express");
const router = express.Router();
const multer = require("multer");
const voiceController = require("../controllers/voice.controller");

// File upload config
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", (req, res) => {
  res.json({
    message: "Voice AI API working. Use POST /api/voice/transform with an audio file.",
  });
});

// Main voice transformation route
router.post("/transform", upload.single("audio"), voiceController.transformVoice);

module.exports = router;
