"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const authService = new auth_service_1.AuthService();
class AuthController {
    async register(req, res) {
        try {
            const { nombre, correo, password, } = req.body;
            const result = await authService.register(nombre, correo, password);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    async login(req, res) {
        try {
            const { correo, password } = req.body;
            const result = await authService.login(correo, password);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
    async profile(req, res) {
        try {
            const userId = req.user.userId;
            const user = await authService.profile(userId);
            res.status(200).json({
                user,
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
}
exports.AuthController = AuthController;
