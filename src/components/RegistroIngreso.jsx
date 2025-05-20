import React from 'react';

const RegistroIngreso = ({ onRegistrarIngreso }) => {
    const handleRegistro = () => {
        const nombre = prompt("Nombre del alumno que ingresó:");
        if (nombre) {
            onRegistrarIngreso({ nombre, fecha: new Date().toLocaleString() });
        }
    };

    return (
        <div className="mt-4">
            <button
                onClick={handleRegistro}
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Registrar Ingreso
            </button>
        </div>
    );
};

export default RegistroIngreso;