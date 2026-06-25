"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
const dashboardService = new dashboard_service_1.DashboardService();
class DashboardController {
    async getStats(req, res) {
        try {
            const usuarioId = req.user.userId;
            const stats = await dashboardService.getStats(usuarioId);
            res.status(200).json(stats);
        }
        catch (error) {
            console.error(error);
            res.status(400).json({
                message: error.message,
            });
        }
    }
}
exports.DashboardController = DashboardController;
