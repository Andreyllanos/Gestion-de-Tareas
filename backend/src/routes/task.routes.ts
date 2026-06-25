import { Router } from "express";

import { authMiddleware }
from "../middlewares/auth.middleware";

import { TaskController }
from "../controllers/task.controller";

const router = Router();

const controller =
  new TaskController();

router.post(
  "/",
  authMiddleware,
  controller.create.bind(controller)
);

router.get(
  "/",
  authMiddleware,
  controller.findAll.bind(controller)
);

router.get(
  "/:id",
  authMiddleware,
  controller.findOne.bind(controller)
);

router.put(
  "/:id",
  authMiddleware,
  controller.update.bind(controller)
);

router.delete(
  "/:id",
  authMiddleware,
  controller.delete.bind(controller)
);

export default router;