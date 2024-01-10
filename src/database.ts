import { ConnectOptions, connect } from 'mongoose'


export async function startConnection() {
    const db = await connect('mongodb+srv://pablo:Walala123@cluster0.up2i9ij.mongodb.net/cartas',{
 
       //useNewUrlParser: true        
    } as ConnectOptions);
    console.log('Database is connected');
}
