"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const connect_busboy_1 = __importDefault(require("connect-busboy"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
require('dotenv').config();
const index_1 = __importDefault(require("./routes/index"));
// Inicializaciones
const app = (0, express_1.default)();
// Configuraciones
app.set('port', process.env.PORT || 3000);
// Middlewares
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, connect_busboy_1.default)());
// Rutas
app.use('/api', index_1.default);
// Carpeta para almacenar imágenes públicas
app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
// Cargar certificados SSL
const privateKey = fs_1.default.readFileSync('/etc/letsencrypt/live/atenea.ddns.net/privkey.pem', 'utf8');
const certificate = fs_1.default.readFileSync('/etc/letsencrypt/live/atenea.ddns.net/cert.pem', 'utf8');
const ca = fs_1.default.readFileSync('/etc/letsencrypt/live/atenea.ddns.net/chain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate, ca: ca };
// Iniciar el servidor HTTPS
const httpsServer = https_1.default.createServer(credentials, app);
exports.default = httpsServer;
//version casa desde rutas
// Routes
//app.use('/api', indexRoutes);
// // this folders for this application will be used to store public file images
//app.use('/uploads', express.static(path.resolve('uploads')));
//export default app;
