const express = require("express");
const router = express.Router();
const adultController = require("../controllers/adult.controller");

router.post("/extract", adultController.extractAdultLinks);

module.exports = router;
