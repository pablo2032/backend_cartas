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
require('dotenv').config();
const index_1 = __importDefault(require("./routes/index"));
// Initializations
const app = (0, express_1.default)();
// Settings
app.set('port', process.env.PORT || 3000);
// Middlewares
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, connect_busboy_1.default)());
// Routes
app.use('/api', index_1.default);
// this folders for this application will be used to store public file images
app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
exports.default = app;
