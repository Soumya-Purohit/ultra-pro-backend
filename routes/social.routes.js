const express = require("express");
const router = express.Router();
const {
  getSocialVideo,
  postSocialData,
} = require("../controllers/social.controller");

// GET route for testing/extracting
router.get("/extract", getSocialVideo);

// POST route for posting content to extract
router.post("/extract", postSocialData);

module.exports = router;
