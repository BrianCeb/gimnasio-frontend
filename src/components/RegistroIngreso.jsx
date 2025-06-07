import React from 'react';

const RegistroIngreso = ({ onRegistrarIngreso }) => {
    const handleRegistro = () => {
        const dni = prompt("DNI del alumno que ingresó:");
        if (dni) {
            onRegistrarIngreso({ dni });
        }
    };

    return (
        <div className="mt-6">
            <button
                onClick={handleRegistro}
                className="px-5 py-2 bg-neutral-800 text-white rounded-md text-sm hover:bg-neutral-900 transition-all shadow-md hover:shadow-lg"
            >
                Registrar Ingreso
            </button>
        </div>
    );
};

export default RegistroIngreso;
