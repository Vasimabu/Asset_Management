// const { Asset, AssetCategory, Branch } = require("../models");

// exports.scrapAsset = async (id, reason) => {

//     await Asset.update(
//         {
//             status: "SCRAPPED",
//             scrap_reason: reason
//         },
//         {
//             where: {
//                 id
//             }
//         }
//     );

//     return await Asset.findByPk(id);

// };

// await asset.update({
//     status: "SCRAPPED"
// });

// await AssetHistory.create({
//     asset_id: asset.id,
//     employee_id: null,
//     action: "SCRAPPED",
//     remarks: "Asset scrapped"
// });

// exports.getScrappedAssets = async () => {

//     return await Asset.findAll({
//         where: {
//             status: "SCRAPPED"
//         },
//         include: [AssetCategory, Branch]
//     });

// };

const { Asset, AssetCategory, Branch, AssetHistory } = require("../models");

exports.scrapAsset = async (id, reason) => {

    await Asset.update(
        {
            status: "SCRAPPED",
            scrap_reason: reason
        },
        {
            where: { id }
        }
    );

    const asset = await Asset.findByPk(id);

    await AssetHistory.create({
        asset_id: asset.id,
        employee_id: null,
        action: "SCRAPPED",
        remarks: reason || "Asset scrapped"
    });

    return asset;
};

exports.getScrappedAssets = async () => {
    return Asset.findAll({
        where: {
            status: "SCRAPPED"
        },
        include: [AssetCategory, Branch]
    });
};