"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({
                message: "Token requerido",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        console.log("HEADER:", authHeader);
        console.log("TOKEN:", token);
        const decoded = (0, jwt_1.verifyToken)(token);
        console.log("DECODED:", decoded);
        req.user = decoded;
        next();
    }
    catch {
        res.status(401).json({
            message: "Token inválido",
        });
    }
};
exports.authMiddleware = authMiddleware;
