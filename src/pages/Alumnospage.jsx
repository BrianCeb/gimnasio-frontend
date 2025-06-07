import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import SidebarAdmin from '../components/SlidebarAdmin';
import AlumnoForm from '../components/AlumnosForm';
import AlumnosList from '../components/AlumnoList';
import AvisoPago from '../components/AvisoPago';
import { toast } from 'react-toastify';
import { Plus, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;
const socket = io(API_URL);

const AlumnosPage = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [editingAlumno, setEditingAlumno] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/api/alumnos`)
            .then(res => res.json())
            .then(data => setAlumnos(data))
            .catch(err => console.error('Error al obtener alumnos:', err));

        socket.on('alumnos', (data) => {
            setAlumnos(data);
        });

        return () => {
            socket.off('alumnos');
        };
    }, []);

    const handleAgregarAlumno = (alumno) => {
        if (editingAlumno) {
            fetch(`${API_URL}/api/alumnos/${editingAlumno._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(alumno)
            })
                .then(res => {
                    if (!res.ok) throw new Error('Error al editar');
                    return res.json();
                })
                .then(() => {
                    toast.success('✅ Alumno actualizado correctamente');
                    setEditingAlumno(null);
                    setMostrarFormulario(false);
                    fetch(`${API_URL}/api/alumnos`)
                        .then(res => res.json())
                        .then(data => setAlumnos(data));
                })
                .catch(err => {
                    console.error('❌ Error al editar alumno:', err);
                    toast.error('❌ No se pudo actualizar el alumno');
                });
        } else {
            socket.emit('nuevoAlumno', alumno);
            toast.success('✅ Alumno agregado correctamente');
            setMostrarFormulario(false);
        }
    };

    const handleEditarAlumno = (alumno) => {
        setEditingAlumno(alumno);
        setMostrarFormulario(true);
    };

    const handleEliminarAlumno = (alumno) => {
        if (confirm(`¿Seguro que deseas eliminar a ${alumno.nombre}?`)) {
            socket.emit('eliminarAlumno', alumno._id);
            toast.error('Alumno eliminado');
        }
    };

    return (
        <div className="flex min-h-screen bg-neutral-50">
            <SidebarAdmin />
            <main className="flex-1 p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-neutral-800">Gestión de Alumnos</h1>
                        <button
                            onClick={() => setMostrarFormulario(!mostrarFormulario)}
                            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-neutral-800 text-white hover:bg-neutral-900 transition"
                        >
                            {mostrarFormulario ? <X size={18} /> : <Plus size={18} />}
                            <span>{mostrarFormulario ? 'Cancelar' : 'Agregar Alumno'}</span>
                        </button>
                    </div>

                    <AvisoPago alumnos={alumnos} />
                    <AlumnosList alumnos={alumnos} onEdit={handleEditarAlumno} onDelete={handleEliminarAlumno} />

                    {mostrarFormulario && (
                        <div className="mt-6">
                            <AlumnoForm onSubmit={handleAgregarAlumno} editingAlumno={editingAlumno} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AlumnosPage;
