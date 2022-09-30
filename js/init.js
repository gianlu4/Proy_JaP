const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const LIST_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const EXT_TYPE = ".json";
let Product_URL_modified = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE; //identificador
let ProductINFO_URL_modified = PRODUCT_INFO_URL + localStorage.getItem("catIDinfoProd") + EXT_TYPE;
let ProductCommentsInfo = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("catIDinfoProd") + EXT_TYPE;

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
} 
 




document.addEventListener("DOMContentLoaded", ()=>{

  function askCloseSession (){     // pregunta si quiere cerrar sesion
    Swal.fire({
      title: '¿Quieres cerrar la sesión de eMercado?',
      text: "Puedes volver a iniciar sesión en cualquier momento.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#17a2b8',
      cancelButtonColor: 'grey',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Cerrar sesión'
    
    }).then((result) => {
      if (result.isConfirmed) {   //si hay respuesta positiva, borra el session y redirije al index
      sessionStorage.clear();
      location.href= "login.html";
      }
    })}    

    
//mostrar boton de inicio de sesion y ocultar boton de cerrar sesion
function mostrar(){             
  document.getElementById('LogOut').style.display = "none";
 }


 //ocultar boton de inicio de sesion y mostrar boton de cerrar sesion
function ocultar(){            
  document.getElementById('inicios').style.display = "none";  
}



// variable que trae el nombre de usuario para mostrar el nombre en pantalla
  let usuario = sessionStorage.getItem('user');
  
  if(usuario === null){
  
      mostrar();
      
  }else{
  
      ocultar();
      document.getElementById('usuario1').innerHTML =  usuario ;
      
  }
  
  document.getElementById('cierro').addEventListener('click', ()=>{
    
    askCloseSession ();
  })
  
  document.getElementById('inicios').addEventListener('click',()=>{
      
    location.href="login.html";     
  })
  })
