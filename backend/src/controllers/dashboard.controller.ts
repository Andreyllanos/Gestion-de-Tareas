import { Request, Response }
    from "express";

import { DashboardService }
    from "../services/dashboard.service";

const dashboardService =
    new DashboardService();

export class DashboardController {

    async getStats(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const usuarioId =
                req.user!.userId;

            const stats =
                await dashboardService.getStats(
                    usuarioId
                );

            res.status(200).json(stats);

        } catch (error: any) {

            console.error(error);

            res.status(400).json({
                message: error.message,
            });

        }
    }
}