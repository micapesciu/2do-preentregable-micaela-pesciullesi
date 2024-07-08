// Clase Reserva
class Reserva {
    constructor(destino, horario, anio, mes, dia, numeroReserva) {
        this.destino = destino
        this.horario = horario
        this.anio = anio
        this.mes = mes
        this.dia = dia
        this.numeroReserva = numeroReserva
    }
}

// Clase Pasajero
class Pasajero {
    constructor(nombrePasajero, dni, celular, fechaDeNacimiento, email) {
        this.nombrePasajero = nombrePasajero 
        this.dni = dni 
        this.celular = celular 
        this.fechaDeNacimiento = fechaDeNacimiento 
        this.email = email 
    }
}

// Clase Pago
class Pago {
    constructor(tarjeta, cuotas, precio) {
        this.tarjeta = tarjeta 
        this.cuotas = parseInt(cuotas, 10) 
        this.totalPorCuota = (precio / this.cuotas).toFixed(2) 
    }
}

// Función de orden superior para crear un botón
function crearBoton(id, texto, clase, evento) {
    let boton = document.createElement('button') 
    boton.id = id 
    boton.className = clase 
    boton.textContent = texto 
    boton.addEventListener('click', evento) 
    return boton 
}

// Función de orden superior para crear un select con opciones
function crearSelect(id, opciones) {
    let select = document.createElement('select') 
    select.id = id 

    opciones.forEach(opcion => {
        let opt = document.createElement('option') 
        opt.value = opcion 
        opt.textContent = opcion 
        select.appendChild(opt) 
    }) 

    return select 
}

// Función de orden superior para crear un input
function crearInput(id, tipo, placeholder, requerido = false) {
    let input = document.createElement('input') 
    input.id = id 
    input.type = tipo 
    input.placeholder = placeholder 
    if (requerido) input.required = true 
    return input 
}

// Función de orden superior para eliminar un elemento 
function eliminarElementoSiExiste(id) {
    const elemento = document.getElementById(id) 
    if (elemento) elemento.remove() 
}

// Inicio de Menu - Pide datos del vuelo
function menuReserva() {
    eliminarElementoSiExiste('modal-reserva') 

    // Carga de destinos y horarios en los combos
    const destinos = ["Mendoza", "Cordoba", "Neuquen", "Tierra del Fuego", "Salta", "Jujuy", "Chubut", "Santa Cruz"] 
    const horarios = ["08:00hs", "09:30hs", "11:00hs", "14:30hs", "17:00hs", "19:45hs", "22:15hs"] 

    destinos.sort((a, b) => {
        return a.localeCompare(b)
    })

    let menuReservaDiv = document.createElement('div') 
    menuReservaDiv.id = 'modal-reserva' 

    menuReservaDiv.innerHTML = `
        <h1>Bienvenido a Aerolíneas PilotHouse! 👨‍✈️👩‍✈️✈️</h1>
        <h2>Seleccioná tu destino</h2>
        <div id="select-destino"></div>
        <h2>Seleccioná la fecha</h2>
        <div id="input-fecha"></div>
        <h2>Seleccioná tu horario</h2>
        <div id="select-horario"></div>
        <div id="botones">
    ` 

    document.body.append(menuReservaDiv) 

    document.getElementById('select-destino').appendChild(crearSelect('destinos', destinos)) 
    document.getElementById('input-fecha').appendChild(crearInput('calendario', 'text', 'Busca una fecha', true)) 
    document.getElementById('select-horario').appendChild(crearSelect('horarios', horarios)) 

    document.getElementById('botones').appendChild(crearBoton('botonSiguiente', 'Siguiente', 'boton-reserva', () => {
        if (validarFormulario(menuReservaDiv)) {
            guardarDatosReserva() 
        }
    })) 

    document.getElementById('botones').appendChild(crearBoton('botonCancelar', 'Cancelar', 'boton-reserva', () => {
        window.location.href = '../index.html' 
    })) 

    // Inicialización de flatpickr para el input de fecha
    flatpickr("#calendario", {
        dateFormat: "Y-m-d",
        minDate: "today"
    }) 
}

//Pide datos del pasajero
function datosPasajero() {
    eliminarElementoSiExiste('modal-reserva') 

    const datosPasajeroDiv = document.createElement('div') 
    datosPasajeroDiv.id = 'modal-reserva' 
    datosPasajeroDiv.innerHTML = `
        <h2>Ingresa tu nombre</h2>
        <div id="input-nombre"></div>
        <h2>Ingresa tu DNI</h2>
        <div id="input-dni"></div>
        <h2>Ingresa tu número de celular</h2>
        <div id="input-celular"></div>
        <h2>Ingresa tu fecha de nacimiento</h2>
        <div id="input-cumpleanios"></div>
        <h2>Ingresa tu correo electrónico</h2>
        <div id="input-email"></div>
        <div id="botones"></div>
    ` 

    document.body.appendChild(datosPasajeroDiv) 

    document.getElementById('input-nombre').appendChild(crearInput('nombre', 'text', 'Ingresa tu nombre', true)) 
    document.getElementById('input-dni').appendChild(crearInput('dni', 'text', 'Ingresa tu DNI', true)) 
    document.getElementById('input-celular').appendChild(crearInput('celular', 'text', 'Ingresa tu número de celular', true)) 
    document.getElementById('input-cumpleanios').appendChild(crearInput('cumpleanios', 'text', 'Busca tu cumpleaños', true)) 
    document.getElementById('input-email').appendChild(crearInput('email', 'email', 'Ingresa tu correo electrónico', true)) 

    document.getElementById('botones').appendChild(crearBoton('botonSiguiente', 'Siguiente', 'boton-reserva', () => {
        if (validarFormulario(datosPasajeroDiv)) {
            guardarDatosPasajero() 
        }
    })) 

    document.getElementById('botones').appendChild(crearBoton('botonAtras', 'Atrás', 'boton-reserva', menuReserva)) 

    // Inicialización de flatpickr para el input de fecha
    flatpickr("#cumpleanios", {
        dateFormat: "Y-m-d",
        maxDate: "today"
    }) 
}

//Pide realizar el pago
function datosPagos() {
    eliminarElementoSiExiste('modal-reserva') 

    const precio = 70000.00 
    const tarjetas = ["VISA", "MasterCard", "American Express", "Naranja X", "HSBC"] 
    const cuotas = [1, 3, 6, 9, 12, 16, 24] 

    tarjetas.sort((a, b) => {
        return a.localeCompare(b)
    })

    const datosPagosDiv = document.createElement('div') 
    datosPagosDiv.id = 'modal-reserva' 
    datosPagosDiv.innerHTML = `
        <h2>El total de su vuelo con la promoción especial de HOT SALE es de $70.000,00</h2>
        <p>Promoción válida sólo abonando con tarjetas de crédito 💳</p>
        <h2>Seleccioná tu tarjeta</h2>
        <div id="select-tarjeta"></div>
        <h2>Seleccioná el número de cuotas</h2>
        <div id="select-cuotas"></div>
        <h3 id="totalPorCuota">Valor de cada cuota: $70000.00</h3>
        <div id="botones"></div>
    ` 
    document.body.appendChild(datosPagosDiv) 

    document.getElementById('select-tarjeta').appendChild(crearSelect('tarjetas', tarjetas)) 
    document.getElementById('select-cuotas').appendChild(crearSelect('cuotas', cuotas.map(c => `${c} cuota${c > 1 ? 's' : ''}`))) 

    document.getElementById('botones').appendChild(crearBoton('botonSiguiente', 'Siguiente', 'boton-reserva', guardarDatosPago)) 
    document.getElementById('botones').appendChild(crearBoton('botonAtras', 'Atrás', 'boton-reserva', datosPasajero)) 

    document.getElementById('cuotas').addEventListener('change', () => {
        const cuotasSeleccionadas = parseInt(document.getElementById('cuotas').value, 10) 
        if (!isNaN(cuotasSeleccionadas) && cuotasSeleccionadas > 0) {
            const totalPorCuota = (precio / cuotasSeleccionadas).toFixed(2) 
            document.getElementById('totalPorCuota').textContent = `Total por cuota: $${totalPorCuota}` 
        }
    }) 
}

// Función para guardar los datos de la reserva
function guardarDatosReserva() {
    const destinoSeleccionado = document.getElementById('destinos').value 
    const fechaSeleccionada = document.getElementById('calendario').value 
    const horarioSeleccionado = document.getElementById('horarios').value 
    const numeroReserva = generarNumeroReserva();

    const [anio, mes, dia] = fechaSeleccionada.split('-') 

    // Crear instancia de Reserva
    reservaActual = new Reserva(destinoSeleccionado, horarioSeleccionado, anio, mes, dia, numeroReserva) 
    localStorage.setItem('reserva', JSON.stringify(reservaActual));

    datosPasajero() 
}

// Función para guardar los datos del pasajero
function guardarDatosPasajero() {
    const nombreIngresado = document.getElementById('nombre').value;
    const dniIngresado = document.getElementById('dni').value;
    const celularIngresado = document.getElementById('celular').value;
    const cumpleaniosIngresado = document.getElementById('cumpleanios').value;
    const emailIngresado = document.getElementById('email').value;

    // Crear instancia de Pasajero
    pasajeroActual = new Pasajero(nombreIngresado, dniIngresado, celularIngresado, cumpleaniosIngresado, emailIngresado);

    localStorage.setItem('pasajero', JSON.stringify(pasajeroActual));

    datosPagos();
}

// Función para guardar los datos de pago
function guardarDatosPago() {
    const tarjetaSeleccionada = document.getElementById('tarjetas').value;
    const cuotasSeleccionadas = document.getElementById('cuotas').value;
    const precio = 70000.00;

    // Crear instancia de Pago
    pagoActual = new Pago(tarjetaSeleccionada, cuotasSeleccionadas, precio);

    localStorage.setItem('pago', JSON.stringify(pagoActual));

    mostrarResumenPago();
}

// Función para mostrar el resumen del pago
function mostrarResumenPago() {
    eliminarElementoSiExiste('modal-reserva') 

    const resumenDiv = document.createElement('div') 
    resumenDiv.id = 'modal-reserva' 
    resumenDiv.innerHTML = `
    <div class="container">
        <div>
            <h1>Resumen de tu compra</h1>
            <h2>Datos del vuelo</h2>
            <p>Destino: ${reservaActual.destino}</p>
            <p>Fecha: ${reservaActual.anio}-${reservaActual.mes}-${reservaActual.dia}</p>
            <p>Horario: ${reservaActual.horario}</p>
        </div>
        <div>
            <h2>Datos del pasajero</h2>
            <p>Nombre: ${pasajeroActual.nombrePasajero}</p>
            <p>DNI: ${pasajeroActual.dni}</p>
            <p>Celular: ${pasajeroActual.celular}</p>
            <p>Fecha de nacimiento: ${pasajeroActual.fechaDeNacimiento}</p>
            <p>Email: ${pasajeroActual.email}</p>
        </div>
        <div>
            <h2>Datos del pago</h2>
            <p>Tarjeta: ${pagoActual.tarjeta}</p>
            <p>Cuotas: ${pagoActual.cuotas}</p>
            <p>Total por cuota: $${pagoActual.totalPorCuota}</p>
        </div>
    </div>
    ` 
    const botonAceptar = crearBoton('aceptar', 'Aceptar', 'boton-reserva', () => {
        mostrarReservaExitosa() 
    }) 
    
    resumenDiv.appendChild(botonAceptar) 
    document.body.appendChild(resumenDiv) 
}

//Funcion para mostrar que la reserva se realizó con éxito
function mostrarReservaExitosa() {
    eliminarElementoSiExiste('modal-reserva')

    const reserva = JSON.parse( localStorage.getItem('reserva'))

    const reservaExitosa = document.createElement('div')
    reservaExitosa.id = 'modal-reserva'
    reservaExitosa.innerHTML = `
        <h1>¡Reserva exitosa!</h1>
        <h2>¡Muchas gracias por elegir Aerolíneas PilotHouse!</h2>
        <h3>Te esperamos a bordo 👨‍✈️👩‍✈️✈️</h3>
        <p>Tu número de reserva es: <strong>${reserva.numeroReserva}</strong></p>
        <div id="botones">
    `
    document.body.appendChild(reservaExitosa)

    document.getElementById('botones').appendChild(crearBoton('botonAceptar', 'Aceptar', 'boton-reserva', () => {
        window.location.href = '../index.html' 
    })) 
}

// Función para generar un número de reserva aleatorio
function generarNumeroReserva() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let numeroReserva = ''
    for (let i = 0; i < 8; i++) {
        numeroReserva += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
    }
    return numeroReserva
}

// Función para validar los formularios
function validarFormulario(formulario) {
    let camposRequeridos = formulario.querySelectorAll('input[required]')
    let formularioValido = true

    camposRequeridos.forEach(campo => {
        if (!campo.value) {
            campo.style.borderColor = 'red'
            formularioValido = false
        } else {
            campo.style.borderColor = ''
        }
    }) 

    return formularioValido
}

// Verificar que se está en la página consulta.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('consulta.html')) {
        consultaReserva()
    }
})

//Consulta de reserva
function consultaReserva() {
    const consultaReservaDiv = document.getElementById('modal-reserva');
    consultaReservaDiv.innerHTML = `
        <h2>Ingrese su código de reserva</h2>
        <div>
            <input type="text" id="codigoReserva" placeholder="Ingrese su código de reserva">
            <div id="botones"></div>
            <div id="botones">
        </div>
        <div id="detalleReserva"></div>
    `;

    document.getElementById('botones').appendChild(
        crearBoton('botonConsultar', 'Consultar', 'boton-reserva', () => {
            const codigoReserva = document.getElementById('codigoReserva').value.trim();
            if (codigoReserva) {
                const reserva = JSON.parse(localStorage.getItem('reserva'));
                if (reserva && reserva.numeroReserva === codigoReserva) {
                    mostrarDetallesReserva(reserva);
                } else {
                    mostrarError('Código de reserva no encontrado. Por favor, verifica el código ingresado.');
                }
            } else {
                mostrarError('Por favor, ingresa un código de reserva.');
            }
        })
    );

    document.getElementById('botones').appendChild(crearBoton('botonCancelar', 'Cancelar', 'boton-reserva', () => {
        window.location.href = '../index.html' 
    })) 
}

function mostrarDetallesReserva(reserva) {
    const detalleReservaDiv = document.getElementById('detalleReserva');
    detalleReservaDiv.innerHTML = `
        <h3>Detalles de la Reserva</h3>
        <p><strong>Destino:</strong> ${reserva.destino}</p>
        <p><strong>Fecha:</strong> ${reserva.anio}-${reserva.mes}-${reserva.dia}</p>
        <p><strong>Horario:</strong> ${reserva.horario}</p>
    `;
}

function mostrarError(mensaje) {
    const detalleReservaDiv = document.getElementById('detalleReserva');
    detalleReservaDiv.innerHTML = `<p class="error">${mensaje}</p>`;
}

menuReserva()