let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    //cambia la seccion cuando presionen los tabs
    mostrarSeccion();
    tabs();
    botonesPaginador();
    paginaSiguiente();
    paginaAnterior();

    consultarAPI();
}
function mostrarSeccion() {
    //ocultar la seccion que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');
    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar');

    }
    // Seleccionar la sección con el paso
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);

    seccion.classList.add('mostrar');

    //quita la clase actual al anterior
    const tabAnterior = document.querySelector('.actual');

    //resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }
    tab.classList.add('actual');
}
function tabs() {
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach(boton => {
        boton.addEventListener('click', function (e) {
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();
        })
    })
}
function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');

    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion();

}
function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function () {
        if (paso <= pasoInicial) return;
        paso--;

        botonesPaginador();
    })
}
function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function () {
        if (paso >= pasoFinal) return;
        paso++;

        botonesPaginador();
    })
}
async function consultarAPI() {
    try {
        const url = 'http://localhost:3000/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);

    } catch (error) {
        console.log(error);
    }
}
function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        const { id, nombre, precio } = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const serviciodDiv = document.createElement('DIV');
        serviciodDiv.classList.add('servicio');
        serviciodDiv.dataset.idServicio = id;
        serviciodDiv.onclick = function () {
            seleccionarServicio(servicio);
        };

        serviciodDiv.appendChild(nombreServicio);
        serviciodDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(serviciodDiv);
        // console.log(serviciodDiv);


    })
}
function seleccionarServicio(servicio) {
    const { id } = servicio;
    const { servicios } = cita;
    cita.servicios = [...servicios, servicio];

    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);
    divServicio.classList.add('seleccionado');
    console.log(cita);
}