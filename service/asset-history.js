const { AssetHistory, Employee, Asset } = require("../models");
const { Op } = require("sequelize");

const isUuid = (str) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

exports.getHistory = async (search) => {
    let whereClause = {};

    // if (search) {
    //     whereClause = {
    //         [Op.or]: [
    //             // { action: { [Op.iLike]: `%${search}%` } },
    //             { remarks: { [Op.iLike]: `%${search}%` } },

    //             { '$Asset.asset_name$': { [Op.iLike]: `%${search}%` } },
    //             { '$Asset.asset_id$': { [Op.iLike]: `%${search}%` } },
    //             { '$Asset.serial_number$': { [Op.iLike]: `%${search}%` } },

    //             { '$Employee.first_name$': { [Op.iLike]: `%${search}%` } },
    //             { '$Employee.last_name$': { [Op.iLike]: `%${search}%` } },
    //             { '$Employee.employee_code$': { [Op.iLike]: `%${search}%` } }
    //         ]
    //     };
    // }

    const { Op, Sequelize } = require("sequelize");
if (search) {
whereClause = {
    [Op.or]: [

        Sequelize.where(
            Sequelize.cast(Sequelize.col("AssetHistory.action"), "TEXT"),
            {
                [Op.iLike]: `%${search}%`
            }
        ),

        { remarks: { [Op.iLike]: `%${search}%` } },

        { '$Asset.asset_name$': { [Op.iLike]: `%${search}%` } },
        { '$Asset.asset_id$': { [Op.iLike]: `%${search}%` } },
        { '$Asset.serial_number$': { [Op.iLike]: `%${search}%` } },

        { '$Employee.first_name$': { [Op.iLike]: `%${search}%` } },
        { '$Employee.last_name$': { [Op.iLike]: `%${search}%` } },
        { '$Employee.employee_code$': { [Op.iLike]: `%${search}%` } }
    ]
};
}

    return await AssetHistory.findAll({
        where: whereClause,
        include: [
            { model: Employee, required: false },
            { model: Asset, required: false }
        ],
        order: [["createdAt", "DESC"]]
    });
};

exports.getAssetHistory = async (assetIdOrSearch) => {
    if (isUuid(assetIdOrSearch)) {
        return await AssetHistory.findAll({
            where: {
                asset_id: assetIdOrSearch
            },
            include: [
                { model: Employee, required: false },
                { model: Asset, required: false }
            ],
            order: [["createdAt", "DESC"]]
        });
    }

    return exports.getHistory(assetIdOrSearch);
};