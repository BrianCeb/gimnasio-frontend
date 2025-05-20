import React, { useState, useEffect } from 'react';

const AlumnoForm = ({ onSubmit, editingAlumno }) => {
    const [alumno, setAlumno] = useState({ nombre: '', fechaPago: '' });

    useEffect(() => {
        if (editingAlumno) {
            setAlumno(editingAlumno);
        }
    }, [editingAlumno]);

    const handleChange = (e) => {
        setAlumno({ ...alumno, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(alumno);
        setAlumno({ nombre: '', fechaPago: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">{editingAlumno ? 'Editar Alumno' : 'Alta de Alumno'}</h2>
            <div className="mb-2">
                <label className="block mb-1">Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={alumno.nombre}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block mb-1">Fecha de Pago:</label>
                <input
                    type="date"
                    name="fechaPago"
                    value={alumno.fechaPago}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
                {editingAlumno ? 'Actualizar' : 'Guardar'}
            </button>
        </form>
    );
};

export default AlumnoForm;
