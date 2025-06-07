import React, { useEffect, useState } from 'react';
import SidebarAdmin from '../components/SlidebarAdmin';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const PagosPage = () => {
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/alumnos`)
            .then(res => res.json())
            .then(data => setAlumnos(data))
            .catch(err => console.error('Error al obtener alumnos:', err));
    }, []);

    const marcarPago = (id) => {
        fetch(`${API_URL}/api/alumnos/${id}/pago`, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                toast.success('✅ Pago marcado correctamente');
                setAlumnos(prev => prev.map(a => (a._id === id ? data : a)));
            })
            .catch(err => {
                console.error(err);
                toast.error('❌ Error al marcar el pago');
            });
    };

    const getEstado = (fechaVenc) => {
        const diff = (new Date(fechaVenc) - new Date()) / (1000 * 60 * 60 * 24);
        if (diff <= 3 && diff >= 0) return { texto: 'Por vencer', color: 'bg-yellow-400' };
        if (diff < 0) return { texto: 'Vencido', color: 'bg-red-500' };
        return { texto: 'Al día', color: 'bg-green-500' };
    };

    return (
        <div className="flex min-h-screen">
            <SidebarAdmin />
            <main className="flex-1 p-6 bg-gray-50">
                <h1 className="text-3xl font-bold mb-6 text-center">Control de Pagos</h1>
                <p className="text-center text-gray-600 mb-8">
                    Aquí puedes ver el estado de los pagos de los alumnos y marcar pagos actualizados.
                </p>
                <div className="max-w-5xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {alumnos.map(alumno => {
                        const estado = getEstado(alumno.fechaVencimiento);
                        return (
                            <div
                                key={alumno._id}
                                className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between transition hover:shadow-lg"
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={alumno.fotoUrl || 'https://via.placeholder.com/40'}
                                        alt="foto"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{alumno.nombre} {alumno.apellido}</h3>
                                        <p className="text-sm text-gray-500">DNI: {alumno.dni}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${estado.color}`}>
                                        {estado.texto}
                                    </span>
                                    <button
                                        onClick={() => marcarPago(alumno._id)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded transition"
                                    >
                                        Marcar Pago
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default PagosPage;
