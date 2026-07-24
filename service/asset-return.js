// const { AssetReturn, Asset, AssetIssue } = require("../models");

// exports.returnAsset = async (data) => {
//     const issue = await AssetIssue.findByPk(data.issue_id);
//     if (!issue) throw new Error("Asset issue not found.");

//     const assetReturn = await AssetReturn.create(data);

//     await Asset.update(
//         { status: "AVAILABLE" },
//         { where: { id: issue.asset_id } }
//     );

//     return 
//     assetReturn;
// };

// const returned = await AssetReturn.create({
//     issue_id,
//     return_date
// });
// await AssetHistory.create({
//     asset_id,
//     employee_id,
//     action: "RETURNED",
//     remarks: "Asset returned"
// });

// const returnInclude = [{ model: AssetIssue, include: [Asset] }];

// exports.getReturns = async () => AssetReturn.findAll({ include: returnInclude });

// exports.getReturnById = async (id) => AssetReturn.findByPk(id, { include: returnInclude });


const { AssetReturn, Asset, AssetIssue, AssetHistory } = require("../models");

exports.returnAsset = async (data) => {

    const issue = await AssetIssue.findByPk(data.issue_id);

    if (!issue) {
        throw new Error("Asset issue not found.");
    }

    const assetReturn = await AssetReturn.create(data);

    await Asset.update(
        { status: "AVAILABLE" },
        { where: { id: issue.asset_id } }
    );

    // Add Asset History
    await AssetHistory.create({
        asset_id: issue.asset_id,
        employee_id: issue.employee_id,
        action: "RETURNED",
        remarks: "Asset returned"
    });

    return assetReturn;
};

const returnInclude = [
    {
        model: AssetIssue,
        include: [Asset]
    }
];

exports.getReturns = async () => {
    return AssetReturn.findAll({
        include: returnInclude
    });
};

exports.getReturnById = async (id) => {
    return AssetReturn.findByPk(id, {
        include: returnInclude
    });
};