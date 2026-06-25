import { DashboardRepository }
from "../repositories/dashboard.repository";

export class DashboardService {

    private repository =
        new DashboardRepository();

    async getStats(
        usuarioId: number
    ) {

        return await this.repository.getStats(
            usuarioId
        );
    }
}