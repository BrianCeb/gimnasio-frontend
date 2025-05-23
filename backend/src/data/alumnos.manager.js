import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'alumnos.json');

export function leerAlumnos() {
    try {
        console.log(' Intentando leer desde:', filePath); // LOG 1
        if (!fs.existsSync(filePath)) {
            console.warn(' alumnos.json no existe. Devolviendo array vacío.');
            return [];
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        const alumnos = JSON.parse(data);
        console.log(' Leído del archivo:', alumnos); // LOG 2
        return alumnos;
    } catch (error) {
        console.error('Error leyendo alumnos.json:', error); // LOG 3
        return [];
    }
}

export function guardarAlumnos(alumnos) {
    try {
        console.log(' Guardando en archivo:', filePath, alumnos); // LOG 4
        fs.writeFileSync(filePath, JSON.stringify(alumnos, null, 2), 'utf-8');
    } catch (error) {
        console.error(' Error al guardar alumnos:', error); // LOG 5
    }
}

console.log(' __dirname:', __dirname);
console.log(' filePath:', filePath);