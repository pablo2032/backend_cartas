import express, { Application } from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import busboy from 'connect-busboy';
import fs from 'fs';
import https from 'https';
require('dotenv').config();

import indexRoutes from './routes/index';

// Inicializaciones
const app: Application = express();

// Configuraciones
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(busboy());

// Rutas
app.use('/api', indexRoutes);

// Carpeta para almacenar imágenes públicas
app.use('/uploads', express.static(path.resolve('uploads')));

// Cargar certificados SSL
const privateKey = fs.readFileSync('/etc/letsencrypt/live/atenea.ddns.net/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/atenea.ddns.net/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/atenea.ddns.net/chain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate, ca: ca };

// Iniciar el servidor HTTPS
const httpsServer = https.createServer(credentials, app);

export default httpsServer;


//version casa desde rutas
// Routes
//app.use('/api', indexRoutes);

// // this folders for this application will be used to store public file images
//app.use('/uploads', express.static(path.resolve('uploads')));

//export default app;





