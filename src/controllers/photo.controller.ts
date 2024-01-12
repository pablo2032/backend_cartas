import { Request, Response } from 'express'
import fs from 'fs-extra'
import path from 'path'

// Models
import Photo, { IPhoto } from '../models/Photo';

export async function getPhotos(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.find();
    return res.json(photos);
};

export async function createPhoto(req: Request, res: Response): Promise<Response> {
    const { 
        tipo, 
        raza,
        nombre,
        coste,
        force,
        habilidades
    
    } = req.body;
    const newPhoto = { 
        tipo, 
        raza, 
        imagePath: req.file?.path,
        nombre,
        coste,
        force,
        habilidades

    };
    const photo = new Photo(newPhoto);
    await photo.save();
    return res.json({
        message: 'Photo Saved Successfully',
        photo
    });
};

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;

        // Verificar si el ID proporcionado es válido antes de realizar la consulta
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'ID de foto no válido' });
        }

        const photo = await Photo.findById(id);

        // Verificar si la foto existe
        if (!photo) {
            return res.status(404).json({ message: 'Foto no encontrada' });
        }

        return res.json(photo);
    } catch (error) {
        console.error('Error al obtener la foto:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export async function deletePhoto(req: Request, res: Response): Promise<Response> {// cuando se devuelve una promesa, se debe retornar un valor y con await
    const { id } = req.params;
    const photo = await Photo.findByIdAndDelete(id);
    if (photo instanceof Photo && 'imagePath' in photo) {
        await fs.unlink(path.resolve(photo.imagePath));
    }
    return res.json({ message: 'Photo Deleted', photo});
};

export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
        tipo,
        raza,        
        nombre,
        coste,
        force,
        habilidades
    } = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
        tipo,
        raza, 
        nombre,
        coste,
        force,
        habilidades
    });
    return res.json({
        message: 'Successfully updated',
        updatedPhoto
    });
}

function isValidObjectId(id: string): boolean {
    const ObjectId = require('mongoose').Types.ObjectId;
    return ObjectId.isValid(id);
}