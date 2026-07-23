const express = require("express");
const router = express.Router();

const assetCategoryController = require("../controller/asset-category");

router.post("/", assetCategoryController.createCategory);

router.get("/", assetCategoryController.getCategories);

router.get("/:id", assetCategoryController.getCategoryById);

router.put("/:id", assetCategoryController.updateCategory);

router.delete("/:id", assetCategoryController.deleteCategory);

module.exports = router;