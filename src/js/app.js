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
    mostrarSeccion();//muestra y oculta las secciones
    tabs();// cambia la seccion cuando se presione los tabs
    botonesPaginador();//agrega o quita los botones del paginador
    paginaSiguiente();
    paginaAnterior();

    consultarAPI();//consulta la api del back php

    nombreCliente();// añade el nombre del cliente al objeto de cita
    seleccionarFecha();// añade la fecha de la cita al objeto
    seleccionarHora();// añade la hora  de la cita al objeto

    mostrarResumen();//muestra el resumen de la cita
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

        mostrarResumen();

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
    //identificar el elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    //comprobar si servicio ya fue agregado
    if (servicios.some(agregado => agregado.id === id)) {
        //eliminarlo si esta agregado
        cita.servicios = servicios.filter(agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');

        // console.log('ya esta agregado');
    } else {
        //agregarlo si no esta agregado
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');

        // console.log('no estaba agregado');
    }

    console.log(cita);
}


//almacenamos el nombre del cliente
function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;
}



//seleccionamos fechas disponibles de atencion
function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function (e) {

        const dia = new Date(e.target.value).getUTCDay();
        if ([0].includes(dia)) {
            e.target.value = '';
            mostrarAlerta('Fines de semana no disponibles', 'error', '.formulario');
        } else {
            cita.fecha = e.target.value;
        }
    })
}


// function seleccionarFecha() {
//     const inputFecha = document.querySelector('#fecha');
//     const hoy = new Date();
//     hoy.setHours(0, 0, 0, 0); // Establece la hora a 00:00 para comparar solo la fecha

//     // Función para validar la fecha seleccionada
//     function validarFecha(e) {
//         const fechaSeleccionada = new Date(e.target.value);
//         const dia = fechaSeleccionada.getUTCDay();

//         // Permitir fechas actuales y futuras
//         if (fechaSeleccionada < hoy) {
//             e.target.value = '';
//             mostrarAlerta('No puedes seleccionar una fecha pasada', 'error');
//         } else if ([0].includes(dia)) { // Si es domingo
//             e.target.value = '';
//             mostrarAlerta('Fines de semana no disponibles', 'error');
//         } else {
//             console.log('Fecha correcta seleccionada');
//         }
//     }

//     inputFecha.addEventListener('input', validarFecha);
// }


function seleccionarHora() {
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function (e) {
        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];
        if (hora < 8 || hora > 18) {
            e.target.value = '';
            mostrarAlerta('Hora no valida', 'error', '.formulario')
        } else {
            cita.hora = e.target.value;
            console.log(cita);
        }
        // console.log(hora);
    })
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
    //previene que se genere mas e una alerta
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {
        alertaPrevia.remove();
    };

    //scripting para crear la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if (desaparece) {
        //eliminar la alerta

        setTimeout(() => {
            alerta.remove();
        }, 4000);
    }



    // console.log(alerta);
}
function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen');
    // limpiar el contenido del resumen
    while (resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

    if (Object.values(cita).includes('') || cita.servicios.length === 0) {
        mostrarAlerta('Faltan datos de servicios, fecha u hora', 'error', '.contenido-resumen', false);
        return;
    }

    //formatear el div de resumen
    const { nombre, fecha, hora, servicios } = cita;



    //heading para servicios en resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de servicios';
    resumen.appendChild(headingServicios);
    //iterando y mostrando los servicios
    servicios.forEach(servicio => {
        const { id, precio, nombre } = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    })
    //heading para cita en resumen

    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de Cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fecha}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);

    // console.log(nombreCliente);

}
