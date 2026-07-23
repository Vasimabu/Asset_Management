const assetService = require("../service/asset");

exports.createAsset = async (req, res) => {

    try {

        const asset = await assetService.createAsset(req.body);

        return res.status(201).json({
            success: true,
            message: "Asset created successfully.",
            data: asset
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getAssets = async (req, res) => {

    try {

        const { search, category, status } = req.query;

        const assets = await assetService.getAssets(
            search,
            category,
            status
        );

        return res.json({
            success: true,
            count: assets.length,
            data: assets
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getAssetById = async (req, res) => {

    try {

        const asset = await assetService.getAssetById(req.params.id);

        if (!asset) {
            return res.status(404).json({
                success: false,
                message: "Asset not found."
            });
        }

        return res.json({
            success: true,
            data: asset
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.updateAsset = async (req, res) => {

    try {

        const asset = await assetService.updateAsset(
            req.params.id,
            req.body
        );

        return res.json({
            success: true,
            message: "Asset updated successfully.",
            data: asset
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.deleteAsset = async (req, res) => {

    try {

        await assetService.deleteAsset(req.params.id);

        return res.json({
            success: true,
            message: "Asset deleted successfully."
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};