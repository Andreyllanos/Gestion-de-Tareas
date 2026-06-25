import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";

const projectService =
    new ProjectService();

export class ProjectController {

    async create(
        req: Request,
        res: Response
    ): Promise<void> {

        try {

            const {
                nombre,
                descripcion
            } = req.body;

            const usuarioId =
                req.user!.userId;

            const project =
                await projectService.create(
                    nombre,
                    descripcion,
                    usuarioId
                );

            res.status(201).json(project);

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

            const projects =
                await projectService.findAll(
                    usuarioId
                );

            res.status(200).json(projects);

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

            const project =
                await projectService.findOne(
                    id,
                    usuarioId
                );

            if (!project) {

                res.status(404).json({
                    message:
                        "Proyecto no encontrado"
                });

                return;
            }

            res.status(200).json(project);

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
                nombre,
                descripcion
            } = req.body;

            const usuarioId =
                req.user!.userId;

            const project =
                await projectService.update(
                    id,
                    nombre,
                    descripcion,
                    usuarioId
                );

            res.status(200).json(project);

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

            await projectService.delete(
                id,
                usuarioId
            );

            res.status(200).json({
                message:
                    "Proyecto eliminado"
            });

        } catch (error: any) {

            res.status(400).json({
                message: error.message
            });

        }
    }
}