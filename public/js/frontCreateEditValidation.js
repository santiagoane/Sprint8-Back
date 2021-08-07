let errors = {};

let form = document.querySelector('#form.formulario');

const frontProductName   = document.getElementById('nombre');
const frontDescription   = document.getElementById('descripcion');
const frontImage         = document.getElementById('imagen');
const frontPrice         = document.getElementById('precio');
const frontStock        = document.getElementById('cantidad');

// --- Validaciones --- //

//  Nombre

let validateName = function() {
    let feedback = '';
    let feedbackElement = frontProductName.nextElementSibling;


    if(frontProductName.value.trim() == '' ){
        feedback = 'El nombre no puede estar vacío';
    }else if (frontProductName.value.length < 5) {
        feedback = 'El nombre debe contener al menos 4 caracteres';
    };

    if(feedback){        
        frontProductName.classList.add('error-input'); // crear estilos
        feedbackElement.classList.toggle('error-input'); 
        errors.frontProductName = feedback;
    }
    else{
        frontProductName.classList.remove('error-input');
        feedbackElement.classList.toggle('error-input'); 
        delete errors.frontProductName;
    }

    feedbackElement.innerText = feedback;
};


// Descripción

let validateDescription = function() {
    let feedback = '';
    let feedbackElement = frontDescription.nextElementSibling;
    
    if(frontDescription.value.trim() == '' ){
        feedback = 'La descripcion del producto debe contener al menos 20 caracteres';
    }else if (frontDescription.value.length < 21) {
        feedback = 'La descripcion del producto debe contener al menos 20 caracteres';
    }

    if(feedback){        
        frontDescription.classList.add('error-input'); // crear estilos
        feedbackElement.classList.toggle('error-input'); 
        errors.frontProductName = feedback;
    }
    else{
        frontDescription.classList.remove('error-input');
        feedbackElement.classList.toggle('error-input'); 
        delete errors.frontProductName;
    }

    feedbackElement.innerText = feedback;
};


// Imagen

let validateImg = function() {
    let feedback = '';
    let feedbackElement = frontImage.nextElementSibling;
    let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

    if (frontImage.value==''){
        feedback = 'Debes subir una imagen';
    }else if(!allowedExtensions.exec(frontImage.value)){
        feedback = 'Solo podés subir imagenes .jpg ó jpeg ó png ó gif';
    };   

    if(feedback){        
        frontImage.classList.add('error-input'); 
        feedbackElement.classList.add('error-input'); 
        errors.frontImage = feedback;
    }
    else{
        frontImage.classList.remove('error-input');
        feedbackElement.classList.remove('error-input'); 
        delete errors.frontImage;
    }

    feedbackElement.innerText = feedback;
};


// Precio

let validatePrice = function() {
    let feedback = '';
    let feedbackElement = frontPrice.nextElementSibling;

    if(frontPrice.value.trim() == '' ){
        feedback = 'El precio no puede estar vacío';
    // }else if( typeof(frontPrice.value)  != 'number'){
    //     feedback = 'El precio debe ser numérico positivo'
    };

    if(feedback){        
        frontPrice.classList.add('error-input'); 
        feedbackElement.classList.toggle('error-input'); 
        errors.frontPrice = feedback;
    }
    else{
        frontPrice.classList.remove('error-input');
        feedbackElement.classList.toggle('error-input'); 
        delete errors.frontPrice;
    }

    feedbackElement.innerText = feedback;
};


// Cantidad

let validateStock = function() {
    let feedback = '';
    let feedbackElement = frontStock.nextElementSibling;

    if(frontStock.value.trim() == '' ){
        feedback = 'El stock no puede estar vacío';
    };

    if(feedback){        
        frontStock.classList.add('error-input'); 
        feedbackElement.classList.toggle('error-input'); 
        errors.frontStock = feedback;
    }
    else{
        frontStock.classList.remove('error-input');
        feedbackElement.classList.toggle('error-input'); 
        delete errors.frontStock;
    }

    feedbackElement.innerText = feedback;
};


// --- Eventos --- //

frontProductName.addEventListener('blur',function(){validateName()   });
frontStock.addEventListener('blur',function(){validateStock()  });
frontPrice.addEventListener      ('blur',function(){validatePrice()  });
frontDescription.addEventListener('blur',function(){validateDescription()  });
frontImage.addEventListener('blur',function(){validateImg()   });


form.addEventListener('submit', function(e){
    validateName();    
    validatePrice();
    validateDescription();
    validateImg();
    console.log(errors);
    if(Object.keys(errors).length){
        e.preventDefault();
    }
});