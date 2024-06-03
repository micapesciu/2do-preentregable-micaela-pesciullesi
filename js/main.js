const reservas = []
const pasajeros = []

//Menu para comenzar con la reserva
const menu = () => {

    //Pide confirmación para iniciar la reserva
    const confirmacion = confirm("Bienvenido a Aerolineas PilotHouse! 👨‍✈️👩‍✈️✈️ \n¿Desea realizar una reserva?")

    if (confirmacion) {
        //Declaración de los horarios, destinos y fecha
        const destinos = ["Mendoza", "Cordoba", "Neuquen", "Tierra del Fuego", "Salta", "Jujuy", "Chubut", "Santa Cruz"]
        const horarios = ["08:00hs", "09:30hs", "11:00hs", "14:30hs", "17:00hs", "19:45hs", "22:15hs"]
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        const dias = Array.from({ length: 31 }, (_, i) => i + 1)

        let destinoReservado, horarioReservado, mesReservado, diaReservado
        let destinoValido = false, horarioValido = false, mesValido = false, diaValido = false

        //Selcción de destino
        while (!destinoValido) {
            destinoReservado = prompt("Seleccione su destino 🌍 \n 1. Mendoza \n 2. Cordoba \n 3. Neuquen \n 4. Tierra del Fuego \n 5. Salta \n 6. Jujuy \n 7. Chubut \n 8. Santa Cruz")
            
            if (destinoReservado === null) {
                alert("Gracias por comunicarse con Aerolíneas PilotHouse 👨‍✈️👩‍✈️✈️")
                menu()
            }

            destinoReservado = parseInt(destinoReservado)

            if (destinoReservado >= 1 && destinoReservado <= 8 && !isNaN(destinoReservado)) {
                destinoValido = true
            } else {
                alert("Opción no encontrada 🕵️ \nPor favor, seleccione una opción nuevamente.")
            }
        }

        //Selcción de mes
        while (!mesValido) {
            mesReservado = prompt("Seleccione un mes 📅 \n 1. Enero \n 2. Febrero \n 3. Marzo \n 4. Abril \n 5. Mayo \n 6. Junio \n 7. Julio \n 8. Agosto \n 9. Septiembre \n 10. Octubre \n 11. Noviembre \n 12. Diciembre")
            
            if (mesReservado === null) {
                alert("Gracias por comunicarse con Aerolíneas PilotHouse 👨‍✈️👩‍✈️✈️")
                menu()
            }

            mesReservado = parseInt(mesReservado)

            if (mesReservado >= 1 && mesReservado <= 12 && !isNaN(mesReservado)) {
                mesValido = true
            } else {
                alert("Opción no encontrada 🕵️ \nPor favor, seleccione una opción nuevamente.")
            }
        }

        //Selcción de día
        while (!diaValido) {
            diaReservado = prompt("Seleccione un día del mes del 1 al 31 📆")

            if (diaReservado === null) {
                alert("Gracias por comunicarse con Aerolíneas PilotHouse 👨‍✈️👩‍✈️✈️")
                menu()
            }

            diaReservado = parseInt(diaReservado)

            if (diaReservado >= 1 && diaReservado <= 31 && !isNaN(diaReservado)) {
                diaValido = true
            } else {
                alert("Opción no encontrada 🕵️ \nPor favor, seleccione una opción nuevamente.")
            }
        }

        //Selcción de horario
        while (!horarioValido) {
            horarioReservado = prompt("Seleccione un horario 🕙 \n 1. 08:00hs \n 2. 09:30hs \n 3. 11:00hs \n 4. 14:30hs \n 5. 17:00hs \n 6. 19:45hs \n 7. 22:15hs")
            
            if (horarioReservado === null) {
                alert("Gracias por comunicarse con Aerolíneas PilotHouse 👨‍✈️👩‍✈️✈️")
                menu()
            }

            horarioReservado = parseInt(horarioReservado)

            if (horarioReservado >= 1 && horarioReservado <= 8 && !isNaN(horarioReservado)) {
                horarioValido = true
            } else {
                alert("Opción no encontrada 🕵️ \nPor favor, seleccione una opción nuevamente.")
            }
        }

        const destino = destinos[destinoReservado - 1]
        const horario = horarios[horarioReservado - 1]
        const mes = meses[mesReservado - 1]
        const dia = diaReservado

        //Confirmación de datos ingresados
        const confirmacionReserva = confirm(`¿Confirma el destino y horario seleccionados? 👎👍 \nDestino: ${destino}\nHorario: ${horario}\nFecha: ${dia} de ${mes}`)
        if (confirmacionReserva) {
            reservas.push({ destino, horario, mes, dia })
            datosPasajero(destino, horario, mes, dia)
        } else {
            alert("Gracias por comunicarse con Aerolíneas PilotHouse 👨‍✈️👩‍✈️✈️")
            menu()
        }
    } else {
        alert("Gracias por comunicarse con Aerolineas PilotHouse 👨‍✈️👩‍✈️✈️ \nVuelva pronto para reservar su viaje!")
    }
}

//Funcion buscada para calcular la edad y validar que el pasajero ya nació
const calcularEdad = (fechaNacimiento) => {
    const fechaActual = new Date()
    const fechaNac = new Date(fechaNacimiento)
    let edad = fechaActual.getFullYear() - fechaNac.getFullYear()
    const mes = fechaActual.getMonth() - fechaNac.getMonth()
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
        edad--
    }
    return edad
}

//Función buscada para validar formato de fecha
function esFechaValida(fecha) {
    const regex = /^\d{4}-\d{2}-\d{2}$/
    return regex.test(fecha)
}

//Funcion para pedir los datos del pasajero
const datosPasajero = (destino, horario, mes, dia) => {

    let nombrePasajero, dni, celular, fechaDeNacimiento, email, edad
    //Validación de mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    while (true) {
        //PIDE NOMBRE Y APELLIDO
        do {
            nombrePasajero = prompt("Ingrese su nombre y apellido ✏️")
        
            if (nombrePasajero === null) {
                alert("Gracias por comunicarse con Aerolíneas PilotHouse 👨‍✈️👩‍✈️✈️")
                return
            } else if (!nombrePasajero) {
                alert("Por favor, complete el campo con su nombre y apellido")
            }
        } while (!nombrePasajero)

        //PIDE DNI
        do {
            dni = prompt("Ingrese su DNI ✏️")

            if (dni === null){
                alert("Gracias por comunicarse con Aerolíneas PilotHouse 👨‍✈️👩‍✈️✈️")
                return
            } else if (!dni) {
                alert("Por favor, complete el campo con su DNI")
            }
        } while (!dni)

        //PIDE CELULAR
        do {
            celular = prompt("Ingrese su número telefónico 📞")

            if (celular === null){
                alert("Gracias por comunicarse con Aerolíneas PilotHouse 👨‍✈️👩‍✈️✈️")
                return
            } else if (!celular) {
                alert("Por favor, complete el campo con su número telefónico")
            }
        } while (!celular)

        //PIDE FECHA DE NACIMIENTO
        do {
            fechaDeNacimiento = prompt("Ingrese su fecha de nacimiento 👶 \n(Formato AAAA-MM-DD)");
            
            if (fechaDeNacimiento === null) {
                alert("Gracias por comunicarse con Aerolíneas PilotHouse 👨‍✈️👩‍✈️✈️");
                return;
            } else if (!fechaDeNacimiento) {
                alert("Por favor, complete el campo con su fecha de nacimiento con formato AAAA-MM-DD");
            } else if (!esFechaValida(fechaDeNacimiento)) {
                alert("Formato de fecha inválido. Por favor, ingrese la fecha en el formato AAAA-MM-DD");
            } else {
                edad = calcularEdad(fechaDeNacimiento);
                if (edad < 0) {
                    alert("Fecha de nacimiento inválida. Por favor, ingrese una fecha válida en el formato AAAA-MM-DD.");
                }
            }
        } while (!fechaDeNacimiento || !esFechaValida(fechaDeNacimiento) || edad < 0);

        //PIDE EMAIL
        do {
            email = prompt("Ingrese su correo electrónico ✉️")
        
            if (email === null){
                alert("Gracias por comunicarse con Aerolíneas PilotHouse 👨‍✈️👩‍✈️✈️")
                return;
            } else if (!email) {
                alert("Por favor, complete el campo con su correo electrónico.")
            } else if (!emailRegex.test(email)) {
                alert("Por favor, ingrese un correo electrónico válido.")
            }
        } while (!email || !emailRegex.test(email))

        //PIDE CONFIRMACIÓN DE DATOS INGRESADOS
        const confirmacionDatos = confirm(`Datos del pasajero ✈️ \nNombre: ${nombrePasajero}\nDNI: ${dni}\nFecha de Nacimiento: ${fechaDeNacimiento}\nEdad: ${edad}\nCorreo Electrónico: ${email}\n¿Confirma que los datos ingresados son correctos? 👎👍`)
        
        if (confirmacionDatos) {
            const pasajero = {
                nombrePasajero,
                dni,
                celular,
                fechaDeNacimiento,
                edad,
                email
            }
            
            pasajeros.push(pasajero)

            //Muestra datos de la reserva
            alert("Datos de la reserva ✈️🌍 \nDestino: " + destino + "\nHorario: " + horario + "\nDía: " + dia + "\nMes: " + mes + "\nNombre del Pasajero: " + nombrePasajero + "\nDNI: " + dni + "\nCelular: " + celular + "\nFecha de Nacimiento: " + fechaDeNacimiento + "\nEdad: " + edad + "\nEmail: " + email )
            pagoReserva(destino, horario, mes, dia)
            break
        } else {
            alert("Por favor, vuelva a ingresar sus datos")
            continue
        }
    } 
}

//Inicia el pago de la reserva
const pagoReserva = (destino, horario, mes, dia) => {
    const precio = 70000.00

    //Pregunta si desea seguir con el pago
    let pago = confirm('El total de su vuelo con la promoción especial de HOT SALE es de $70.000,00. \n¿Desea continuar con el pago? \nPromoción válida sólo abonando con tarjetas de crédito 💳')

    //Eleccion de metodo de pago
    if (pago) {
        let eleccionPago
        do {
            eleccionPago = prompt('Seleccione su método de pago 💰 \n1. VISA \n2. MasterCard \n3. American Express \n4. Naranja X \n5. HSBC')

            if (eleccionPago === null) {
                alert("Su reserva fue cancelada por falta de confirmación de pago ☹️")
                return
            }

            eleccionPago = parseInt(eleccionPago)
            if (isNaN(eleccionPago) || eleccionPago < 1 || eleccionPago > 5) {
                alert("Opción no encontrada 🕵️ \nPor favor, seleccione una opción nuevamente.")
            }
        } while (isNaN(eleccionPago) || eleccionPago < 1 || eleccionPago > 5)

        //Pide cantidad de cuotas
        let cuotas = prompt("Seleccione la cantidad de cuotas 💳")

        if (cuotas === null) {
            alert("Su reserva fue cancelada por falta de confirmación de pago ☹️")
            return
        }

        if (cuotas.trim() === "") {
            alert("Debe ingresar la cantidad de cuotas para realizar el pago ☹️")
            return
        }

        //Calculo el monto de la cuota
        let montoCuota = (precio / cuotas).toFixed(2)
        let confirmacionPago = confirm("El pago se realizará en " + cuotas + " cuotas de $" + montoCuota + " pesos cada una. \n¿Realizar pago? 👎👍")

        //Pido confirmación del pago
        if (confirmacionPago) {
            alert("¡Muchas gracias por elegir Aerolineas PilotHouse! 👨‍✈️👩‍✈️✈️ \nTe esperamos a bordo el día " + dia + " de " + mes + " a las " + horario + " para viajar a la ciudad de " + destino + ". \nTe enviamos a tu email toda la información del vuelo. \nRecordá que el check-in se realiza de forma online hasta 2 horas antes de embarcar. \nTe esperamos! 🛫")
        } else {
            alert('Su reserva fue cancelada por falta de confirmación de pago ☹️')
        }
    } else {
        alert('Su reserva fue cancelada por falta de confirmación de pago ☹️')
    }
}

menu()