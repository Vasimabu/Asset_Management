const assetReturnService = require("../service/asset-return");

exports.returnAsset = async (req, res) => {

    try {

        const data = await assetReturnService.returnAsset(req.body);

        res.status(201).json({
            success: true,
            message: "Asset returned successfully.",
            data
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getReturns = async (req, res) => {

    const data = await assetReturnService.getReturns();

    res.json({
        success: true,
        count: data.length,
        data
    });

};

exports.getReturnById = async (req, res) => {

    const data = await assetReturnService.getReturnById(req.params.id);

    res.json({
        success: true,
        data
    });

};