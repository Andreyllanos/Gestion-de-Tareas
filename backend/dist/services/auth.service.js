"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_repository_1 = require("../repositories/user.repository");
const jwt_1 = require("../utils/jwt");
class AuthService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    async register(nombre, correo, password) {
        const existingUser = await this.userRepository.findByEmail(correo);
        if (existingUser) {
            throw new Error("El correo ya está registrado");
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await this.userRepository.create({
            nombre,
            correo,
            password: hashedPassword,
        });
        const token = (0, jwt_1.generateToken)(Number(user.id));
        const { password: _password, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token,
        };
    }
    async login(correo, password) {
        const user = await this.userRepository.findByEmail(correo);
        if (!user) {
            throw new Error("Credenciales inválidas");
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Credenciales inválidas");
        }
        const token = (0, jwt_1.generateToken)(Number(user.id));
        const { password: _password, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token,
        };
    }
    async profile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        const { password: _password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
exports.AuthService = AuthService;
