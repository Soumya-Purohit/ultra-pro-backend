const { extractFromGenericSite } = require("../scrapers/common.scraper");

exports.extractLinks = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, message: "URL is required." });
  }

  const result = await extractFromGenericSite(url);

  if (result.success) {
    res.json({
      success: true,
      message: "Links extracted successfully",
      url,
      links: result.links,
    });
  } else {
    res.status(404).json({
      success: false,
      message: result.message,
    });
  }
};
