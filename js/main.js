

//*Promedio de ventas diarias que ingresan a la web*//
const  VentasDiarias= [290, 10, 18, 23, 15];

let PromedioDeVentas = 0;
for(let posicion= 0; posicion < 5; posicion++){
    PromedioDeVentas = PromedioDeVentas + VentasDiarias [posicion];
}

const Promedio = VentasDiarias/5;
console.log(PromedioDeVentas);

if( PromedioDeVentas > 25){
    console.log("Estamos generando buenas ventas")
}else{
    console.log("Malas ventas")
}

/**Edad */
var Age = prompt("¿HOW OLD ARE YOU?");
console.log('el usuario ingreso su edad:'+ Age);

/**Pre entrega filtrar edades ingresadas */

let age = [21, 43, 23, 1, 34, 12, 8];
console.log(age.filter(i => i > 20));
console.log(age.filter(i => i > 21));

function findAge(Age) {
    let age = [21, 43, 23, 1, 34, 12, 8];
    if( age.filter(i => (i === Age)).length ) {
        return true;
    } else {
        return false;
    }
}
findAge(23);
findAge(40);


/**Carrito de compras**/

const carrito = [];

function agregarAlCarrito(producto){
    //aqui pongo antes validar stock
    //validar marcas
    carrito.push(producto);  
    console.log( carrito);
}

agregarAlCarrito({id: 001, name: "DW", price: "$1000000"})

agregarAlCarrito({id: 002, name: "Mapex", price: "$900000"})

const drummers = [
    {nombre: "DW", price: "$1000000"},
    {nombre: "Mpex", price: "$900000"},
    
]
const resultado = drummers.filter ( (el) => el.nombre.includes('DW'))
 
console.log(resultado)


/**para borrar algun producto del carrito*/ 

function borrarProductoDelCarrito(idDelProducto){
    const index = carrito.findIndex(producto => producto.id === idDelProducto);
    carrito.splice(index, 1);
    console.log(carrito);
}

borrarProductoDelCarrito(001);


/**DOM */


let header__menu = document.getElementsByClassName ("header__menu");

    console.log (header__menu [0].innerHTML);
    console.log (header__menu [1].innerHTML);
    console.log (header__menu [2].innerHTML);
    console.log (header__menu [3].innerHTML);
    console.log (header__menu [4].innerHTML);
    console.log (header__menu [5].innerHTML);
    console.log (header__menu [6].innerHTML);

    for (const header of header__menu) {
        console.log (header.innerHTML);
    }

/**Bottom */

function myFunction() {
    alert("This month we have hot sale");
}