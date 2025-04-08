const axios = require("axios");
const cheerio = require("cheerio");

exports.extractSocialLinks = async (url) => {
  // Yeh bas ek working structure hai, tu chahe to har site ka custom parser bana
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let videoLinks = [];

    $("video").each((i, el) => {
      const src = $(el).attr("src");
      if (src) videoLinks.push(src);
    });

    return {
      success: true,
      links: videoLinks.length > 0 ? videoLinks : ["No direct <video> src found"],
    };
  } catch (error) {
    throw new Error("Failed to extract links: " + error.message);
  }
};
