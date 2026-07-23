const assetCategoryService = require("../service/asset-category");

// Create Category
exports.createCategory = async (req, res) => {

    try {

        const category = await assetCategoryService.createCategory(req.body);

        return res.status(201).json({
            success: true,
            message: "Category created successfully.",
            data: category
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Get All Categories
exports.getCategories = async (req, res) => {

    try {

        const { search } = req.query;

        const categories = await assetCategoryService.getCategories(search);

        return res.json({
            success: true,
            count: categories.length,
            data: categories
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Get Category By ID
exports.getCategoryById = async (req, res) => {

    try {

        const category = await assetCategoryService.getCategoryById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found."
            });
        }

        return res.json({
            success: true,
            data: category
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Update Category
exports.updateCategory = async (req, res) => {

    try {

        const category = await assetCategoryService.updateCategory(
            req.params.id,
            req.body
        );

        return res.json({
            success: true,
            message: "Category updated successfully.",
            data: category
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Delete Category
exports.deleteCategory = async (req, res) => {

    try {

        await assetCategoryService.deleteCategory(req.params.id);

        return res.json({
            success: true,
            message: "Category deleted successfully."
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};