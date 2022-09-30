const ascAZ = "AZ"; 
const descZA = "ZA";  
const cantArt = "Cant.";
let variableDeFormaDeFiltro = undefined;
let valorMin = undefined;  
let valorMax = undefined;  

let categoriesArray = [];
let arrayRecorreProductos = []; 
let arrayCatName = [];

//seteo el Id de la info de los productos para redireccionar de pagina
function setCatIDInfoProd(id) {
    localStorage.setItem("catIDinfoProd", id);
    window.location = "product-info.html"
}

function mostrarListaDeLasCategorias(arrayRecorreProductos){ 
    let htmlContentToAppend = "";
   
    for(let i = 0; i < arrayRecorreProductos.length; i++){ 
        let products = arrayRecorreProductos[i];
                                                                  //convierte a numero entero
        if (((valorMin == undefined) || (valorMin != undefined && parseInt(products.cost) >= valorMin)) &&
            ((valorMax == undefined) || (valorMax != undefined && parseInt(products.cost) <= valorMax))){

        htmlContentToAppend += `
        
        <div onclick="setCatIDInfoProd(`+ products.id +`) "class="list-group-item list-group-item-action cursor-active">
            <div class="row"> 
                <div class="col-3">
                    <img src="` + products.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ products.name + " - " + products.currency + " " + products.cost +`</h4> 
                        
                        <p> `+ products.description +`</p> 
                        </div>
                        <small class="text-muted">` + products.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
        }
    }
}


function ordenarCategorias(tipoDeFiltro, array){  
    let result = [];
    if (tipoDeFiltro === ascAZ) //= "AZ";
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (tipoDeFiltro === descZA){ //= "ZA";
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (tipoDeFiltro === cantArt){ //= "Cant.";
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount); //le cambie el atributo que buscaba en categorias "productCount" y le cambie al .products soldCount, para que pueda filtrar por articulos
            let bCount = parseInt(b.soldCount); //le cambie el atributo que buscaba en categorias "productCount" y le cambie al .products soldCount, para que pueda filtrar por articulos

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function ordenarYmostrarCategorias(tipoDeFiltro, categoriesArray){   
    variableDeFormaDeFiltro = tipoDeFiltro; 
            //undefinded = AZ/ZA/CANT
    if(categoriesArray != undefined){
        arrayRecorreProductos = categoriesArray;
    }

    arrayRecorreProductos = ordenarCategorias(variableDeFormaDeFiltro, arrayRecorreProductos);
                            //(variableDeFormaDeFiltro = AZ , arrayRecorreProductos)
    //Muestro las categorías ordenadas
    mostrarListaDeLasCategorias(arrayRecorreProductos);
}




function barraBuscar (arrayRecorreProductos) {

let buscar = document.getElementById('navBar').value;

let filtro = arrayRecorreProductos.filter(producto =>{

    return producto.name.toLowerCase().indexOf(buscar.toLowerCase()) > -1 || producto.description.toLowerCase().indexOf(buscar.toLowerCase()) > -1;
    
    
})
mostrarListaDeLasCategorias(filtro);
}


document.addEventListener("DOMContentLoaded", function(){
    getJSONData(Product_URL_modified).then(function(resultObj){
        if (resultObj.status === "ok") 
        {   
            arrayCatName = resultObj.data.catName;
            document.getElementById('selector').innerHTML = arrayCatName;
           
            categoriesArray = resultObj.data;

            arrayRecorreProductos = resultObj.data.products;

            mostrarListaDeLasCategorias(arrayRecorreProductos); // muestra los datos de la variable
           
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        ordenarYmostrarCategorias(ascAZ);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        ordenarYmostrarCategorias(descZA);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        ordenarYmostrarCategorias(cantArt);
    });

    document.getElementById("navBar").addEventListener("keyup", function(){
        
        barraBuscar (arrayRecorreProductos);
    });

  //boton limpiar
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        valorMin = undefined;
        valorMax = undefined;

        mostrarListaDeLasCategorias(arrayRecorreProductos);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        valorMin = document.getElementById("rangeFilterCountMin").value;
        valorMax = document.getElementById("rangeFilterCountMax").value;

        if ((valorMin != undefined) && (valorMin != "") && (parseInt(valorMin)) >= 0){
            valorMin = parseInt(valorMin);
        }
        else{
            valorMin = undefined;
        }
        if ((valorMax != undefined) && (valorMax != "") && (parseInt(valorMax)) >= 0){
            valorMax = parseInt(valorMax);
        }
        else{
            valorMax = undefined;
        }

        mostrarListaDeLasCategorias(arrayRecorreProductos);
    });

});

