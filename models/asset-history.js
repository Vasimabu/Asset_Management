const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AssetHistory = sequelize.define("AssetHistory",{

    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },

    asset_id:{
        type:DataTypes.UUID
    },

    employee_id:{
        type:DataTypes.UUID,
        allowNull:true
    },

    action:{
        type:DataTypes.ENUM(
            "PURCHASED",
            "STOCKED",
            "ISSUED",
            "RETURNED",
            "REPAIR",
            "SCRAPPED"
        )
    },

    action_date:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },

    remarks:DataTypes.TEXT

},{
    tableName:"asset_history",
    timestamps:true
});

module.exports = AssetHistory;