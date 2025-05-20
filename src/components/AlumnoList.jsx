import React from 'react';

const AlumnosList = ({ alumnos, onEdit, onDelete }) => {
    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Listado de Alumnos</h2>
            <ul className="space-y-2">
                {alumnos.map((alumno, index) => (
                    <li key={index} className="bg-gray-100 p-2 rounded shadow flex justify-between items-center">
                        <div>
                            <span className="font-medium">{alumno.nombre}</span> - Vence: {alumno.fechaPago}
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => onEdit(alumno)}
                                className="bg-yellow-400 text-white px-2 py-1 rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(alumno)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlumnosList;