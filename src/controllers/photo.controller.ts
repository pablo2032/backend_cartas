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
   
    //usando destructuracion o const id = req.params.id;
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json(photo);
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