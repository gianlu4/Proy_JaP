let carroProd = [];
let unidadXcosto = 0;
let MONEY_SYMBOL = "USD";



function showCART (array) {

    let HTMLcarrito ="";
   
for(let i = 0; i < array.length; i ++){
 
        let datosCarrito = array[i];

        HTMLcarrito += `
<div class="card mb-4">
  <div class="card-body p-3">
    <div class="row align">
      <div class="col-md-4">
        <img  width = "150px" src="${datosCarrito.image}"
          class="" alt="Generic placeholder image">
       </div>
    
    <div class="col-md-4">
      <div>
        <p class="small text-muted ">Nombre</p>
        <p class="lead fw-normal mb-0" id="valorNombre">${datosCarrito.name}</p>
      </div>
    </div>

    <div class="col-md-4">
      <div class = "">
        <p  id= "pp"class="small text-muted">Cantidad</p>
        <input onchange="actualizarValores(${datosCarrito.unitCost});" id="form1" min="1" name="quantity" value="1" type="number"
        class="form-control" />
      </div>
    </div>
    <div class="col-md-4">
      <div>
        <p class="small text-muted">Costo</p>
        <p class="lead fw-normal mb-0" id = "valorPRODUCTO">${datosCarrito.currency} ${datosCarrito.unitCost}</p>
      </div>
    </div>
    <div class="col-md-4">
      <div>
        <p class="small text-muted">Sub-total</p>
        <p class="lead fw-normal mb-0" id="precioSUBTOTAL">USD ${datosCarrito.unitCost}</p>
      </div>
    </div>

  </div>
  </div>
  </div>
`


}

document.getElementById('divCarr').innerHTML = HTMLcarrito;

}


function actualizarValores(precioProd) {

    let cantidadProd = document.getElementById('form1').value;


    let totalCostToShow = MONEY_SYMBOL +" "+ cantidadProd * precioProd;

    precioSUBTOTAL.innerHTML = totalCostToShow;
}

  
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(CarritoProducts).then(function(resultObj){
        if (resultObj.status === "ok") 
        {   
            carroProd = resultObj.data.articles;
            
                showCART(carroProd);
                
        }
    });
    
}); 
