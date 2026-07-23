const express = require("express");
const router = express.Router();

const stockController = require("../controller/stock");

router.get("/", stockController.getStock);

router.get("/summary", stockController.getStockSummary);

router.get("/branch/:branchId", stockController.getStockByBranch);

module.exports = router;