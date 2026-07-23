const { AssetHistory, Employee, Asset } = require("../models");

exports.getHistory = async () => {

    return await AssetHistory.findAll({
        include: [Employee, Asset],
        order: [["createdAt", "DESC"]]
    });

};

exports.getAssetHistory = async (assetId) => {

    return await AssetHistory.findAll({
        where: {
            asset_id: assetId
        },
        include: [Employee, Asset],
        order: [["createdAt", "ASC"]]
    });

};