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

// Función de orden superior para eliminar un elemento
function eliminarElementoSiExiste(id) {
  const elemento = document.getElementById(id)
  if (elemento) elemento.remove() 
}

// Inicio de Menu - Pide datos de la reserva del vuelo
async function menuReserva() {
  eliminarElementoSiExiste("modal-reserva")

  const menuReservaDiv = document.createElement("div")
  menuReservaDiv.id = "modal-reserva"
  menuReservaDiv.innerHTML = `
    <h1>Bienvenido a Aerolíneas PilotHouse! 👨‍✈️👩‍✈️✈️</h1>

    <h2>Seleccioná los datos del vuelo 🛫</h2>
    <select id="selectDestino" name="selectDestino" class="form-select w-50" required>
        <option value="">Selecciona tu destino (*)</option>
    </select>

    <input id="calendario" type="text" placeholder="Selecciona una fecha (*)" class="form-control w-50" required> 

    <select id="selectHorario" name="selectHorario" class="form-select w-50" required>
        <option value="">Selecciona tu horario (*)</option>
    </select>

    <div id="botones">
        <button id="botonSiguiente" class="btn btn-primary my-2">Siguiente</button>
        <button id="botonCancelar" class="btn btn-outline-danger my-3">Cancelar</button>
    </div>
  `

  document.body.appendChild(menuReservaDiv)

  if (window.location.pathname.includes("reserva.html")) {
  try {
    const response = await fetch('../db/data.JSON')
    const data = await response.json()

    // Agrega las opciones de destino al select
    const selectDestino = menuReservaDiv.querySelector("#selectDestino")
    data.destinos.sort((a, b) => a.localeCompare(b))
    data.destinos.forEach(destino => {
      const option = document.createElement("option")
      option.value = destino
      option.textContent = destino
      selectDestino.appendChild(option)
    });

    // Agregar opciones de horarios al select
    const selectHorario = menuReservaDiv.querySelector("#selectHorario")
    data.horarios.forEach(horario => {
      const option = document.createElement("option")
      option.value = horario
      option.textContent = horario
      selectHorario.appendChild(option)
    });

  } catch (error) {
    Swal.fire({
      title: "No se pudieron recuperar los destinos y horarios.",
      text: "Por favor, inténtalo de nuevo más tarde.",
      icon: "error"
    });
  }
}

  // Agrega el evento al boton siguiente
  const botonSiguiente = menuReservaDiv.querySelector("#botonSiguiente");
  botonSiguiente.addEventListener("click", function () {
    if (validarFormulario(menuReservaDiv)) {
      guardarDatosReserva();
    }
  });

  // Agrega el evento al boton cancelar y vuelve al index
  const botonCancelar = menuReservaDiv.querySelector("#botonCancelar");
  botonCancelar.addEventListener("click", function () {
    window.location.href = "../index.html";
  });

  // Inicialización de flatpickr para el input de fecha
  flatpickr("#calendario", {
    dateFormat: "Y-m-d",
    minDate: "today",
  });
}

function datosPasajero() {
  eliminarElementoSiExiste("modal-reserva") 

  const datosPasajeroDiv = document.createElement("div") 
  datosPasajeroDiv.id = "modal-reserva" 
  datosPasajeroDiv.innerHTML = `
        <h2>Ingresa los datos del pasajero 👩👨‍🦱</h2>
            <input type="text" id="nombre" name="nombre" placeholder="Nombre y Apellido (*)" class="form-control w-50" required>
        
            <input type="number" id="dni" name="dni" placeholder="DNI (*)" class="form-control w-50" required>

            <input type="number" id="celular" name="celular" placeholder="Número de teléfono (*)" class="form-control w-50" required>

            <input type="" id="cumpleanios" name="fechaNacimiento" placeholder="Fecha de Nacimiento (*)" class="form-control w-50" required>

            <input type="email" id="email" name="email" placeholder="Correo Electrónico (*)" class="form-control w-50" required>

        <div id="botones">
            <button id="botonSiguiente" class="btn btn-primary my-2">Siguiente</button>
            <button id="botonAtras" class="btn btn-outline-warning my-3">Atrás</button>
        </div>
    ` 
  document.body.appendChild(datosPasajeroDiv) 

  // Agrega el evento al boton siguiente
  const botonSiguiente = datosPasajeroDiv.querySelector("#botonSiguiente") 
  botonSiguiente.addEventListener("click", function () {
    if (validarFormulario(datosPasajeroDiv)) {
      guardarDatosPasajero() 
    }
  }) 

  // Agrega el evento al boton atras
  const botonAtras = datosPasajeroDiv.querySelector("#botonAtras") 
  botonAtras.addEventListener("click", menuReserva) 

  // Inicialización de flatpickr para el input de fecha
  flatpickr("#cumpleanios", {
    dateFormat: "Y-m-d",
    maxDate: "today",
  }) 
}

async function datosPagos() {
  eliminarElementoSiExiste("modal-reserva")

  const datosPagosDiv = document.createElement("div")
  datosPagosDiv.id = "modal-reserva"
  datosPagosDiv.innerHTML = `
    <h2>El precio del vuelo con la promoción especial es de $70.000,00 💸</h2>
    <p>Promoción válida sólo abonando con tarjetas de crédito</p>
    
    <h2>Seleccioná los datos de pago 💳</h2>
    <select id="selectTarjeta" name="selectTarjeta" class="form-select w-50" required>
        <option value="">Selecciona tu tarjeta (*)</option>
    </select>

    <input type="number" id="numeroTarjeta" name="numeroTarjeta" placeholder="Número de tarjeta (*)" class="form-control w-50" required>    
    <div id="tarjetaError" style="color: red;"></div>        

    <input type="number" id="codigoSeguridad" name="codigoSeguridad" placeholder="Código de seguridad (*)" class="form-control w-50" required>      

    <select id="selectCuotas" name="selectCuotas" class="form-select w-50" required>
        <option value="">Selecciona la cantidad de cuotas (*)</option>
    </select>
    
    <h2 id="totalPorCuota">Valor de cada cuota:</h2>
    
    <div id="botones">
        <button id="botonSiguiente" class="btn btn-primary my-2">Siguiente</button>
        <button id="botonAtras" class="btn btn-outline-warning my-3">Atrás</button>
    </div>
  `

  document.body.appendChild(datosPagosDiv)

  try {
    const response = await fetch('../db/data.JSON')
    const data = await response.json()

      // Agrega las opciones de tarjeta al select
      const selectTarjeta = datosPagosDiv.querySelector("#selectTarjeta")
      data.tarjetas.sort((a, b) => a.localeCompare(b))
      data.tarjetas.forEach(tarjeta => {
        const option = document.createElement("option")
        option.value = tarjeta
        option.textContent = tarjeta
        selectTarjeta.appendChild(option)
      })

      // Agregar opciones de cuotas al select
      const selectCuotas = datosPagosDiv.querySelector("#selectCuotas")
      data.cuotas.forEach(cuota => {
        const option = document.createElement("option")
        option.value = cuota
        option.textContent = cuota
        selectCuotas.appendChild(option)
      })

      // Actualiza el valor de cada cuota cuando cambie el select de cuotas
      selectCuotas.addEventListener("change", (event) => {
        const tarjeta = selectTarjeta.value
        const cuotas = event.target.value
        const pago = new Pago(tarjeta, cuotas, data.precio)
        document.getElementById("totalPorCuota").innerText = `Valor de cada cuota: $${pago.totalPorCuota}`
      });

    } catch (error) {
      Swal.fire({
        title: "No se pudieron recuperar las tarjetas.",
        text: "Por favor, inténtalo de nuevo más tarde.",
        icon: "error"
      });
    }

      // Agrega el evento al boton siguiente
      const botonSiguiente = datosPagosDiv.querySelector("#botonSiguiente")
      botonSiguiente.addEventListener("click", function () {
        if (validarFormulario(datosPagosDiv)) {
          guardarDatosPago()
        }
      })

      // Agrega el evento al boton atras
      const botonAtras = datosPagosDiv.querySelector("#botonAtras")
      botonAtras.addEventListener("click", datosPasajero)

      // Muestra mensaje de ayuda después de 5 segundos
      setTimeout(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 10000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "info",
          title: "Si necesitas ayuda con tu pago llamá al 0800-8451-5621 para comunicarte con un asesor 📞."
        });
      }, 3000)
}

// Función para guardar datos de la reserva
function guardarDatosReserva() {
  const destino = document.getElementById("selectDestino").value
  const horario = document.getElementById("selectHorario").value
  const numeroReserva = generarNumeroReserva()
  const [anio, mes, dia] = document.getElementById("calendario").value.split("-")

  const reservaActual = new Reserva(destino, horario, anio, mes, dia, numeroReserva)
  localStorage.setItem("reservaActual", JSON.stringify(reservaActual))
  datosPasajero()
}

// Función para guardar datos del pasajero
function guardarDatosPasajero() {
  const nombrePasajero = document.getElementById("nombre").value
  const dni = document.getElementById("dni").value
  const celular = document.getElementById("celular").value
  const fechaDeNacimiento = document.getElementById("cumpleanios").value
  const email = document.getElementById("email").value

  const pasajeroActual = new Pasajero(nombrePasajero, dni, celular, fechaDeNacimiento, email)
  localStorage.setItem("pasajeroActual", JSON.stringify(pasajeroActual))
  datosPagos()
}

// Función para guardar datos del pago
function guardarDatosPago() {
  try {
    const tarjeta = document.getElementById("selectTarjeta").value 
    const cuotas = document.getElementById("selectCuotas").value 
    const reservaActual = JSON.parse(localStorage.getItem("reservaActual")) 
    const pasajeroActual = JSON.parse(localStorage.getItem("pasajeroActual")) 
    const pago = new Pago(tarjeta, cuotas, 70000.0) 

    if (!tarjeta || !cuotas || !reservaActual || !pasajeroActual) {
      throw new Error("Faltan datos para realizar el pago")
    }

    let timerInterval;
    Swal.fire({
      title: "Reserva en proceso",
      html: "Se está procesando tu vuelo",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
    }
  });

    mostrarResumenPago(reservaActual, pasajeroActual, pago) 

  } catch (error) {
    Swal.fire({
      title: "No se pudo realizar el pago",
      text: "Por favor, inténtalo de nuevo más tarde",
      icon: "error"
    });
  document.body.appendChild(errorPago)
  }
}

// Función para mostrar el resumen del pago
function mostrarResumenPago(reserva, pasajero, pago) {
  eliminarElementoSiExiste("modal-reserva")

  const resumenDiv = document.createElement("div") 
  resumenDiv.id = "modal-reserva" 
  resumenDiv.innerHTML = `
    <div class="container">

    <div>
        <h2>Resumen del vuelo ✈️</h2>
        <p>Reserva N°: ${reserva.numeroReserva}</p>
        <p>Destino: ${reserva.destino}</p>
        <p>Horario: ${reserva.horario}</p>
        <p>Fecha: ${reserva.dia}/${reserva.mes}/${reserva.anio}</p>
    </div>

    <div>
        <h2>Datos del Pasajero 👩👨‍🦱</h2>
        <p>Nombre: ${pasajero.nombrePasajero}</p>
        <p>DNI: ${pasajero.dni}</p>
        <p>Celular: ${pasajero.celular}</p>
        <p>Fecha de Nacimiento: ${pasajero.fechaDeNacimiento}</p>
        <p>Email: ${pasajero.email}</p>
    </div>

    <div>
        <h2>Pago 💳</h2>
        <p>Tarjeta: ${pago.tarjeta}</p>
        <p>Cuotas: ${pago.cuotas}</p>
        <p>Valor de cada cuota: $${pago.totalPorCuota}</p>
    </div>
    </div>

    <div id="botones">
        <button id="botonConfirmar" class="btn btn-success my-2">Confirmar</button>
        <button id="botonCancelar" class="btn btn-outline-danger my-3">Cancelar</button>
    </div>
    ` 

  document.body.appendChild(resumenDiv) 

  const botonConfirmar = resumenDiv.querySelector("#botonConfirmar")
  botonConfirmar.addEventListener("click", function() {
    Swal.fire({
      title: "Vuelo confirmado",
      text: "Pago confirmado con éxito",
      icon: "success"
    }).then((result) => {
      if (result.isConfirmed) {
        mostrarReservaExitosa();
      }
    });
  });

  // Agrega el evento al boton cancelar
  const botonCancelar = resumenDiv.querySelector("#botonCancelar") 
  botonCancelar.addEventListener("click", function () {
    Swal.fire({
      title: "Pago cancelado",
      text: "Cancelaste el pago de tu vuelo. Vas a volver al inicio",
      icon: "error"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../index.html" 
      }
    });
  }) 
}

//Muestra la reserva exitosa
function mostrarReservaExitosa() {
    eliminarElementoSiExiste("modal-reserva");
  
    const reserva = JSON.parse(localStorage.getItem("reservaActual"))
    const pasajero = JSON.parse(localStorage.getItem("pasajeroActual"))
  
    const reservaExitosa = document.createElement("div")
    reservaExitosa.id = "modal-reserva";
    reservaExitosa.innerHTML = `
          <h1>¡Reserva exitosa!</h1>
          <h2>¡Muchas gracias por elegir Aerolíneas PilotHouse! Te esperamos a bordo 👨‍✈️👩‍✈️✈️</h2>
          <h3>Tu número de reserva es: <strong>${reserva.numeroReserva}</strong></h3>
          <p>Recodá que podes elegir asiento al momento de realizar tu check-in</p>
          <button id="botonAceptar" class="btn btn-success my-2">Aceptar</button>
      `;
    document.body.appendChild(reservaExitosa)
  
    // Agrega el evento al botón aceptar
    const botonAceptar = reservaExitosa.querySelector("#botonAceptar");
    botonAceptar.addEventListener("click", function () {
      window.location.href = "../index.html"
    })
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

//Validaciones
function validarFormulario(formulario) {
    const inputs = formulario.querySelectorAll("input, select")
    let formularioValido = true
  
    for (const input of inputs) {
      input.style.border = ""
  
      if (input.hasAttribute("required") && !input.value) {
        input.style.border = "2px solid red"
        formularioValido = false
        continue
      }
  
      switch (input.id) {
        case "dni":
          if (input.value.length > 8) {
            input.value = input.value.slice(0, 8)
            input.style.border = "2px solid red"
            formularioValido = false
          }
          break
        case "celular":
          if (input.value.length > 15) {
            input.value = input.value.slice(0, 15)
            input.style.border = "2px solid red"
            formularioValido = false
          }
          break
        case "email":
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
            if (!emailPattern.test(input.value)) {
            input.style.border = "2px solid red"
            formularioValido = false
            }
            break
        case "numeroTarjeta":
            if (input.value.length !== 16) { 
                input.style.border = "2px solid red"
                formularioValido = false
            }
            break
        case "codigoSeguridad":
            if (input.value.length !== 3) { 
                input.style.border = "2px solid red"
                formularioValido = false
            }
            break
      }
    }
    return formularioValido
}
  
document.addEventListener("input", function(event) {
  if (event.target.id === "dni" || event.target.id === "celular" || event.target.id === "numeroTarjeta" || event.target.id === "codigoSeguridad") {
    let maxLength
    switch(event.target.id) {
      case "dni":
        maxLength = 8
        break
      case "celular":
        maxLength = 15
        break
      case "numeroTarjeta":
        maxLength = 16
        break
      case "codigoSeguridad":
        maxLength = 3
        break
    }
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength)
    }
  }
})

// Verificar que se está en la página consulta.html
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("consulta.html")) {
    consultaReserva()
  }
})

//Funcion para consultar reserva
function consultaReserva() {
  const consultaReservaDiv = document.getElementById("modal-reserva")
  consultaReservaDiv.innerHTML = `
    <div id="detalleReserva" style="text-align: center;">
      <h2>Ingrese su código de reserva 🕵️✈️</h2>
      <p>Para ver los detalles de su vuelo ingrese un código de reserva</p>
      <input type="text" id="codigoReserva" placeholder="Ingrese su código de reserva" class="form-control" style="display: block; margin: 0 auto; width: 50%;" required>
      <div id="botones">
        <button id="botonConsultar" class="btn btn-primary my-2">Consultar</button>
        <button id="botonCancelar" class="btn btn-outline-danger my-3">Cancelar</button>
      </div>
    </div>
    `

  // Agrega el evento al botón consultar
  const botonConsultar = consultaReservaDiv.querySelector("#botonConsultar")
  botonConsultar.addEventListener("click", function () {
    if (validarFormulario(consultaReservaDiv)) {
      const codigoReserva = document.getElementById("codigoReserva").value
      const mensajeErrorDiv = document.getElementById("mensajeError")

      const reservaActual = JSON.parse(localStorage.getItem("reservaActual"))
      const pasajeroActual = JSON.parse(localStorage.getItem("pasajeroActual"))

      //Valida si encuentra un código de reserva
      if (reservaActual && reservaActual.numeroReserva === codigoReserva) {
        mostrarDetallesReserva(reservaActual, pasajeroActual)
      } else {
        Swal.fire({
          title: "Reserva no encontrada",
          text: "Ingresá nuevamente el código",
          icon: "error"
        });
      }
    }
  })

  // Agrega el evento al botón cancelar y vuelve al index
  const botonCancelar = consultaReservaDiv.querySelector("#botonCancelar")
  botonCancelar.addEventListener("click", function () {
    window.location.href = "../index.html"
  })
}

//Muestra la reserva consultada
function mostrarDetallesReserva(reserva, pasajeroActual) {
  const detalleReservaDiv = document.getElementById("detalleReserva")
  detalleReservaDiv.innerHTML = `
        <h2>Detalles de la Reserva</h2>
            <p><strong>Destino:</strong> ${reserva.destino}</p>
            <p><strong>Fecha:</strong> ${reserva.anio}-${reserva.mes}-${reserva.dia}</p>
            <p><strong>Horario:</strong> ${reserva.horario}</p>
            <p><strong>Pasajero:</strong> ${pasajeroActual.nombrePasajero}</p>

        <div id="botones">
            <button id="botonAceptar" class="btn btn-primary my-2">Aceptar</button>
        </div>
        `

  // Agrega el evento al botón aceptar
  const botonAceptar = detalleReservaDiv.querySelector("#botonAceptar")
  botonAceptar.addEventListener("click", function () {
    window.location.href = "../index.html"
  })
}

menuReserva() 