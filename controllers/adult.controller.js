const { extractLinksFromAdultSite } = require("../services/adult.service");

exports.extractAdultLinks = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, message: "URL is required" });
  }

  try {
    const links = await extractLinksFromAdultSite(url);
    res.json({ success: true, links });
  } catch (error) {
    console.error("Adult link extraction error:", error);
    res.status(500).json({ success: false, message: "Failed to extract adult video links" });
  }
};
