// === src/data/alumnos.manager.js ===
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ruta correcta al archivo de alumnos
const filePath = path.join(__dirname, '../data/alumnos.json');

export function leerAlumnos() {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

export function guardarAlumnos(alumnos) {
    fs.writeFileSync(filePath, JSON.stringify(alumnos, null, 2), 'utf-8');
}
