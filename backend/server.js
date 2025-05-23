// === backend/server.js ===
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { leerAlumnos, guardarAlumnos } from './src/data/alumnos.manager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Configuración Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta Handlebars principal
app.get('/realtimealumnos', (req, res) => {
    res.render('alumnos');
});

// WebSocket
io.on('connection', socket => {
    console.log(' Cliente WebSocket conectado');

    const alumnos = leerAlumnos();
    socket.emit('alumnos', alumnos);

    socket.on('nuevoAlumno', alumno => {
        const lista = leerAlumnos();

        // Calcular fecha de vencimiento: 30 días después de fechaPago
        const fechaPago = new Date(alumno.fechaPago);
        const fechaVencimiento = new Date(fechaPago);
        fechaVencimiento.setDate(fechaVencimiento.getDate() + 30);

        const alumnoConVencimiento = {
            ...alumno,
            fechaVencimiento: fechaVencimiento.toISOString().split('T')[0] // formato YYYY-MM-DD
        };

        lista.push(alumnoConVencimiento);
        guardarAlumnos(lista);
        io.emit('alumnos', lista);
    });

    socket.on('eliminarAlumno', nombre => {
        const lista = leerAlumnos().filter(a => a.nombre !== nombre);
        guardarAlumnos(lista);
        io.emit('alumnos', lista);
    });
});

httpServer.listen(3000, () => {
    console.log(' Servidor escuchando en http://localhost:3000/realtimealumnos');
});
