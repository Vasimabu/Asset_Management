const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Asset = sequelize.define("Asset",{

    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },

    asset_id:{
        type:DataTypes.STRING(30),
        unique:true
    },

    asset_name:{
        type:DataTypes.STRING,
        allowNull:false
    },

    serial_number:{
        type:DataTypes.STRING,
        unique:true
    },

    make:{
        type:DataTypes.STRING
    },

    model:{
        type:DataTypes.STRING
    },

    purchase_date:{
        type:DataTypes.DATEONLY
    },

    purchase_cost:{
        type:DataTypes.DECIMAL(12,2)
    },

    category_id:{
        type:DataTypes.UUID
    },

    branch_id:{
        type:DataTypes.UUID
    },

    status:{
        type:DataTypes.ENUM(
            "AVAILABLE",
            "ISSUED",
            "REPAIR",
            "SCRAPPED"
        ),
        defaultValue:"AVAILABLE"
    }

},{
    tableName:"assets",
    timestamps:true
});

module.exports = Asset;