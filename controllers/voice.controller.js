const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { detectSongAndSinger, transformVoiceAI } = require("../services/voice-ai.service");

exports.transformVoice = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No audio file uploaded." });
  }

  const tempInputPath = path.join(__dirname, "../temp", `${Date.now()}-input.wav`);
  fs.writeFileSync(tempInputPath, req.file.buffer);

  try {
    const { songTitle, detectedSinger } = await detectSongAndSinger(tempInputPath);
    const outputPath = await transformVoiceAI(tempInputPath, detectedSinger);

    res.json({
      success: true,
      message: "Voice transformed successfully!",
      originalSong: songTitle,
      matchedSinger: detectedSinger,
      transformedAudioUrl: outputPath,
    });
  } catch (err) {
    console.error("Voice transform error:", err);
    res.status(500).json({ success: false, message: "Voice transformation failed." });
  } finally {
    fs.unlinkSync(tempInputPath); // clean temp file
  }
};
