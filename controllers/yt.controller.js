const { extractYouTubeVideoInfo } = require('../services/yt.service');

exports.youtubeHandler = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const videoData = await extractYouTubeVideoInfo(url);
    res.status(200).json({ success: true, data: videoData });
  } catch (error) {
    console.error('YouTube Extraction Error:', error);
    res.status(500).json({ success: false, message: 'Failed to extract YouTube video', error: error.message });
  }
};
