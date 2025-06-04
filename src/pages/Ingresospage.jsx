import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../components/SlidebarAdmin';
import RegistroIngreso from '../components/RegistroIngreso';
import { toast } from 'react-toastify';

const IngresosPage = () => {
    const [ingresos, setIngresos] = useState([]);
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/ingresos')
            .then(res => res.json())
            .then(data => setIngresos(data))
            .catch(err => console.error('Error al obtener ingresos:', err));

        fetch('http://localhost:3000/api/alumnos')
            .then(res => res.json())
            .then(data => setAlumnos(data))
            .catch(err => console.error('Error al obtener alumnos:', err));
    }, []);

    const handleRegistrarIngreso = (nuevoIngreso) => {
        fetch('http://localhost:3000/api/ingresos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoIngreso)
        })
            .then(res => res.json())
            .then((data) => {
                setIngresos(prev => [data, ...prev]);
                const alumno = alumnos.find(a => a.nombre.toLowerCase() === nuevoIngreso.nombre.toLowerCase());

                if (alumno) {
                    const vencido = new Date(alumno.fechaVencimiento) < new Date();
                    if (vencido) {
                        toast.warn(`⚠️ ${alumno.nombre} tiene el pago vencido`);
                    } else {
                        toast.success(`✅ Ingreso registrado para ${alumno.nombre}`);
                    }
                } else {
                    toast.info('Ingreso registrado (alumno no encontrado en la base)');
                }
            })
            .catch(err => {
                console.error(err);
                toast.error('❌ Error al registrar ingreso');
            });
    };

    const getSemaforoColor = (fechaVenc) => {
        const diff = (new Date(fechaVenc) - new Date()) / (1000 * 60 * 60 * 24);
        if (diff <= 3 && diff >= 0) return 'bg-yellow-400';
        if (diff < 0) return 'bg-red-500';
        return 'bg-green-500';
    };

    const buscarAlumno = (nombre) => {
        return alumnos.find(a => a.nombre.toLowerCase() === nombre.toLowerCase());
    };

    return (
        <div className="flex">
            <SidebarAdmin />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Registro de Ingresos</h1>
                <RegistroIngreso onRegistrarIngreso={handleRegistrarIngreso} />

                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Historial de Ingresos</h2>
                    <ul className="space-y-2">
                        {ingresos.map((ingreso, index) => {
                            const alumno = buscarAlumno(ingreso.nombre);
                            const semaforo = alumno ? getSemaforoColor(alumno.fechaVencimiento) : 'bg-gray-300';
                            const foto = alumno?.fotoUrl || 'https://via.placeholder.com/40';

                            return (
                                <li
                                    key={index}
                                    className="bg-gray-100 p-3 rounded shadow flex items-center space-x-4"
                                >
                                    <img
                                        src={foto}
                                        alt="Foto"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <span
                                        className={`inline-block w-4 h-4 rounded-full ${semaforo}`}
                                        title="Estado de pago"
                                    ></span>
                                    <span className="font-medium">{ingreso.nombre}</span>
                                    <span className="text-sm text-gray-600">{new Date(ingreso.fecha).toLocaleString()}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default IngresosPage;
