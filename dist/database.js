"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConnection = void 0;
const mongoose_1 = require("mongoose");
require('dotenv').config();
const dbHost = process.env.MONGODB_URI;
async function startConnection() {
    const db = await (0, mongoose_1.connect)(process.env.MONGODB_URI, {
    //useNewUrlParser: true        
    });
    console.log('Database is connected');
}
exports.startConnection = startConnection;
