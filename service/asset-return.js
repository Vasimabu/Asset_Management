const { AssetReturn, Asset, AssetIssue } = require("../models");

exports.returnAsset = async (data) => {

    const assetReturn = await AssetReturn.create(data);

    await Asset.update(
        { status: "AVAILABLE" },
        {
            where: {
                id: data.asset_id
            }
        }
    );

    return assetReturn;
};

exports.getReturns = async () => {

    return await AssetReturn.findAll({
        include: [Asset, AssetIssue]
    });

};

exports.getReturnById = async (id) => {

    return await AssetReturn.findByPk(id, {
        include: [Asset, AssetIssue]
    });

};