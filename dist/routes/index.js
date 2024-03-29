"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_controller_1 = require("../controllers/auth.controller"); //
const multer_1 = __importDefault(require("../libs/multer"));
const photo_controller_1 = require("../controllers/photo.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
// middleware
//router.use(upload.single('image'));
// routes
router.post('/auth/login', auth_controller_1.login);
router.use('api/photos', auth_middleware_1.authenticate);
router.route('/photos')
    .get(photo_controller_1.getPhotos)
    .post(multer_1.default.single('image'), photo_controller_1.createPhoto);
router.route('/photos/:id')
    .get(photo_controller_1.getPhoto)
    .delete(photo_controller_1.deletePhoto)
    .put(photo_controller_1.updatePhoto);
exports.default = router;
