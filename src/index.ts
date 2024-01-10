import app from './app';
require('dotenv').config();
import { startConnection } from './database';

async function main(){
    startConnection();
    await app.listen(app.get('port'));
    console.log('Server en puerto',app.get('port'));
}

main()

