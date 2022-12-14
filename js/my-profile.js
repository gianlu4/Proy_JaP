let usuarioLogeado = sessionStorage.getItem('user');
let primerNombre = document.getElementById('primerNombre');
let segundoNombre = document.getElementById('segundoNombre');
let primerApellido = document.getElementById('primerApellido');
let segundoApellido = document.getElementById('segundoApellido');
let telefono = document.getElementById('telefono');
let email = document.getElementById('email');
let imagen = document.getElementById('imgProfile');
let guardarObligatorios = [];

//Muestra el mail en el valor del input



function showEmail(){

    guardarObligatorios = JSON.parse(localStorage.getItem('Perfil'))

        for(let i = 0; i < guardarObligatorios.length; i ++){
            
            let datos = guardarObligatorios[i];

            primerNombre.value = datos.primerNombre
            segundoNombre.value = datos.segundoNombre
            primerApellido.value = datos.primerApellido
            segundoApellido.value = datos.segundoApellido
            telefono.value = datos.telefono
            email.value = datos.email
            imagen.src = datos.imagen


            localStorage.setItem('Perfil',JSON.stringify(guardarObligatorios))
        }

        

}



function fields(){

    let res = false;

        document.getElementById('contenedorNombre').classList.add('was-validated');
        document.getElementById('contenedorApellido').classList.add('was-validated');
        document.getElementById('contenedorEmail').classList.add('was-validated');
        
        res = true;

        let objPerfil = {}

        objPerfil.primerNombre = primerNombre.value;
        objPerfil.segundoNombre = segundoNombre.value;
        objPerfil.primerApellido = primerApellido.value;
        objPerfil.segundoApellido = segundoApellido.value;
        objPerfil.telefono = telefono.value;
        objPerfil.email = sessionStorage.getItem('user');
        objPerfil.imagen = imagen.src;

        let array = [];
        
        array.push(objPerfil);

    localStorage.setItem('Perfil', JSON.stringify(array));
    

return res;

}



//desafiate

function readFile(input) {
    if (input.files && input.files[0]) {
        
        let reader = new FileReader();//El objeto FileReader permite que las aplicaciones web lean ficheros usando los objetos Fileo Blob

        reader.onload = function (e) {//El loadevento se activa cuando un archivo se ha le??do correctamente.
            let filePreview = document.getElementById('imgProfile');
            //console.log(e.target.result)
            //e.target.result contiene la data de base64 de la imagen subida
            filePreview.src = e.target.result;//La propiedad devuelve el contenido del archivo
        }

        reader.readAsDataURL(input.files[0]);//El m??todo readAsDataURLes usado para leer el contenido del especificado Blob o File
    }
}

let fileUpload = document.getElementById('imagenInput');
fileUpload.onchange = function (e) {
    readFile(e.srcElement);
}







document.addEventListener('DOMContentLoaded',()=>{
    email.value = usuarioLogeado //para que aparezca el mail apenas entre a la pagina
    
    guardarObligatorios = JSON.parse(localStorage.getItem('Perfil'));
        
        if(guardarObligatorios != null){

        showEmail();

        }else{
            guardarObligatorios = [];
            showEmail();
        }
    
})
document.getElementById('btnSave').addEventListener('click', evento=>{

    if( !fields() || !form.checkValidity() ){ //checkValidity() comprueba si el elemento tiene restricciones y si las cumple.
        evento.preventDefault();//Llamar a preventDefault en cualquier momento durante la ejecuci??n, cancela el evento, lo que significa que cualquier acci??n por defecto que deba producirse como resultado de este evento, no ocurrir??
        evento.stopPropagation();//El m??todo stopPropagation() de la interfaz Event evita la propagaci??n adicional del evento actual en las fases de captura y bubbling
        primerNombre.value = "";
        segundoNombre.value = "";
        primerApellido.value ="";
        segundoApellido.value = "";
        telefono.value = "";
    }else{   
        Swal.fire({
            icon: 'success',
            title: 'Datos guardados con ??xito',
            timer: 2000
        })
        
    }}
)
document.getElementById('btnDelete').addEventListener('click', ()=>{

    let borrar = 
    primerNombre.value = "";
    segundoNombre.value = "";
    primerApellido.value ="";
    segundoApellido.value = "";
    telefono.value = "";
    imagen.src = "";
    imagen.src = 'img/img_perfil.png';

    localStorage.setItem('Perfil', borrar)
})