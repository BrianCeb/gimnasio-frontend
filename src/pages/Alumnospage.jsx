import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import SidebarAdmin from '../components/SlidebarAdmin';
import AlumnoForm from '../components/AlumnosForm';
import AlumnosList from '../components/AlumnoList';
import AvisoPago from '../components/AvisoPago';

const socket = io('http://localhost:3000'); // ✅ Asegura la conexión

const AlumnosPage = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [editingAlumno, setEditingAlumno] = useState(null);

    useEffect(() => {
        // Cargar alumnos al iniciar desde API (fallback inicial)
        fetch('http://localhost:3000/api/alumnos')
            .then(res => res.json())
            .then(data => setAlumnos(data))
            .catch(err => console.error('Error al obtener alumnos:', err));

        // Escuchar actualizaciones en tiempo real
        socket.on('alumnos', (data) => {
            setAlumnos(data);
        });

        return () => {
            socket.off('alumnos');
        };
    }, []);

    const handleAgregarAlumno = (alumno) => {
    if (editingAlumno) {
        fetch(`http://localhost:3000/api/alumnos/${editingAlumno._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alumno)
        })
        .then(res => res.json())
        .then((updated) => {
            // Actualiza el listado localmente
            const actualizados = alumnos.map(a =>
                a._id === updated._id ? updated : a
            );
            setAlumnos(actualizados);
            setEditingAlumno(null);
        })
        .catch(err => console.error('Error al editar alumno:', err));
    } else {
        socket.emit('nuevoAlumno', alumno); // Alta por WebSocket
    }
};


    const handleEditarAlumno = (alumno) => {
        setEditingAlumno(alumno);
    };

    const handleEliminarAlumno = (alumno) => {
        if (confirm(`¿Seguro que deseas eliminar a ${alumno.nombre}?`)) {
            socket.emit('eliminarAlumno', alumno._id); // ✅ Importante usar _id
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
