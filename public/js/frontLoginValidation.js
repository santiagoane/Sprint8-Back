let errors = {};

let form = document.querySelector('#form.formulario');

const frontEmail = document.getElementById('mail');
const frontPass = document.getElementById('contraseña');


// --- Validaciones --- //

// Email
let validateFrontEmail = function () {
    let feedback = '';
    let feedbackElement = frontEmail.nextElementSibling;

    let emailRegex = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/

    if (frontEmail.value.trim() == '') {
        feedback = 'El email no puede estar vacío';
    } else if (!emailRegex.test(frontEmail.value)) {
        feedback = 'Email incorrecto. Por favor ingrese un correo electrónico válido.'
    }

    if (feedback) {
        frontEmail.classList.add('error-input');
        errors.frontEmail = feedback;
    }
    else {
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


// --- Eventos --- //
frontEmail.addEventListener('blur', validateFrontEmail);
frontPass.addEventListener('blur', validateFrontPass);


form.addEventListener('submit', function (e) {
    validateFrontEmail();
    validateFrontPass();
    if (Object.keys(errors).length) {
        e.preventDefault();
    }
});