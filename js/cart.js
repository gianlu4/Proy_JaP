let carroProd = [];
let unidadXcosto = 0;
let MONEY_SYMBOL = "USD";
let carrito = [];
let borrarName = document.getElementsByName('borrar');
let tipoEnvio = document.getElementsByName('publicationType');


//le paso como parametro el id del producto que quiero eliminar//el id lo declaro en product - info dentro del objt

function limpiar (i) {
  //obtengo los datos de mi localstorage (CONVIERTO DE JSON A OBJETO)
    let objetoArray = JSON.parse(localStorage.getItem('carrito'));

  //busco el valor id en mi objeto que coincida con el i que quiero eliminar """"""findindex busca dentro del array 
    let objetoArrayIndexIn = objetoArray.findIndex(elemento => elemento.id === i );
  //elimino el elemento de esa posicion del array (1)
  
  objetoArray.splice(objetoArrayIndexIn, 1);
  // convierto a objeto JSON 
    let objetoArrayJSON = JSON.stringify(objetoArray);
  //guardo mi array en formato JSON en el localstorage
    localStorage.setItem('carrito',objetoArrayJSON);
    
  
  }


function showCART (array) {

    let HTMLcarrito ="";
    
for(let i = 0; i < array.length; i ++){

        let datosCarrito = array[i];
        
        
        HTMLcarrito += `
<div class="padre">
<div class="card mb-4">
  <div class="card-body p-3"> 
  
  
    <div class="row">
      <div class="col-md-4 vh=100">
        <img  width = "100%" src="${datosCarrito.image}"
          class="" alt="Generic placeholder image">
      </div>
    
    <div class="col-md-4">
      <div>
        <p class="small text-muted text-center">Nombre</p>
        <p class="lead fw-normal mb-0 text-center" id="valorNombre">${datosCarrito.name}</p>
      </div>
    </div>

    <div class="col-md-4">
      <div class = "">
        <p  id= "pp"class="small text-muted text-center">Cantidad</p>
        <input id="${datosCarrito.id}" onchange='actualizarValores()' min="1"  value="1" type="number"
        class="form-control" />
      </div>
    </div>
    <div class="col-md-4">
      <div>
        <p class="small text-muted text-center">Costo</p>
        <p class="lead fw-normal mb-0 " id = "valorPRODUCTO">${datosCarrito.currency}<span class='precio'> ${datosCarrito.unitCost}</span></p>
      </div>
    </div>
    <div class="col-md-4">
      <div>
        <p class="small text-muted text-center">Sub-total</p>
        <p class="lead fw-normal mb-0 subtotales" id="precioSUBTOTAL">${datosCarrito.currency} ${datosCarrito.unitCost}</p>
      </div>
    </div>
  </div>
  </div>
  </div>
  <button name="borrar" class="btn btn-light fa-solid fa-trash-can botonLimpiar"></button> 

  </div>
  
`


}

document.getElementById('divCarr').innerHTML += HTMLcarrito;



for (let i=0; i< borrarName.length; i++){

  //borrar name es un document.getElementsByName('borrar'), dado que no puedo utilizar un id solo para esta ocasion
  borrarName[i].addEventListener('click',(event)=>{
    
    //ejecuto un evento, donde del target accedo al padre para llegar al div class="padre"que contiene todo el contenido
    event.target.parentNode.remove();//para poder borrar el contenido del html
    
    limpiar(array[i].id);//esto para limpiar el contenido en el localstorage
  })
}

}




function actualizarValores() {

  let cantidad = document.getElementsByTagName ('input');
  let precios = document.getElementsByClassName('precio');
  let subtotales = document.getElementsByClassName('subtotales');
  let subtotal=0;

  for (let i=0; i< precios.length; i++){

// utilizo parseFloat para parsear un string y devolver un número si es posible
   //innerHTML es devuelto por un html collection y el innerHTML me da el valor del producto,
    //tambien se podria utilizar innerTEXT ya que ambos tienen el mismo string
    subtotal+= parseFloat(precios[i].innerHTML) * parseFloat(cantidad[i].value);//.value es dado por el HTMLcollection y ahi obtenemos el value
    
    //del resultado de la multiplicacion del precio y la cantidad igualo y me da el valor del subtotal
    subtotales[i].innerHTML= MONEY_SYMBOL +" "+ parseFloat(precios[i].innerHTML) * parseFloat(cantidad[i].value);

  }

  costoEnvio = 0;

  //console.log(tipoEnvio);
  for (let i=0; i< tipoEnvio.length; i++){

      if (tipoEnvio[i].checked){
        //consulto en el htmlcollection si el valor esta checked
          costoEnvio = subtotal * parseFloat(tipoEnvio[i].value);// multiplicamos por su value fijo que definimos en cart.html
          
      }

  }

  document.getElementById('sub').innerHTML=(MONEY_SYMBOL)+" "+ subtotal ;
  document.getElementById('envio').innerHTML=(MONEY_SYMBOL)+" "+costoEnvio.toFixed(0);
  document.getElementById('total').innerHTML=(MONEY_SYMBOL)+" "+(parseFloat((subtotal).toFixed(0)) + parseFloat((costoEnvio).toFixed(0)));

}


//funcion que bloquea metodos de pago dependiendo que input radio elija

let cards = document.getElementById('card-payments');//input radio
let banks = document.getElementById('bank-payments');//input radio

function blocking(){

  let cardInput = document.getElementById('numeroTarjeta');//inputs form control
  let codSegInput = document.getElementById('codigoSeguridad');//inputs form control
  let vtoCardsMes = document.getElementById('vtoCardMes');//select
  let vtoCardsAnio = document.getElementById('vtoCardAnio');//select
  let transferencia = document.getElementById('cuentaTransferencia');//inputs form control

cards.addEventListener('click', (e)=>{//input radio tarjeta debito o credito
  
  transferencia.disabled = true;
  vtoCardsAnio.disabled = false;
  vtoCardsMes.disabled = false;
  cardInput.disabled = false;
  codSegInput.disabled = false;
  vtoCards.disabled = false;
})
  banks.addEventListener('click',(e)=>{//input radio transferencia bancaria

    transferencia.disabled = false;
    vtoCardsAnio.disabled = true;
    vtoCardsMes.disabled = true;
    cardInput.disabled = true;
    codSegInput.disabled = true;
    vtoCards.disabled = true;
  })

}


//esta funcion cambia el nombre de metodo de pago
function selectPayment(){

if(cards.checked == true){

  document.getElementById('seleccionDeMetodoDePago').innerHTML = "Tarjeta de crédito o débito";

}else if(banks.checked == true){

  document.getElementById('seleccionDeMetodoDePago').innerHTML = "Transferencia bancaria";

}
}
/*
function showAlertError() {
  document.getElementById("alert-danger").classList.add("show");
}
*/
function verificacionDatosCompra (){

let numeroDireccion = document.getElementById('numeroCART');
let esquinaDireccion = document.getElementById('esquina');
let calleDireccion = document.getElementById('calle');

console.log(esquinaDireccion);

if(numeroDireccion.value == "" || esquinaDireccion.value == "" || calleDireccion.value == ""){

  document.getElementsByClassName(".invalid-feedback").classList.remove("valid");
  document.getElementsByClassName(".invalid-feedback").classList.add("invalid");
  

}




}





document.addEventListener("DOMContentLoaded", function(){

  carrito = JSON.parse(localStorage.getItem('carrito'));
       //carrito trae todos los objetos
        if (carrito != null){
          
          showCART(carrito);
        } 
    getJSONData(CarritoProducts).then(function(resultObj){
        if (resultObj.status === "ok") 
        {   
            carroProd = resultObj.data.articles;
            
                //showCART(carroProd);     
        }
        
        
    });
    //esto es para bloquear metodos de pago
    document.getElementById('selectPayments').addEventListener('click', ()=>{
      blocking();
    })//esto es para cambiar el valor del span al selector de metodo de pago
    document.getElementById('confirmarMetodoDePago').addEventListener('click', ()=>{
      selectPayment();
     
    })
    document.getElementById('comprar').addEventListener('submit', (event)=>{
     
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        verificacionDatosCompra();
      }
    })
   
}); 

