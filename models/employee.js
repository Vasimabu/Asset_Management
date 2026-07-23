const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Employee = sequelize.define("Employee",{

    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },

    employee_code:{
        type:DataTypes.STRING(20),
        unique:true
    },

    first_name:{
        type:DataTypes.STRING,
        allowNull:false
    },

    last_name:{
        type:DataTypes.STRING
    },

    email:{
        type:DataTypes.STRING,
        unique:true
    },

    mobile:{
        type:DataTypes.STRING(15)
    },

    designation:{
        type:DataTypes.STRING
    },

    branch_id:{
        type:DataTypes.UUID,
        allowNull:false
    },

    status:{
        type:DataTypes.ENUM("ACTIVE","INACTIVE"),
        defaultValue:"ACTIVE"
    }

},{
    tableName:"employees",
    timestamps:true
});

module.exports = Employee;