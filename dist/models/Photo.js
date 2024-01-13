"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    tipo: String,
    raza: String,
    imagePath: String,
    nombre: String,
    coste: Number,
    force: Number,
    habilidades: String,
    frecuencia: String,
    edicion: String,
});
exports.default = (0, mongoose_1.model)('Photo', schema);
