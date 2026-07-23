const { AssetCategory } = require("../models");

exports.createCategory = async (data) => {
    return await AssetCategory.create(data);
};

exports.getCategories = async (search) => {

    const { Op } = require("sequelize");

    let where = {};

    if (search) {
        where.category_name = {
            [Op.iLike]: `%${search}%`
        };
    }

    return await AssetCategory.findAll({
        where,
        order: [["category_name", "ASC"]]
    });
};

exports.getCategoryById = async (id) => {
    return await AssetCategory.findByPk(id);
};

exports.updateCategory = async (id, data) => {

    await AssetCategory.update(data, {
        where: { id }
    });

    return await AssetCategory.findByPk(id);
};

exports.deleteCategory = async (id) => {

    return await AssetCategory.destroy({
        where: { id }
    });
};