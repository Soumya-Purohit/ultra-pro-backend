const express = require("express");
const router = express.Router();
const extractController = require("../controllers/extract.controller");

// GET method for public testing
router.get("/", (req, res) => {
  res.json({
    message: "Extractor API working. Use POST /api/extract with { url: '...' }",
  });
});

// Main POST route for extraction
router.post("/", extractController.extractLinks);

module.exports = router;
