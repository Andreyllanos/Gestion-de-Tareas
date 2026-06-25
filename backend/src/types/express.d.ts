import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
    userId: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: CustomJwtPayload;
        }
    }
}

export {};