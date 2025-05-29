// src/models/Alumno.js
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const alumnoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    fechaPago: { type: Date, required: true },
    fechaVencimiento: { type: Date, required: true }
}, {
    timestamps: true
});

// Plugin de paginación
alumnoSchema.plugin(mongoosePaginate);

const Alumno = mongoose.model('Alumno', alumnoSchema);
export default Alumno;
