const scrapService = require("../service/scrap-asset");

exports.scrapAsset = async (req, res) => {

    const asset = await scrapService.scrapAsset(
        req.params.id,
        req.body.reason
    );

    res.json({
        success: true,
        message: "Asset scrapped successfully.",
        data: asset
    });

};

exports.getScrappedAssets = async (req, res) => {

    const assets = await scrapService.getScrappedAssets();

    res.json({
        success: true,
        count: assets.length,
        data: assets
    });

};