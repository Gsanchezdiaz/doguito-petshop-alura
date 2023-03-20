export function valida (input) {
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = 
        mostrarMensajeDeError(tipoDeInput, input);
    }
}
const tipoDeErrores = [
    "valueMissing",
    "typeMisMatch",
    "patternMismatch",
    "customError",
    "numero",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vació",
    },
    email: {
        valueMissing: "El campo email no puede estar vació",
        typeMisMatch: "Correo no es valido",
    },
    password: {
        valueMissing: "El campo  contraseña no puede estar vació",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un numero y no puede contener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "El campo  fecha de nacimiento no puede estar vació",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "El campo no puede estar vació",
        patternMismatch: "El formato requerido debe tener 9 dígitos"
    },
    direccion: {
        valueMissing: "El campo no puede estar vació",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "El campo no puede estar vació",
        patternMismatch: "La ciudad debe contener entre 4 a 15 caracteres"
    },
    estado: {
        valueMissing: "El campo no puede estar vació",
        patternMismatch: "El estado debe contener entre 4 a 15 caracteres"
    }
};

const validadores = {
    nacimiento: (input) => valueBirth(input)
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error])
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function valueBirth(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad"
    }
    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}


