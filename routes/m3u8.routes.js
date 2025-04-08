const express = require("express");
const router = express.Router();
const m3u8Controller = require("../controllers/m3u8.controller");

router.post("/extract", m3u8Controller.extractM3U8);

module.exports = router;
