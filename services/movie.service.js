const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeMovieLinks(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const links = [];

  $("a").each((_, el) => {
    const link = $(el).attr("href");
    if (link && (link.endsWith(".mp4") || link.endsWith(".mkv") || link.includes("drive") || link.includes("uploads") || link.includes("dl"))) {
      links.push(link);
    }
  });

  return links;
}

module.exports = { scrapeMovieLinks };
