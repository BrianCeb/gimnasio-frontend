import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../components/SlidebarAdmin';
import AlumnoForm from '../components/AlumnosForm';
import AlumnosList from '../components/AlumnoList';
import AvisoPago from '../components/AvisoPago';

const AlumnosPage = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [editingAlumno, setEditingAlumno] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('alumnos');
        if (stored) {
            setAlumnos(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('alumnos', JSON.stringify(alumnos));
    }, [alumnos]);

    const handleAgregarAlumno = (alumno) => {
        if (editingAlumno) {
            const updated = alumnos.map(a => a === editingAlumno ? alumno : a);
            setAlumnos(updated);
            setEditingAlumno(null);
        } else {
            setAlumnos([...alumnos, alumno]);
        }
    };

    const handleEditarAlumno = (alumno) => {
        setEditingAlumno(alumno);
    };

    const handleEliminarAlumno = (alumno) => {
        if (confirm(`¿Seguro que deseas eliminar a ${alumno.nombre}?`)) {
            setAlumnos(alumnos.filter(a => a !== alumno));
        }
    };

    return (
        <div className="flex">
            <SidebarAdmin />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Gestión de Alumnos</h1>
                <AvisoPago alumnos={alumnos} />
                <AlumnoForm onSubmit={handleAgregarAlumno} editingAlumno={editingAlumno} />
                <AlumnosList alumnos={alumnos} onEdit={handleEditarAlumno} onDelete={handleEliminarAlumno} />
            </main>
        </div>
    );
};

export default AlumnosPage;
