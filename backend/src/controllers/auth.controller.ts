import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  async register(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const {
        nombre,
        correo,
        password,
      } = req.body;

      const result =
        await authService.register(
          nombre,
          correo,
          password
        );

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async login(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const {
        correo,
        password
      } = req.body;

      const result =
        await authService.login(
          correo,
          password
        );

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async profile(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.user!.userId;
      const user = await authService.profile(userId);

      res.status(200).json({
        user,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}