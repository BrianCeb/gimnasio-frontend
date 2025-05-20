import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import alumnosRouter from './routes/alumnos.routes.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handlebars setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/', alumnosRouter);

// WebSocket
io.on('connection', socket => {
    console.log('Cliente conectado');
    socket.emit('alumnos', alumnos); // Enviar datos actuales al conectar
});

app.set('socketio', io); // Para usar en rutas si es necesario

// Inicializar servidor
httpServer.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
