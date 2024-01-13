"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePhoto = exports.deletePhoto = exports.getPhoto = exports.createPhoto = exports.getPhotos = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
// Models
const Photo_1 = __importDefault(require("../models/Photo"));
async function getPhotos(req, res) {
    const photos = await Photo_1.default.find();
    return res.json(photos);
}
exports.getPhotos = getPhotos;
;
async function createPhoto(req, res) {
    var _a;
    const { tipo, raza, nombre, coste, force, habilidades, frecuencia, edicion } = req.body;
    const newPhoto = {
        tipo,
        raza,
        imagePath: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path,
        nombre,
        coste,
        force,
        habilidades,
        frecuencia,
        edicion
    };
    const photo = new Photo_1.default(newPhoto);
    await photo.save();
    return res.json({
        message: 'Photo Saved Successfully',
        photo
    });
}
exports.createPhoto = createPhoto;
;
async function getPhoto(req, res) {
    try {
        const { id } = req.params;
        // Verificar si el ID proporcionado es válido antes de realizar la consulta
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'ID no válido' });
        }
        const photo = await Photo_1.default.findById(id);
        // Verificar si la foto existe
        if (!photo) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        return res.json(photo);
    }
    catch (error) {
        console.error('Error al obtener la foto:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
exports.getPhoto = getPhoto;
async function deletePhoto(req, res) {
    const { id } = req.params;
    const photo = await Photo_1.default.findByIdAndDelete(id);
    if (photo instanceof Photo_1.default && 'imagePath' in photo) {
        await fs_extra_1.default.unlink(path_1.default.resolve(photo.imagePath));
    }
    return res.json({ message: 'Photo Deleted', photo });
}
exports.deletePhoto = deletePhoto;
;
async function updatePhoto(req, res) {
    const { id } = req.params;
    const { tipo, raza, nombre, coste, force, habilidades, frecuencia, edicion, } = req.body;
    const updatedPhoto = await Photo_1.default.findByIdAndUpdate(id, {
        tipo,
        raza,
        nombre,
        coste,
        force,
        habilidades,
        frecuencia,
        edicion
    });
    return res.json({
        message: 'Successfully updated',
        updatedPhoto
    });
}
exports.updatePhoto = updatePhoto;
function isValidObjectId(id) {
    const ObjectId = require('mongoose').Types.ObjectId;
    return ObjectId.isValid(id);
}
