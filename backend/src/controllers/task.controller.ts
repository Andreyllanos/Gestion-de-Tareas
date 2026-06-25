import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

const taskService =
  new TaskService();

export class TaskController {

  async create(
    req: Request,
    res: Response
  ): Promise<void> {

    try {

      const {
        titulo,
        descripcion,
        estado,
        prioridad,
        fecha_limite,
        proyecto_id
      } = req.body;

      const usuarioId =
        req.user!.userId;

      const task =
        await taskService.create(
          titulo,
          descripcion,
          estado,
          prioridad,
          fecha_limite,
          proyecto_id,
          usuarioId
        );

      res.status(201).json(task);

    } catch (error: any) {

      res.status(400).json({
        message: error.message
      });

    }
  }

  async findAll(
    req: Request,
    res: Response
  ): Promise<void> {

    try {

      const usuarioId =
        req.user!.userId;

      const tasks =
        await taskService.findAll(
          usuarioId
        );

      res.status(200).json(tasks);

    } catch (error: any) {

      res.status(400).json({
        message: error.message
      });

    }
  }

  async findOne(
    req: Request,
    res: Response
  ): Promise<void> {

    try {

      const id =
        Number(req.params.id);

      const usuarioId =
        req.user!.userId;

      const task =
        await taskService.findOne(
          id,
          usuarioId
        );

      if (!task) {

        res.status(404).json({
          message: "Tarea no encontrada"
        });

        return;
      }

      res.status(200).json(task);

    } catch (error: any) {

      res.status(400).json({
        message: error.message
      });

    }
  }

  async update(
    req: Request,
    res: Response
  ): Promise<void> {

    try {

      const id =
        Number(req.params.id);

      const {
        titulo,
        descripcion,
        estado,
        prioridad,
        fecha_limite
      } = req.body;

      const usuarioId =
        req.user!.userId;

      const task =
        await taskService.update(
          id,
          titulo,
          descripcion,
          estado,
          prioridad,
          fecha_limite,
          usuarioId
        );

      res.status(200).json(task);

    } catch (error: any) {

      res.status(400).json({
        message: error.message
      });

    }
  }

  async delete(
    req: Request,
    res: Response
  ): Promise<void> {

    try {

      const id =
        Number(req.params.id);

      const usuarioId =
        req.user!.userId;

      await taskService.delete(
        id,
        usuarioId
      );

      res.status(200).json({
        message: "Tarea eliminada"
      });

    } catch (error: any) {

      res.status(400).json({
        message: error.message
      });

    }
  }
}