const express = require("express");
const router = express.Router();

const assetReturnController = require("../controller/asset-return");

router.post("/", assetReturnController.returnAsset);

router.get("/", assetReturnController.getReturns);

router.get("/:id", assetReturnController.getReturnById);

module.exports = router;