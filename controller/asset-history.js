const historyService = require("../service/asset-history");

exports.getHistory = async (req, res) => {

    const history = await historyService.getHistory();

    res.json({
        success: true,
        count: history.length,
        data: history
    });

};

exports.getAssetHistory = async (req, res) => {

    const history = await historyService.getAssetHistory(
        req.params.assetId
    );

    res.json({
        success: true,
        data: history
    });

};