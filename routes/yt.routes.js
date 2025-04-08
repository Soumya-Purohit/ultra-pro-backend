const express = require('express');
const router = express.Router();
const { youtubeHandler } = require('../controllers/yt.controller');

router.post('/youtube', youtubeHandler);

module.exports = router;
