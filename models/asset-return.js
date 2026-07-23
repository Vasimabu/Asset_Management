const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AssetReturn = sequelize.define("AssetReturn",{

    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },

    issue_id:{
        type:DataTypes.UUID
    },

    return_date:{
        type:DataTypes.DATEONLY
    },

    return_reason:{
        type:DataTypes.ENUM(
            "UPGRADE",
            "REPAIR",
            "RESIGNATION",
            "OTHER"
        )
    },

    remarks:DataTypes.TEXT

},{
    tableName:"asset_returns",
    timestamps:true
});

module.exports = AssetReturn;