import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import SidebarAdmin from '../components/SlidebarAdmin';
import AlumnoForm from '../components/AlumnosForm';
import AlumnosList from '../components/AlumnoList';
import AvisoPago from '../components/AvisoPago';

const socket = io('http://localhost:3000');

const AlumnosPage = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [editingAlumno, setEditingAlumno] = useState(null);

    useEffect(() => {
        // Cargar alumnos del backend
        fetch('http://localhost:3000/api/alumnos')
            .then(res => res.json())
            .then(data => setAlumnos(data));

        // WebSocket: recibir actualizaciones
        socket.on('alumnos', setAlumnos);

        return () => {
            socket.off('alumnos');
        };
    }, []);

    const handleAgregarAlumno = (alumno) => {
        if (editingAlumno) {
            const updated = alumnos.map(a => a === editingAlumno ? alumno : a);
            setAlumnos(updated);
            setEditingAlumno(null);
        } else {
            socket.emit('nuevoAlumno', alumno); // 🔁 Enviar al backend
        }
    };

    const handleEditarAlumno = (alumno) => {
        setEditingAlumno(alumno);
    };

    const handleEliminarAlumno = (alumno) => {
        if (confirm(`¿Seguro que deseas eliminar a ${alumno.nombre}?`)) {
            socket.emit('eliminarAlumno', alumno.nombre); // 🔁 Enviar al backend
        }
    };

    return (
        <div className="flex">
            <SidebarAdmin />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Alumnos</h1>
                <AvisoPago alumnos={alumnos} />
                <AlumnoForm onSubmit={handleAgregarAlumno} editingAlumno={editingAlumno} />
                <AlumnosList alumnos={alumnos} onEdit={handleEditarAlumno} onDelete={handleEliminarAlumno} />
            </main>
        </div>
    );
};

export default AlumnosPage;
