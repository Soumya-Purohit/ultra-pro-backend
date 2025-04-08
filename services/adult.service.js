const axios = require("axios");
const cheerio = require("cheerio");

async function extractLinksFromAdultSite(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const videoLinks = [];

  $("video, source").each((i, el) => {
    const src = $(el).attr("src");
    if (src && (src.endsWith(".mp4") || src.startsWith("https://"))) {
      videoLinks.push(src);
    }
  });

  return videoLinks;
}

module.exports = {
  extractLinksFromAdultSite,
};
