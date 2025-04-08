const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

async function getMP4FromM3U8(m3u8Url) {
  return new Promise((resolve, reject) => {
    const outputFileName = `${Date.now()}_output.mp4`;
    const outputPath = path.join(__dirname, "../public/outputs", outputFileName);

    const cmd = `ffmpeg -i "${m3u8Url}" -c copy "${outputPath}" -y`;

    exec(cmd, (error) => {
      if (error) return reject(error);
      resolve(`/outputs/${outputFileName}`);
    });
  });
}

module.exports = { getMP4FromM3U8 };
