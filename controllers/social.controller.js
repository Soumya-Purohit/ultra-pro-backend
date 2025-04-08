const { extractSocialLinks } = require("../services/social.service");

exports.getSocialVideo = async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const result = await extractSocialLinks(url);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

exports.postSocialData = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const result = await extractSocialLinks(url);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};
