import express from 'express';
import Ingreso from '../models/Ingreso.js';

const router = express.Router();

// Crear nuevo ingreso
router.post('/', async (req, res) => {
    try {
        const nuevo = new Ingreso({
            nombre: req.body.nombre,
            fecha: new Date()
        });
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (error) {
        console.error('❌ Error al guardar ingreso:', error);
        res.status(500).json({ error: 'Error al registrar ingreso' });
    }
});

// Obtener todos los ingresos
router.get('/', async (req, res) => {
    try {
        const ingresos = await Ingreso.find().sort({ fecha: -1 });
        res.json(ingresos);
    } catch (error) {
        console.error('❌ Error al obtener ingresos:', error);
        res.status(500).json({ error: 'Error al obtener ingresos' });
    }
});

export default router;
