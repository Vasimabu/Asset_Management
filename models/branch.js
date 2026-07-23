// const {Datatypes} = require("sequelize")
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Branch = sequelize.define("Branch", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    branch_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    branch_code: {
        type: DataTypes.STRING(20),
        unique: true
    },

    address: DataTypes.TEXT,

    city: DataTypes.STRING,

    state: DataTypes.STRING,

    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

},{
    tableName:"branches",
    timestamps:true
});

module.exports = Branch;