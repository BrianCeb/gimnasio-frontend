import mongoose from 'mongoose';

const ingresoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    fecha: { type: Date, required: true }
});

const Ingreso = mongoose.model('Ingreso', ingresoSchema);
export default Ingreso;
