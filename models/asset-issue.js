const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AssetIssue = sequelize.define("AssetIssue",{

    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },

    asset_id:{
        type:DataTypes.UUID
    },

    employee_id:{
        type:DataTypes.UUID
    },

    issue_date:{
        type:DataTypes.DATEONLY
    },

    expected_return_date:{
        type:DataTypes.DATEONLY
    }

},{
    tableName:"asset_issues",
    timestamps:true
});

module.exports = AssetIssue;