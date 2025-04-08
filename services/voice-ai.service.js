const path = require("path");
const fs = require("fs");

// Full list of real + fictional singers (partial list, auto-expand later)
const singers = [
  // Bollywood
  "Arijit Singh", "Shreya Ghoshal", "KK", "Sonu Nigam", "Lata Mangeshkar", "Udit Narayan", "Alka Yagnik", "Kumar Sanu",
  // Rap & Hip-Hop
  "Honey Singh", "Badshah", "Raftaar", "Divine", "Emiway", "Naezy",
  // Folk/Classical
  "Gurdas Maan", "Nooran Sisters", "Pt. Bhimsen Joshi", "Hariprasad Chaurasia",
  // South Indian
  "SP Balasubrahmanyam", "Sid Sriram", "Chinmayi", "Anirudh Ravichander",
  // English & Global
  "Ed Sheeran", "Drake", "Eminem", "Adele", "Taylor Swift", "The Weeknd",
  "Billie Eilish", "Beyonce", "Justin Bieber", "Rihanna", "Selena Gomez",
  // Custom/Fictional
  "Future Legend", "Next Star", "AI Voice #1"
];

// Dummy but expandable logic
async function detectSongAndSinger(filePath) {
  const randomIndex = Math.floor(Math.random() * singers.length);
  const fakeSongName = `Detected Song #${Math.floor(Math.random() * 1000)}`;
  const singer = singers[randomIndex];

  return {
    songTitle: fakeSongName,
    detectedSinger: singer
  };
}

// Simulated voice transformation (to be replaced with real model later)
async function transformVoiceAI(inputPath, singerName) {
  const outputFile = `${Date.now()}-${singerName.replace(/ /g, "_")}.wav`;
  const outputPath = path.join(__dirname, "../public/outputs", outputFile);

  fs.copyFileSync(inputPath, outputPath); // Fake transformation

  return `/outputs/${outputFile}`; // Public-access path
}

module.exports = {
  detectSongAndSinger,
  transformVoiceAI
};
