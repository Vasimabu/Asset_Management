const express = require("express");

const router = express.Router();

const scrapController = require("../controller/scrap-asset");

router.put("/:id/scrap", scrapController.scrapAsset);

router.get("/scrapped", scrapController.getScrappedAssets);

module.exports = router;