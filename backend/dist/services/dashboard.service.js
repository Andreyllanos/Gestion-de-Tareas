"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const dashboard_repository_1 = require("../repositories/dashboard.repository");
class DashboardService {
    constructor() {
        this.repository = new dashboard_repository_1.DashboardRepository();
    }
    async getStats(usuarioId) {
        return await this.repository.getStats(usuarioId);
    }
}
exports.DashboardService = DashboardService;
