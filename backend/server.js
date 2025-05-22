// === backend/server.js ===
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import alumnosRouter from './routes/alumnos.routes.js';
import { leerAlumnos, guardarAlumnos } from './src/data/alumnos.manager.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handlebars setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Estado persistente de alumnos
io.on('connection', socket => {
    console.log('Cliente conectado');
    const alumnos = leerAlumnos(); // 🔁 leer archivo actualizado
    socket.emit('alumnos', alumnos);

    socket.on('nuevoAlumno', alumno => {
        const alumnosActualizados = leerAlumnos();
        alumnosActualizados.push(alumno);
        guardarAlumnos(alumnosActualizados);
        io.emit('alumnos', alumnosActualizados);
    });

    socket.on('eliminarAlumno', nombre => {
        let alumnosActualizados = leerAlumnos();
        alumnosActualizados = alumnosActualizados.filter(a => a.nombre !== nombre);
        guardarAlumnos(alumnosActualizados);
        io.emit('alumnos', alumnosActualizados);
    });
});

// Rutas
app.use('/', alumnosRouter);

app.get('/realtimealumnos', (req, res) => {
    res.render('realTimeAlumnos');
});

// WebSocket
io.on('connection', socket => {
    console.log('Cliente conectado');
    const alumnos = leerAlumnos();
    socket.emit('alumnos', alumnos);

    socket.on('nuevoAlumno', alumno => {
        const alumnosActualizados = leerAlumnos();
        alumnosActualizados.push(alumno);
        guardarAlumnos(alumnosActualizados);
        io.emit('alumnos', alumnosActualizados);
    });

    socket.on('eliminarAlumno', nombre => {
        let alumnosActualizados = leerAlumnos();
        alumnosActualizados = alumnosActualizados.filter(a => a.nombre !== nombre);
        guardarAlumnos(alumnosActualizados);
        io.emit('alumnos', alumnosActualizados);
    });
});

app.set('socketio', io);

httpServer.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
