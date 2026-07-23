const issueService = require("../service/asset-issue");

exports.issueAsset = async (req, res) => {

    try {

        const issue = await issueService.issueAsset(req.body);

        res.status(201).json({
            success: true,
            message: "Asset issued successfully.",
            data: issue
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getIssuedAssets = async (req, res) => {

    try {

        const issues = await issueService.getIssuedAssets();

        res.json({
            success: true,
            count: issues.length,
            data: issues
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getIssueById = async (req, res) => {

    try {

        const issue = await issueService.getIssueById(req.params.id);

        res.json({
            success: true,
            data: issue
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.updateIssue = async (req, res) => {

    try {

        const issue = await issueService.updateIssue(
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            data: issue
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.deleteIssue = async (req, res) => {

    try {

        await issueService.deleteIssue(req.params.id);

        res.json({
            success: true,
            message: "Issue deleted successfully."
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};