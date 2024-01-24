"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./database");
async function main() {
    (0, database_1.startConnection)();
    const port = process.env.PORT || 3000; // Asegúrate de establecer el puerto adecuado aquí
    app_1.default.listen(port, () => {
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
