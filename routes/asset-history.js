const express = require("express");

const router = express.Router();

const historyController = require("../controller/asset-history");

router.get("/", historyController.getHistory);

router.get("/:assetId", historyController.getAssetHistory);

module.exports = router;