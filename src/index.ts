import httpsServer from './app';
import { startConnection } from './database';

async function main() {
    startConnection();
    const port = process.env.PORT || 3000;  // Asegúrate de establecer el puerto adecuado aquí
    httpsServer.listen(port, () => {
        console.log(`Server running on https://atenea.ddns.net:${port}`);
    });
}

main();

//para version casa
// import { startConnection } from './database';

// async function main(){
//     startConnection();
//     await app.listen(app.get('port'));
//     console.log('Server en puerto',app.get('port'));
// }

// main()

