const movieService = require("../services/movie.service");

exports.extractMovieLinks = async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ success: false, message: "URL is required" });

  try {
    const result = await movieService.scrapeMovieLinks(url);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to extract movie links", error: err.message });
  }
};
