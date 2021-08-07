let errors = {};

let form = document.querySelector('form-formulario');

const frontName = document.getElementById('nombre_completo');
const frontUsername = document.getElementById('nombre_usuario');
const frontEmail = document.getElementById('mail');
const frontPass = document.getElementById('contraseña');
const frontPassConfirm = document.getElementById('confirmar-contraseña');


// --- Validaciones --- //

//  Nombre
let validateFrontName = function () {
    let feedback = '';
    let feedbackElement = frontName.nextElementSibling;

    let name = frontName.value;
    let numbers = "0123456789";

    function haveNumbers(name) {
        for (i = 0; i < name.length; i++) {
            if (numbers.indexOf(name.charAt(i), 0) != -1) {
                return feedback = 'El nombre no puede contener números.';
            }
        }
    }

    if (name.trim() == '') {
        feedback = 'El nombre no puede estar vacío.';
    } else if (name.length < 2) {
        feedback = 'El nombre debe tener dos o mas caracteres.'
    } else {
        haveNumbers(name);
    }

    if (feedback) {
        frontName.classList.add('error-input');
        errors.frontName = feedback;
    }
    else {
        frontName.classList.remove('error-input');
        //feedbackElement.remove();
        delete errors.frontName;
    }

    feedbackElement.innerText = feedback;
}

// Username
let validateFrontUsername = function () {
    let feedback = '';
    let feedbackElement = frontUsername.nextElementSibling;

    let user = frontUsername.value;

    if (user.trim() == '') {
        feedback = 'El nombre de usuario no puede estar vacío';
    } else if (user.length < 8) {
        feedback = 'El nombre de usuario debe tener tres o mas de tres caracteres.'
    } else {
        haveNumbers(user)
    }

    if (feedback) {
        frontUsername.classList.add('error-input');
        errors.frontUsername = feedback;
    }
    else {
        frontUsername.classList.remove('error-input');
        delete errors.frontUsername;
    }

    feedbackElement.innerText = feedback;
}

// Email
let validateFrontEmail = () => {
    let feedback = "";
    let feedbackElement = frontEmail.nextElementSibling;

    if (frontEmail.value.trim() == "") {
        feedback = "El email no puede estar vacio"
    } else if (!/\S+@\S+\.\S+/.test(frontEmail.value)) {
        feedback = "El email debe ser valido"
    }

    if (feedback) {
        frontEmail.classList.add('error-input');
        errors.frontEmail = feedback;
    } else {
        frontEmail.classList.remove('error-input');
        delete errors.frontEmail;
    }

    feedbackElement.innerText = feedback;
}

// Contraseña
let validateFrontPass = function () {
    let feedback = '';
    let feedbackElement = frontPass.nextElementSibling;

    let pass = frontPass.value;

    if (pass.trim() == '') {
        feedback = 'La contraseña no puede estar vacía';
    } else if (pass.length < 8) {
        feedback = 'La contraseña debe tener al menos 8 caracteres.'
    }

    if (feedback) {
        frontPass.classList.add('error-input');
        errors.frontPass = feedback;
    }
    else {
        frontPass.classList.remove('error-input');
        delete errors.frontPass;
    }

    feedbackElement.innerText = feedback;
}

// Confirmar contraseña
let validateFrontPassConfirm = function () {
    let feedback = '';
    let feedbackElement = frontPassConfirm.nextElementSibling;

    let pass = password.value;
    let conf = frontPassConfirm.value;

    if (pass != conf) {
        feedback = 'Las contraseñas ingresadas no coinciden.';
    }

    if (feedback) {
        frontPassConfirm.classList.add('error-input');
        errors.frontPassConfirm = feedback;
    }
    else {
        frontPassConfirm.classList.remove('error-input');
        delete errors.frontPassConfirm;
    }

    feedbackElement.innerText = feedback;
}



// --- Eventos --- //
frontName.addEventListener('blur', validateFrontName);
frontUsername.addEventListener('blur', validateFrontUsername);
frontEmail.addEventListener('blur', validateFrontEmail);
frontPass.addEventListener('blur', validateFrontPass);
frontPassConfirm.addEventListener('blur', validateFrontPassConfirm);


form.addEventListener('submit', function (e) {
    validateFrontName();
    validateFrontUsername();
    validateFrontEmail();
    validateFrontPass();
    validateFrontPassConfirm();
    if (Object.keys(errors).length) {
        e.preventDefault();
    }
});