// Clase Reserva
class Reserva {
    constructor(destino, horario, anio, mes, dia) {
        this.destino = destino;
        this.horario = horario;
        this.anio = anio;
        this.mes = mes;
        this.dia = dia;
    }
}

// Clase Pasajero
class Pasajero {
    constructor(nombrePasajero, dni, celular, fechaDeNacimiento, email) {
        this.nombrePasajero = nombrePasajero;
        this.dni = dni;
        this.celular = celular;
        this.fechaDeNacimiento = fechaDeNacimiento;
        this.email = email;
    }
}

// Clase Pago
class Pago {
    constructor(tarjeta, cuotas, precio) {
        this.tarjeta = tarjeta;
        this.cuotas = cuotas;
        this.totalPorCuota = (precio / cuotas).toFixed(2); // Ajustar el cálculo aquí
    }
}

// Inicio de Menu, pide DESTINO, FECHA Y HORARIO.
function menuReserva() {
    // Por si se vuelve a este menú, se borra lo cargado en los datos del pasajero
    const datosPasajero = document.getElementById('modal-reserva');
    if (datosPasajero) {
        datosPasajero.remove();
    }

    // Carga de destinos en el combo
    const destinos = ["Mendoza", "Cordoba", "Neuquen", "Tierra del Fuego", "Salta", "Jujuy", "Chubut", "Santa Cruz"];
    let menuReserva = document.createElement('div');
    menuReserva.id = 'modal-reserva';

    let selectDestinos = document.createElement('select');
    selectDestinos.id = 'destinos';

    destinos.forEach(destino => {
        const opcion = document.createElement('option');
        opcion.value = destino;
        opcion.textContent = destino;
        selectDestinos.appendChild(opcion);
    });

    // Carga de horarios en el combo
    const horarios = ["08:00hs", "09:30hs", "11:00hs", "14:30hs", "17:00hs", "19:45hs", "22:15hs"];
    let selectHorarios = document.createElement('select');
    selectHorarios.id = 'horarios';

    horarios.forEach(horario => {
        const opcion = document.createElement('option');
        opcion.value = horario;
        opcion.textContent = horario;
        selectHorarios.appendChild(opcion);
    });

    menuReserva.innerHTML = `
        <h1>Bienvenido a Aerolíneas PilotHouse! 👨‍✈️👩‍✈️✈️</h1>
        <h2>Seleccioná tu destino</h2>
        <div>
            ${selectDestinos.outerHTML}
        </div>

        <h2>Seleccioná la fecha</h2>
        <div>
            <input type="text" id="calendario" placeholder="Busca una fecha">
        </div>

        <h2>Seleccioná tu horario</h2>
        <div>
            ${selectHorarios.outerHTML}
        </div>

        <div>
            <button id="botonSiguiente" class="boton-reserva">Siguiente</button>
            <button id="botonCancelar" class="boton-reserva">Cancelar</button>
        </div>
    `;

    document.body.append(menuReserva);

    //Boton SIGUIENTE
    document.getElementById('botonSiguiente').addEventListener('click', () => {
        guardarDatosReserva();
    });

    //Boton CANCELAR
    document.getElementById('botonCancelar').addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    // Inicialización de flatpickr para el input de fecha
    flatpickr("#calendario", {
        dateFormat: "Y-m-d",
        minDate: "today"
    });
}

function datosPasajero(menu) {
    const menuReserva = document.getElementById('modal-reserva');
    if (menuReserva) {
        menuReserva.remove();
    }

    const datosPasajero = document.createElement('div');
    datosPasajero.id = 'modal-reserva';
    datosPasajero.innerHTML = `
        <h2>Ingresa tu nombre</h2>
        <div>
            <input type="text" id="nombre" placeholder="Ingresa tu nombre">
        </div>

        <h2>Ingresa tu DNI</h2>
        <div>
            <input type="text" id="dni" placeholder="Ingresa tu DNI">
        </div>

        <h2>Ingresa tu número de celular</h2>
        <div>
            <input type="text" id="celular" placeholder="Ingresa tu número de celular">
        </div>

        <h2>Ingresa tu fecha de nacimiento</h2>
        <div>
            <input type="text" id="cumpleanios" placeholder="Busca tu cumpleaños">
        </div>

        <h2>Ingresa tu correo electrónico</h2>
        <div>
            <input type="email" id="email" placeholder="Ingresa tu correo electrónico">
        </div>

        <div>
        <button id="botonSiguiente" class="boton-reserva">Siguiente</button>
        <button id="botonCancelar" class="boton-reserva">Cancelar</button>
        </div>
    `;
    document.body.appendChild(datosPasajero);
    
    //Boton SIGUIENTE
    document.getElementById('botonSiguiente').addEventListener('click', () => {
        guardarDatosPasajero();
    });
        
    //Boton CANCELAR
    document.getElementById('botonCancelar').addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    // Inicialización de flatpickr para el input de fecha
    flatpickr("#cumpleanios", {
        dateFormat: "Y-m-d",
    });
}

// Menu para el pago
function datosPagos() {
    const datosPasajero = document.getElementById('modal-reserva');
    if (datosPasajero) {
        datosPasajero.remove();
    }

    const precio = 70000.00;

    // Carga de tarjetas en el combo
    const tarjetas = ["VISA", "MasterCard", "American Express", "Naranja X", "HSBC"];
    let selectTarjetas = document.createElement('select');
    selectTarjetas.id = 'tarjetas';

    tarjetas.forEach(tarjeta => {
        const opcion = document.createElement('option');
        opcion.value = tarjeta;
        opcion.textContent = tarjeta;
        selectTarjetas.appendChild(opcion);
    });

    // Carga de cuotas en el combo
    const cuotas = [1, 3, 6, 9, 12, 16, 24];
    let selectCuotas = document.createElement('select');
    selectCuotas.id = 'cuotas';

    cuotas.forEach(cuota => {
        const opcion = document.createElement('option');
        opcion.value = cuota;
        opcion.textContent = `${cuota} cuota${cuota > 1 ? 's' : ''}`;
        selectCuotas.appendChild(opcion);
    });

    const datosPagos = document.createElement('div');
    datosPagos.id = 'modal-reserva';
    datosPagos.innerHTML = `
        <h2>El total de su vuelo con la promoción especial de HOT SALE es de $70.000,00</h2>
        <p>Promoción válida sólo abonando con tarjetas de crédito 💳</p>
        <h2>Seleccioná tu tarjeta</h2>
        <div>
            ${selectTarjetas.outerHTML}
        </div>
        <h2>Seleccioná el número de cuotas</h2>
        <div>
            ${selectCuotas.outerHTML}
        </div>
        <div>
        <button id="botonSiguiente" class="boton-reserva">Siguiente</button>
        <button id="botonCancelar" class="boton-reserva">Cancelar</button>
        </div>
    `;
    document.body.appendChild(datosPagos);

    //Boton SIGUIENTE
    document.getElementById('botonSiguiente').addEventListener('click', () => {
        guardarDatosPago();
    });
    
    //Boton CANCELAR
    document.getElementById('botonCancelar').addEventListener('click', () => {
        window.location.href = '../index.html';
    });
}

//SE GUARDAN LOS DATOS
// Función para guardar los datos de la reserva
function guardarDatosReserva() {
    const destinoSeleccionado = document.getElementById('destinos').value;
    const fechaSeleccionada = document.getElementById('calendario').value;
    const horarioSeleccionado = document.getElementById('horarios').value;
    const [anio, mes, dia] = fechaSeleccionada.split('-');
    
    // Crear instancia de Reserva
    reservaActual = new Reserva(destinoSeleccionado, horarioSeleccionado, anio, mes, dia);

    // Mostrar el resumen de pago con los datos de la reserva
    mostrarResumenPago(
        reservaActual.destino,
        `${reservaActual.anio}-${reservaActual.mes}-${reservaActual.dia}`,
        reservaActual.horario,
        null, // Pasajero aún no ingresado
        null,
        null,
        null,
        null,
        null, // Tarjeta aún no seleccionada
        null, // Cuotas aún no seleccionadas
        null  // Total por cuota aún no calculado
    );

    datosPasajero();
    console.log(reservaActual);
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

    // Mostrar el resumen de pago con los datos del pasajero
    mostrarResumenPago(
        reservaActual.destino,
        `${reservaActual.anio}-${reservaActual.mes}-${reservaActual.dia}`,
        reservaActual.horario,
        pasajeroActual.nombrePasajero,
        pasajeroActual.dni,
        pasajeroActual.celular,
        pasajeroActual.fechaDeNacimiento,
        pasajeroActual.email,
        null, // Tarjeta aún no seleccionada
        null, // Cuotas aún no seleccionadas
        null  // Total por cuota aún no calculado
    );

    datosPagos()
    console.log(pasajeroActual);
}

// Función para guardar los datos del pago
function guardarDatosPago(precio) {
    const tarjetaSeleccionada = document.getElementById('tarjetas').value;
    const cuotasSeleccionadas = document.getElementById('cuotas').value;

    // Crear instancia de Pago
    pagoActual = new Pago(tarjetaSeleccionada, cuotasSeleccionadas, precio);

    // Mostrar el resumen de pago con los datos del pago
    mostrarResumenPago(
        reservaActual.destino,
        `${reservaActual.anio}-${reservaActual.mes}-${reservaActual.dia}`,
        reservaActual.horario,
        pasajeroActual.nombrePasajero,
        pasajeroActual.dni,
        pasajeroActual.celular,
        pasajeroActual.fechaDeNacimiento,
        pasajeroActual.email,
        pagoActual.tarjeta,
        pagoActual.cuotas,
        pagoActual.totalPorCuota
    );

    mostrarResumenPago()
    console.log(pagoActual);
}

function mostrarResumenPago(destinoSeleccionado, fechaSeleccionada, horarioSeleccionado, nombreIngresado, dniIngresado, celularIngresado, cumpleaniosIngresado, emailIngresado, tarjetaSeleccionada, cuotasSeleccionadas, totalPorCuota) {
    const datosPagos = document.getElementById('modal-reserva');
    if (datosPagos) {
        datosPagos.remove();
    }

    // Crear el modal de resumen de pago
    const resumenPago = document.createElement('div');
    resumenPago.id = 'modal-reserva';
    resumenPago.innerHTML = `
        <h2>Resumen de compra</h2>

        <h3>Reserva</h3>
        <p>Destino: ${destinoSeleccionado}</p>
        <p>Fecha: ${fechaSeleccionada}</p>
        <p>Horario: ${horarioSeleccionado}</p>

        <h3>Pasajero</h3>
        <p>Nombre: ${nombreIngresado}</p>
        <p>DNI: ${dniIngresado}</p>
        <p>Celular: ${celularIngresado}</p>
        <p>Fecha de Nacimiento: ${cumpleaniosIngresado}</p>
        <p>Correo electrónico: ${emailIngresado}</p>

        <h3>Pago</h3>
        <p>Tarjeta seleccionada: ${tarjetaSeleccionada}</p>
        <p>Número de cuotas: ${cuotasSeleccionadas}</p>
        <p>Total por cuota: $${totalPorCuota}</p>

        <button id="aceptarResumenBtn" class="boton-reserva">Aceptar</button>
        <button id="cancelarResumenBtn" class="boton-reserva">Cancelar</button>
    `;
    document.body.appendChild(resumenPago);

    // Añadir evento al botón "Aceptar"
    document.getElementById('aceptarResumenBtn').addEventListener('click', () => {
        resumenPago.remove();
        mostrarReservaExitosa(); // Llama a la función mostrarReservaExitosa al aceptar el resumen
    });

    // Añadir evento al botón "Cancelar"
    document.getElementById('cancelarResumenBtn').addEventListener('click', () => {
        resumenPago.remove();
    });
}

function mostrarReservaExitosa() {
    const resumenPago = document.getElementById('modal-reserva');
    if (resumenPago) {
        resumenPago.remove();
    }

    // Crear el modal de reserva exitosa
    const reservaExitosa = document.createElement('div');
    reservaExitosa.id = 'modal-reserva';
    reservaExitosa.innerHTML = `
        <h1>¡Reserva exitosa!</h1>
        <h2>¡Muchas gracias por elegir Aerolíneas PilotHouse!</h2>
        <h3>Te esperamos a bordo 👨‍✈️👩‍✈️✈️</h3>

        <button id="aceptarReservaExitosaBtn" class="boton-reserva">Aceptar</button>
    `;
    document.body.appendChild(reservaExitosa);

    // Añadir evento al botón "Aceptar"
    document.getElementById('aceptarReservaExitosaBtn').addEventListener('click', () => {
        reservaExitosa.remove();
    });
}

function mostrarReservaExitosa() {
    const mostrarResumenPago = document.getElementById('modal-reserva');
    if (mostrarResumenPago) {
        mostrarResumenPago.remove();
    }

    // Crear el modal de resumen de pago
    const reservaExitosa = document.createElement('div');
    reservaExitosa.id = 'modal-reserva';
    reservaExitosa.innerHTML = `
        <h1>¡Reserva exitosa!</h1>
        <h2>¡Muchas gracias por elegir Aerolineas PilotHouse!</h2>
        <h3>Te esperamos a bordo 👨‍✈️👩‍✈️✈️</h3>

        <button id="aceptarResumenBtn" class="boton-reserva">Aceptar</button>
    `
    document.body.appendChild(reservaExitosa);

    // Añadir evento al botón "Aceptar"
    document.getElementById('aceptarResumenBtn').addEventListener('click', () => {
        resumenPago.remove();
    });
}

menuReserva();