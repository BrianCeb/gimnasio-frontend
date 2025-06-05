import React from 'react';

const RegistroIngreso = ({ onRegistrarIngreso }) => {
    const handleRegistro = () => {
        const dni = prompt("DNI del alumno que ingresó:");
        if (dni) {
            onRegistrarIngreso({ dni });
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
