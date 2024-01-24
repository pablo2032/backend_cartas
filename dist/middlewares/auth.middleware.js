"use strict";
// middlewares/auth.middleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET); // Reemplaza con la clave secreta utilizada para firmar el token
        req['user'] = decoded; // Almacena la información del usuario en el objeto de solicitud para su uso posterior
        next(); // Continúa con la siguiente middleware o ruta
    }
    catch (error) {
        return res.status(401).json({ message: 'Token de autenticación no válido' });
    }
};
exports.authenticate = authenticate;
