// src/routes/alumnos.router.js
import express from 'express';
import Alumno from '../models/Alumno.js';

const router = express.Router();

// Crear nuevo alumno
router.post('/', async (req, res) => {
    try {
        const { nombre, apellido, dni, email, fechaPago } = req.body;

        const fechaPagoDate = new Date(fechaPago);
        const fechaVencimiento = new Date(fechaPagoDate);
        fechaVencimiento.setDate(fechaPagoDate.getDate() + 30);

        const nuevoAlumno = new Alumno({
            nombre,
            apellido,
            dni,
            email,
            fechaPago: fechaPagoDate,
            fechaVencimiento
        });

        await nuevoAlumno.save();
        res.status(201).json(nuevoAlumno);
    } catch (error) {
        console.error('Error al crear alumno:', error);
        res.status(500).json({ error: 'Error al crear alumno', detalle: error.message });
    }
});

// Obtener todos los alumnos
router.get('/', async (req, res) => {
    try {
        const alumnos = await Alumno.find();
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener alumnos' });
    }
});

// Buscar alumno por DNI
router.get('/dni/:dni', async (req, res) => {
    try {
        const alumno = await Alumno.findOne({ dni: req.params.dni });
        if (!alumno) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }
        res.json(alumno);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar alumno' });
    }
});

// Eliminar alumno por ID
router.delete('/:id', async (req, res) => {
    try {
        const alumnoEliminado = await Alumno.findByIdAndDelete(req.params.id);
        if (!alumnoEliminado) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }
        res.json({ mensaje: 'Alumno eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar alumno' });
    }
});
router.post('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, dni, email, fechaPago } = req.body;

    try {
        const fechaVencimiento = new Date(fechaPago);
        fechaVencimiento.setDate(fechaVencimiento.getDate() + 30);

        await Alumno.findByIdAndUpdate(id, {
            nombre,
            apellido,
            dni,
            email,
            fechaPago,
            fechaVencimiento,
        });

        res.redirect('/alumnos');
    } catch (error) {
        console.error('Error al editar alumno:', error);
        res.status(500).send('Error al editar el alumno');
    }
});


export default router;
