const { Asset, Branch, AssetCategory } = require("../models");

exports.getStock = async () => {

    return await Asset.findAll({
        where: {
            status: "AVAILABLE"
        },
        include: [Branch, AssetCategory]
    });

};

exports.getStockByBranch = async (branchId) => {

    return await Asset.findAll({
        where: {
            branch_id: branchId,
            status: "AVAILABLE"
        },
        include: [Branch, AssetCategory]
    });

};

exports.getStockSummary = async () => {

    const { sequelize } = Asset;

    return await sequelize.query(`
        SELECT
            b.branch_name,
            COUNT(a.id) AS total_assets,
            COALESCE(SUM(a.purchase_cost),0) AS total_value
        FROM branches b
        LEFT JOIN assets a
            ON a.branch_id=b.id
            AND a.status='AVAILABLE'
        GROUP BY b.branch_name
        ORDER BY b.branch_name;
    `);

};