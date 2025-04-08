const fs = require("fs");
const path = require("path");
const { detectSongAndSinger, transformVoiceAI } = require("../services/voice-ai.service");

exports.transformVoice = async (req, res) => {
  try {
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({ success: false, message: "No audio file uploaded." });
    }

    // Save the uploaded buffer to temp file
    const tempPath = path.join(__dirname, "../temp", `${Date.now()}-input.wav`);
    fs.writeFileSync(tempPath, audioFile.buffer);

    // Step 1: Detect song and singer using AI model
    const { songTitle, detectedSinger } = await detectSongAndSinger(tempPath);

    // Step 2: Transform voice to professional style using AI
    const outputUrl = await transformVoiceAI(tempPath, detectedSinger);

    // Step 3: Cleanup uploaded temp
    fs.unlinkSync(tempPath);

    return res.json({
      success: true,
      message: "Voice transformed successfully.",
      originalSong: songTitle,
      matchedSinger: detectedSinger,
      transformedAudioUrl: outputUrl,
    });
  } catch (error) {
    console.error("Voice transformation error:", error);
    return res.status(500).json({ success: false, message: "Voice transformation failed." });
  }
};
