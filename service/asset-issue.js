const { AssetIssue, Asset, Employee } = require("../models");

exports.issueAsset = async (data) => {

    const issue = await AssetIssue.create(data);

    await Asset.update(
        {
            status: "ISSUED"
        },
        {
            where: {
                id: data.asset_id
            }
        }
    );

    return issue;

};

exports.getIssuedAssets = async () => {

    return await AssetIssue.findAll({
        include: [Asset, Employee]
    });

};

exports.getIssueById = async (id) => {

    return await AssetIssue.findByPk(id, {
        include: [Asset, Employee]
    });

};

exports.updateIssue = async (id, data) => {

    await AssetIssue.update(data, {
        where: {
            id
        }
    });

    return await AssetIssue.findByPk(id);

};

exports.deleteIssue = async (id) => {

    return await AssetIssue.destroy({
        where: {
            id
        }
    });

};