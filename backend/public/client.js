// public/client.js
const socket = io();

socket.on('alumnos', data => {
    const ul = document.getElementById('lista-alumnos');
    ul.innerHTML = '';
    data.forEach(alumno => {
        const li = document.createElement('li');
        li.textContent = `${alumno.nombre} - Pago hasta: ${alumno.fechaPago}`;
        ul.appendChild(li);
    });
});
