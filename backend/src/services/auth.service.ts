import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";
import { generateToken } from "../utils/jwt";

export class AuthService {
    private userRepository = new UserRepository();

    async register(
        nombre: string,
        correo: string,
        password: string
    ) {
        const existingUser =
            await this.userRepository.findByEmail(correo);

        if (existingUser) {
            throw new Error("El correo ya está registrado");
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user =
            await this.userRepository.create({
                nombre,
                correo,
                password: hashedPassword,
            });

        const token =
            generateToken(Number(user.id));

        const {
            password: _password,
            ...userWithoutPassword
        } = user;

        return {
            user: userWithoutPassword,
            token,
        };
    }

    async login(
        correo: string,
        password: string
    ) {
        const user =
            await this.userRepository.findByEmail(correo);

        if (!user) {
            throw new Error(
                "Credenciales inválidas"
            );
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            throw new Error(
                "Credenciales inválidas"
            );
        }

        const token =
            generateToken(Number(user.id));

        const {
            password: _password,
            ...userWithoutPassword
        } = user;

        return {
            user: userWithoutPassword,
            token,
        };
    }

    async profile(userId: number) {
        const user =
            await this.userRepository.findById(userId);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const {
            password: _password,
            ...userWithoutPassword
        } = user;

        return userWithoutPassword;
    }
}