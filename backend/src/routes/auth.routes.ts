import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const authController = new AuthController();

router.post(
  "/register",
  authController.register.bind(authController)
);

router.post(
  "/login",
  authController.login.bind(authController)
);

router.get(
  "/profile",
  authMiddleware,
  authController.profile.bind(authController)
);

export default router;