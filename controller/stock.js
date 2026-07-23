const stockService = require("../service/stock");

exports.getStock = async (req, res) => {

    try {

        const stock = await stockService.getStock();

        res.json({
            success: true,
            count: stock.length,
            data: stock
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getStockByBranch = async (req, res) => {

    try {

        const stock = await stockService.getStockByBranch(req.params.branchId);

        res.json({
            success: true,
            count: stock.length,
            data: stock
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getStockSummary = async (req, res) => {

    try {

        const summary = await stockService.getStockSummary();

        res.json({
            success: true,
            data: summary[0]
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};