const Branch = require("./branch");
const Employee = require("./employee");
const AssetCategory = require("./asset-category");
const Asset = require("./asset");
const AssetIssue = require("./asset-issue");
const AssetReturn = require("./asset-return");
const AssetHistory = require("./asset-history");

// Branch -> Employees
Branch.hasMany(Employee, { foreignKey: "branch_id" });
Employee.belongsTo(Branch, { foreignKey: "branch_id" });

// Branch -> Assets
Branch.hasMany(Asset, { foreignKey: "branch_id" });
Asset.belongsTo(Branch, { foreignKey: "branch_id" });

// Category -> Assets
AssetCategory.hasMany(Asset, { foreignKey: "category_id" });
Asset.belongsTo(AssetCategory, { foreignKey: "category_id" });

// Employee -> Asset Issues
Employee.hasMany(AssetIssue, { foreignKey: "employee_id" });
AssetIssue.belongsTo(Employee, { foreignKey: "employee_id" });

// Asset -> Asset Issues
Asset.hasMany(AssetIssue, { foreignKey: "asset_id" });
AssetIssue.belongsTo(Asset, { foreignKey: "asset_id" });

// Asset Issue -> Asset Return
AssetIssue.hasOne(AssetReturn, { foreignKey: "issue_id" });
AssetReturn.belongsTo(AssetIssue, { foreignKey: "issue_id" });

// Asset -> History
Asset.hasMany(AssetHistory, { foreignKey: "asset_id" });
AssetHistory.belongsTo(Asset, { foreignKey: "asset_id" });

// Employee -> History
Employee.hasMany(AssetHistory, { foreignKey: "employee_id" });
AssetHistory.belongsTo(Employee, { foreignKey: "employee_id" });

module.exports = {
    Branch,
    Employee,
    AssetCategory,
    Asset,
    AssetIssue,
    AssetReturn,
    AssetHistory
};