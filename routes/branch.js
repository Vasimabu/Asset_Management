const express = require("express");
const router = express.Router();
const { Branch } = require("../models");

router.get("/", async (req, res) => {
  try {
    const branches = await Branch.findAll({ order: [["branch_name", "ASC"]] });
    res.json({ success: true, count: branches.length, data: branches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;