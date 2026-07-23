const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AssetCategory = sequelize.define("AssetCategory",{

    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },

    category_name:{
        type:DataTypes.STRING,
        allowNull:false
    },

    description:DataTypes.TEXT

},{
    tableName:"asset_categories",
    timestamps:true
});

module.exports = AssetCategory;