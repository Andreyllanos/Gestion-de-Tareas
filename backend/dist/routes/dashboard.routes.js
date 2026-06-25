"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const router = (0, express_1.Router)();
const controller = new dashboard_controller_1.DashboardController();
router.get("/", auth_middleware_1.authMiddleware, controller.getStats.bind(controller));
exports.default = router;
