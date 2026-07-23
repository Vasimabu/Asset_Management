const employeeService = require("../service/employee");

// Add Employee
exports.createEmployee = async (req, res) => {
    try {
        const employee = await employeeService.createEmployee(req.body);

        return res.status(201).json({
            success: true,
            message: "Employee created successfully.",
            data: employee
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// View All Employees + Search + Filter
exports.getEmployees = async (req, res) => {
    try {

        const { search, status } = req.query;

        const employees = await employeeService.getEmployees(search, status);

        return res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// View Employee By Id
exports.getEmployeeById = async (req, res) => {

    try {

        const employee = await employeeService.getEmployeeById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: employee
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Edit Employee
exports.updateEmployee = async (req, res) => {

    try {

        const employee = await employeeService.updateEmployee(
            req.params.id,
            req.body
        );

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Employee updated successfully.",
            data: employee
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Employee
exports.deleteEmployee = async (req, res) => {

    try {

        const deleted = await employeeService.deleteEmployee(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully."
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

