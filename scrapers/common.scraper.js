const axios = require("axios");
const cheerio = require("cheerio");

async function extractFromGenericSite(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);
    const links = [];

    $("a").each((i, el) => {
      const href = $(el).attr("href");
      if (href && /\.(mp4|mkv|avi|mov|m3u8)$/.test(href)) {
        links.push({
          quality: guessQuality(href),
          format: href.split(".").pop(),
          directLink: href,
        });
      }
    });

    return links.length
      ? { success: true, links }
      : { success: false, message: "No video links found." };
  } catch (err) {
    return { success: false, message: "Failed to scrape the site." };
  }
}

function guessQuality(url) {
  if (/1080/.test(url)) return "1080p";
  if (/720/.test(url)) return "720p";
  if (/480/.test(url)) return "480p";
  return "Unknown";
}

module.exports = {
  extractFromGenericSite,
};
