let ProductosInfoData = []; 

let ProductosComments = [];


//misma funcion que traje  desde products.js para darle funcionalidad a las imagenes relacionadas
function setCatIDInfoProd(id) {
  localStorage.setItem("catIDinfoProd", id);
  window.location = "product-info.html"
}

function MostrarInfoDeProductos(){

let estructuraHTML = "";
let estructuraProdRel = "";  
let infoProd = ProductosInfoData;

    
     estructuraHTML += `  <div  id="plantillaInfoProductos" class="container">
  <div class="text-center">
  <br>
    <p>Verás aquí toda la informacion del producto de la categoría <b>` + infoProd.category + `</b></p>
  </div>
  
  <div class="text-center">
  <div class ="box1">
    <h2 id = "prueba"> ` + infoProd.name + `</h2>
  </div> <br>
      <div class="text-center">
        <h4 id = "prueba">` + infoProd.description + `</h4>
      </div>  
  </div>
  <div class="">
    <p><b>Precio:` + " " + infoProd.currency + " " + ` <font color ="green"> ` + infoProd.cost + `</font>.</b></p>
    <br>
    <p><b>Cantidad de vendidos: <font color="red">`+ " " + infoProd.soldCount + `</font>.</b></p>
    <br>
    
</div>

<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
<p class= "text-center"><b>Imagenes ilustrativas </b></p>
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" >
    <div class="carousel-item active">
      <img src="` + infoProd.images[0] + `" class="d-block w-100" alt="product image">
    </div>
    <div class="carousel-item">
      <img src="` + infoProd.images[1] + `" class="d-block w-100" alt="product image">
    </div>
    <div class="carousel-item">
      <img src="` + infoProd.images[2] + `" class="d-block w-100" alt="product image">
    </div>
    <div class="carousel-item">
      <img src="` + infoProd.images[3] + `" class="d-block w-100" alt="product image">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<br>
<p class="text-center" id="prueba"><b>Algunos comentarios...</b></p>
<br>

`   
document.getElementById("Prod-info-list").innerHTML = estructuraHTML;

estructuraProdRel += `
<br>
<hr id="hr">
<div id="container2"> 
<div class="text-center">
    <h3 id="prueba"> Productos relacionados</h3>
  </div>
<div class="row">
    <div class="col-md-2">
        <div class="ibox1">
          <div class="text-end">
         <p id = "merparrafo"><b>`+ infoProd.relatedProducts[0].name +`</b></p>
         
            <div class="ibox-content product-box1">
                <div onclick="setCatIDInfoProd(` + infoProd.relatedProducts[0].id + `) "class="list-group-item-action cursor-active">
                  <img src="` + infoProd.relatedProducts[0].image + `" alt="product image" class="img-infoprod">
                </div>
                <div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="col-md-2">
        <div class="ibox2">
        <div class="text-start">
        <p id = "doparrafo"><b>`+ infoProd.relatedProducts[1].name +`</b></p>
        </div>
            <div class="ibox-content product-box2">
                <div onclick="setCatIDInfoProd(` + infoProd.relatedProducts[1].id + `)"class="list-group-item-action cursor-active">
                  <img src="` + infoProd.relatedProducts[1].image + `" alt="product image" class="img-infoprod">
                </div>
                <div>
              </div>
            </div>
        </div>
    </div>
</div>    
</div>
`
        
        document.getElementById("Prod-relacionado").innerHTML = estructuraProdRel;
}



function mostrarComentarios() {

let estructuraHTMLcomentarios = "";

for(let i = 0; i < ProductosComments.length; i++){
    

    estructuraHTMLcomentarios+=`

    
       <li class="list-group-item"><b>
          <span> ${ProductosComments[i].user}</span></b>
          <span> - ${ProductosComments[i].dateTime} -</span>
            <span>
              <span class= "fa fa-star ${ProductosComments[i].score >= 1 ? "checked" : ""}"></span>
              <span class= "fa fa-star ${ProductosComments[i].score >= 2 ? "checked" : ""}"></span>
              <span class= "fa fa-star ${ProductosComments[i].score >= 3 ? "checked" : ""}"></span>
              <span class= "fa fa-star ${ProductosComments[i].score >= 4 ? "checked" : ""}"></span>
              <span class= "fa fa-star ${ProductosComments[i].score >= 5 ? "checked" : ""}"></span>
            </span>
          <br>
          <span> ${ProductosComments[i].description}</span>

       </li>`
   }
   document.getElementById('Prod-comments-list').innerHTML = estructuraHTMLcomentarios;

}




//desafiate

let usuarioComm = sessionStorage.getItem('user'); //me trae el nombre de usuario
let array = [];
let arrayPuntaje = [];


function mostrar(){

//variables y condiciones para mostrar fecha y hora
  let fechaHora = new Date();
  let anio = fechaHora.getFullYear();
  let mes = fechaHora.getMonth() + 1;
   if (mes < 10) { mes = "0" + mes;}
  let dia = fechaHora.getDay();
   if (dia < 10) { dia = "0" + dia;}
  let minutos = fechaHora.getMinutes();
   if (minutos < 10) { minutos = "0" + minutos;}
  let segundos = fechaHora.getSeconds();
   if (segundos < 10) { segundos = "0" + segundos;}
  let horas = fechaHora.getHours();
   if (horas < 10) { horas = "0" + horas;}
  
  // variable que muestra todo en un conjunto
  let tiempoActual = anio + "-" + mes + "-" + dia + " " + horas + ":" + minutos + ":" + segundos;


  let estrella = "";//Variable para mostrar estrellas

  for(let i = 1; i <= 5; i ++){
    
    if(i <= document.getElementById('Puntaje').value){
      
      estrella += `<i class="fas fa-star checked"></i>`;
      
    }else{

      estrella += `<i class="fa fa-star"></i>`;

  }}

  let elementos="";//Variable para mostrar el comentario agregado en su totalidad

  {

      elementos+= 

          `<li class="list-group-item"><b>
              ${usuarioComm}</b> - ${tiempoActual} - 
                 ${estrella} <br> ${document.getElementById('comentario').value}</li> `
      
      
  }
  document.getElementById('Prod-comments-user').innerHTML += elementos;
  document.getElementById('comentario').value="";
  document.getElementById('Puntaje').value="";
}


/*
function preguntarSiHayUsuario () {

  if(usuarioComm == null){
      Swal.fire({
        title: 'Debes iniciar sesión para comentar',
        text: "Deseas iniciar?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#17a2b8',
        cancelButtonColor: 'grey',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Iniciar sesión'
      
      }).then((result) => {
        if (result.isConfirmed) {   
        location.href= "login.html";
        }else if (result.isCancel){
          document.getElementById('comentario').value="";   
          document.getElementById('Puntaje').value=""; 
        }
   })}

}
*/



document.addEventListener("DOMContentLoaded", function(){
    getJSONData(ProductINFO_URL_modified).then(function(resultObj){
        if (resultObj.status === "ok") 
        {   
            ProductosInfoData = resultObj.data;
            
            MostrarInfoDeProductos();
           
        }
    });
});

document.addEventListener("DOMContentLoaded", function(){
  getJSONData(ProductCommentsInfo).then(function(resultObj){
      if (resultObj.status === "ok") 
      {   
        ProductosComments = resultObj.data;
          
          mostrarComentarios();
         
      }
  });

  document.getElementById("botonsito").addEventListener("click", function(){

    if(document.getElementById('comentario').value != "" && document.getElementById('Puntaje').value != ""){
    mostrar();
  
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debes ingresar todos los campos',
    })
    document.getElementById('comentario').value="";
    document.getElementById('Puntaje').value="";

}
   })
   
});
