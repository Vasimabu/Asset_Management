const { Employee, Branch } = require("../models");
const { Op } = require("sequelize");

exports.createEmployee = async (data) => {

    return await Employee.create(data);

};
exports.getEmployees = async () => {

    return await Employee.findAll({

        include: [
            {
                model: Branch
            }
        ]

    });

};

exports.getEmployeeById = async(id)=>{

    return await Employee.findByPk(id,{

        include:[Branch]

    });

};

exports.updateEmployee = async(id,data)=>{

    await Employee.update(data,{

        where:{
            id:id
        }

    });

    return await Employee.findByPk(id);

};

exports.deleteEmployee = async(id)=>{

    return await Employee.destroy({

        where:{
            id:id
        }

    });

};

exports.searchEmployee = async(search)=>{

    return await Employee.findAll({

        where:{
            [Op.or]:[
                {
                    first_name:{
                        [Op.iLike]:`%${search}%`
                    }
                },
                {
                    last_name:{
                        [Op.iLike]:`%${search}%`
                    }
                },
                {
                    employee_code:{
                        [Op.iLike]:`%${search}%`
                    }
                }
            ]
        }

    });

};

exports.filterEmployee = async(status)=>{

    return await Employee.findAll({

        where:{
            status:status
        }

    });

};

exports.getEmployees = async (search, status) => {

    const where = {};

    if (search) {
        where[Op.or] = [
            {
                first_name: {
                    [Op.iLike]: `%${search}%`
                }
            },
            {
                last_name: {
                    [Op.iLike]: `%${search}%`
                }
            },
            {
                employee_code: {
                    [Op.iLike]: `%${search}%`
                }
            }
        ];
    }

    if (status) {
        where.status = status;
    }

    return await Employee.findAll({
        where,
        include: [Branch]
    });

};