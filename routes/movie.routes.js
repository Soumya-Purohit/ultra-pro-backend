const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");

router.get("/", (req, res) => {
  res.json({
    message: "Movie API working. Use GET /api/movies/fetch?url=...",
  });
});

router.get("/fetch", movieController.extractMovieLinks);

module.exports = router;
