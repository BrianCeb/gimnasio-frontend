// backend/server.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import alumnosRouter from './src/routes/alumnos.router.js';
import Alumno from './src/models/Alumno.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));

// Rutas API
app.use('/api/alumnos', alumnosRouter);

// Vista paginada con filtros
app.get('/alumnos', async (req, res) => {
    try {
        const { limit = 5, page = 1, sort, nombre } = req.query;

        const query = nombre ? { nombre: { $regex: nombre, $options: 'i' } } : {};
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort ? { nombre: sort === 'asc' ? 1 : -1 } : {}
        };

        const result = await Alumno.paginate(query, options);

        res.render('alumnosPaginados', {
            alumnos: result.docs,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            totalPages: result.totalPages
        });
    } catch (error) {
        res.status(500).send('Error al cargar alumnos');
    }
});

// Vista realtime
app.get('/realtimealumnos', async (req, res) => {
    res.render('alumnos');
});

// WebSocket con MongoDB
io.on('connection', async socket => {
    console.log('📡 Cliente conectado');

    const alumnos = await Alumno.find();
    socket.emit('alumnos', alumnos);

    socket.on('nuevoAlumno', async alumnoData => {
        try {
            const existente = await Alumno.findOne({ dni: alumnoData.dni });
            if (existente) {
                console.log('❌ DNI duplicado');
                return;
            }

            const fechaPago = new Date(alumnoData.fechaPago);
            const fechaVencimiento = new Date(fechaPago);
            fechaVencimiento.setDate(fechaPago.getDate() + 30);

            const nuevoAlumno = new Alumno({
                nombre: alumnoData.nombre,
                apellido: alumnoData.apellido,
                dni: alumnoData.dni,
                email: alumnoData.email,
                fechaPago,
                fechaVencimiento
            });

            await nuevoAlumno.save();
            const actualizados = await Alumno.find();
            io.emit('alumnos', actualizados);
        } catch (err) {
            console.error('❌ Error al guardar alumno desde socket:', err);
        }
    });

    socket.on('eliminarAlumno', async id => {
        await Alumno.findByIdAndDelete(id);
        const actualizados = await Alumno.find();
        io.emit('alumnos', actualizados);
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
