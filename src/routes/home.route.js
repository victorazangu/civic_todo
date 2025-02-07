const express = require("express");
const router = express.Router();
const { landingController } = require("../controllers");

router.get("/", landingController.landingPage);

module.exports = router;
