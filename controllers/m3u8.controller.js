const m3u8Service = require("../services/m3u8.service");

exports.extractM3U8 = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) return res.status(400).json({ success: false, message: "URL is required" });

    const directLink = await m3u8Service.getMP4FromM3U8(url);

    res.json({
      success: true,
      input: url,
      directLink,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to extract", error: err.message });
  }
};
