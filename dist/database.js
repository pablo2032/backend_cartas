"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConnection = void 0;
const mongoose_1 = require("mongoose");
async function startConnection() {
    const db = await (0, mongoose_1.connect)('mongodb+srv://pablo:Walala123@cluster0.up2i9ij.mongodb.net/cartas', {
    //useNewUrlParser: true        
    });
    console.log('Database is connected');
}
exports.startConnection = startConnection;
