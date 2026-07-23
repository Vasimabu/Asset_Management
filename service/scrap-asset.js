const { Asset } = require("../models");

exports.scrapAsset = async (id, reason) => {

    await Asset.update(
        {
            status: "SCRAPPED",
            scrap_reason: reason
        },
        {
            where: {
                id
            }
        }
    );

    return await Asset.findByPk(id);

};

exports.getScrappedAssets = async () => {

    return await Asset.findAll({
        where: {
            status: "SCRAPPED"
        }
    });

};