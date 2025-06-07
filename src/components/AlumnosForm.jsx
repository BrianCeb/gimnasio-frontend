import React, { useState, useEffect } from 'react';

const AlumnoForm = ({ onSubmit, editingAlumno }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        fechaPago: '',
        fotoUrl: ''
    });

    useEffect(() => {
        if (editingAlumno) {
            setFormData(editingAlumno);
        }
    }, [editingAlumno]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        if (!editingAlumno) {
            setFormData({
                nombre: '',
                apellido: '',
                dni: '',
                email: '',
                fechaPago: '',
                fotoUrl: ''
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md border border-neutral-200 max-w-xl mx-auto mt-6 w-full animate-fade-in">
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">{editingAlumno ? 'Editar Alumno' : 'Agregar Alumno'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="input"
                />
                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                    className="input"
                />
                <input
                    type="text"
                    name="dni"
                    placeholder="DNI"
                    value={formData.dni}
                    onChange={handleChange}
                    required
                    className="input"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input"
                />
                <input
                    type="date"
                    name="fechaPago"
                    value={formData.fechaPago}
                    onChange={handleChange}
                    required
                    className="input"
                />
                <input
                    type="text"
                    name="fotoUrl"
                    placeholder="URL de la foto"
                    value={formData.fotoUrl}
                    onChange={handleChange}
                    className="input"
                />
            </div>
            <button
                type="submit"
                className="mt-6 w-full bg-neutral-800 text-white py-3 rounded-md text-lg hover:bg-neutral-900 transition"
            >
                {editingAlumno ? 'Guardar Cambios' : 'Agregar Alumno'}
            </button>
        </form>
    );
};

export default AlumnoForm;
