import { Router }
from "express";

import { authMiddleware }
from "../middlewares/auth.middleware";

import { DashboardController }
from "../controllers/dashboard.controller";

const router = Router();

const controller =
    new DashboardController();

router.get(
    "/",
    authMiddleware,
    controller.getStats.bind(
        controller
    )
);

export default router;