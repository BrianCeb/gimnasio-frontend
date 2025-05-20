import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/alumnos.json');

// Leer alumnos
function leerAlumnos() {
    if (!fs.existsSync(dataPath)) return [];
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
}

// Guardar alumnos
function guardarAlumnos(alumnos) {
    fs.writeFileSync(dataPath, JSON.stringify(alumnos, null, 2));
}

// Página principal
router.get('/', (req, res) => {
    const alumnos = leerAlumnos();
    res.render('alumnos', { alumnos });
});

// API para agregar alumno
router.post('/api/alumnos', (req, res) => {
    const alumnos = leerAlumnos();
    const nuevo = req.body;
    alumnos.push(nuevo);
    guardarAlumnos(alumnos);

    // Emitir por socket
    const io = req.app.get('socketio');
    io.emit('alumnos', alumnos);

    res.status(201).json({ message: 'Alumno agregado' });
});

// API para eliminar alumno
router.delete('/api/alumnos/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    let alumnos = leerAlumnos();
    alumnos
