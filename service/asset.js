const { Asset, AssetCategory, Branch } = require("../models");

exports.createAsset = async (data) => {
    return await Asset.create(data);
};

exports.getAssets = async (search, category, status) => {

    const { Op } = require("sequelize");

    let where = {};

    if (search) {
        where[Op.or] = [
            { asset_name: { [Op.iLike]: `%${search}%` } },
            { serial_number: { [Op.iLike]: `%${search}%` } },
            { make: { [Op.iLike]: `%${search}%` } },
            { model: { [Op.iLike]: `%${search}%` } }
        ];
    }

    if (category) {
        where.category_id = category;
    }

    if (status) {
        where.status = status;
    }

    return await Asset.findAll({
        where,
        include: [AssetCategory, Branch]
    });
};

exports.getAssetById = async (id) => {
    return await Asset.findByPk(id);
};

exports.updateAsset = async (id, data) => {

    await Asset.update(data, {
        where: { id }
    });

    return await Asset.findByPk(id);
};

exports.deleteAsset = async (id) => {

    return await Asset.destroy({
        where: { id }
    });
};