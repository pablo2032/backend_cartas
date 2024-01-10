import { ConnectOptions, connect } from 'mongoose'
require('dotenv').config();

const dbHost = process.env.MONGODB_URI;

export async function startConnection() {
    const db = await connect(process.env.MONGODB_URI!,{
 
       //useNewUrlParser: true        
    } as ConnectOptions);
    console.log('Database is connected');
}
