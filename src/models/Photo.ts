import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    tipo: String,
    raza: String,
    imagePath: String,
    nombre: String,
    coste: Number,
    force: Number,
    habilidades: String,
    frecuencia:String,
    edicion:String,


});

export interface IPhoto extends Document {
    tipo: string;
    raza: string;
    imagePath: string;
    nombre: string,
    coste: Number,
    force: Number,
    habilidades: string,
    frecuencia:string,
    edicion:string,
}

export default model<IPhoto>('Photo', schema);