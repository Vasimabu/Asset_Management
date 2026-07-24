// const historyService = require("../service/asset-history");

// exports.getHistory = async (req, res) => {

//     const history = await historyService.getHistory();

//     res.json({
//         success: true,
//         count: history.length,
//         data: history
//     });

// };

// exports.getAssetHistory = async (req, res) => {

//     const history = await historyService.getAssetHistory(
//         req.params.assetId
//     );

//     res.json({
//         success: true,
//         data: history
//     });

// };

const historyService = require("../service/asset-history");

exports.getHistory = async (req, res) => {
    try {
        const history = await historyService.getHistory(req.query.search);

        res.json({
            success: true,
            count: history.length,
            data: history
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getAssetHistory = async (req, res) => {
    try {
        const history = await historyService.getAssetHistory(req.params.assetId);

        res.json({
            success: true,
            data: history
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};