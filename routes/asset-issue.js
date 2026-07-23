const express = require("express");

const router = express.Router();

const issueController = require("../controller/asset-issue");

router.post("/", issueController.issueAsset);

router.get("/", issueController.getIssuedAssets);

router.get("/:id", issueController.getIssueById);

router.put("/:id", issueController.updateIssue);

router.delete("/:id", issueController.deleteIssue);

module.exports = router;