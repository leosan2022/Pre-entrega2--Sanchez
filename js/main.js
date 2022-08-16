

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


/**Bottom */

function myFunction() {
    alert("This month we have hot sale");
}

/**segunda entrega */

document.addEventListener('DOMContentLoaded', () => {

    // Variables
        const baseDeDatos = [
             {
                id: 1,
                nombre: 'Mapex',
                precio: 1000,
                imagen: ''
            },
            {
                id: 2,
                nombre: 'Sonor',
                precio: 1.200,
                imagen: ''
            },
            {
                id: 3,
                nombre: 'DW',
                precio: 2.100,
                imagen: ''
            },
            {
                id: 4,
                nombre: 'Ludwig',
                precio: 1000,
                imagen: ''
            }

        ];

        let carrito = [];
        const divisa = '$USD';
        const DOMitems = document.querySelector('#items');
        const DOMcarrito = document.querySelector('#carrito');
        const DOMtotal = document.querySelector('#total');
        const DOMbotonVaciar = document.querySelector('#boton-vaciar');
        const miLocalStorage = window.localStorage;

        function renderizarProductos() {
            baseDeDatos.forEach((info) => {
                    // Estructura
                const miNodo = document.createElement('div');
                miNodo.classList.add('card', 'col-sm-4');
                    // Body
                const miNodoCardBody = document.createElement('div');
                miNodoCardBody.classList.add('card-body');
                    // Titulo
                const miNodoTitle = document.createElement('h5');
                miNodoTitle.classList.add('card-title');
                miNodoTitle.textContent = info.nombre;
                    // Imagen
                const miNodoImagen = document.createElement('img');
                miNodoImagen.classList.add('img-fluid');
                miNodoImagen.setAttribute('src', info.imagen);
                    // Precio
                const miNodoPrecio = document.createElement('p');
                miNodoPrecio.classList.add('card-text');
                miNodoPrecio.textContent = `${info.precio}${divisa}`;
                    // Boton 
                const miNodoBoton = document.createElement('button');
                miNodoBoton.classList.add('btn', 'btn-primary');
                miNodoBoton.textContent = '+';
                miNodoBoton.setAttribute('marcador', info.id);
                miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
                    // Insert
                miNodoCardBody.appendChild(miNodoImagen);
                miNodoCardBody.appendChild(miNodoTitle);
                miNodoCardBody.appendChild(miNodoPrecio);
                miNodoCardBody.appendChild(miNodoBoton);
                miNodo.appendChild(miNodoCardBody);
                DOMitems.appendChild(miNodo);
            });
            }

            /**
            * Evento para añadir un producto al carrito
            */
            function anyadirProductoAlCarrito(evento) {
                // Anyadimos el Nodo a nuestro carrito
                carrito.push(evento.target.getAttribute('marcador'))
                // Actualizamos el carrito 
                renderizarCarrito();
                // Actualizamos el LocalStorage
                guardarCarritoEnLocalStorage();
            }

            function renderizarCarrito() {
                // Vaciamos
                DOMcarrito.textContent = '';
                
                const carritoSinDuplicados = [...new Set(carrito)];
               
                carritoSinDuplicados.forEach((item) => {
                   
                    const miItem = baseDeDatos.filter((itemBaseDatos) => {
                        
                        return itemBaseDatos.id === parseInt(item);
                    });
                  
                    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                  
                        return itemId === item ? total += 1 : total;
                    }, 0);
                    
                    const miNodo = document.createElement('li');
                    miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
                    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
                    // Boton de borrar
                    const miBoton = document.createElement('button');
                    miBoton.classList.add('btn', 'btn-danger', 'mx-5');
                    miBoton.textContent = 'X';
                    miBoton.style.marginLeft = '1rem';
                    miBoton.dataset.item = item;
                    miBoton.addEventListener('click', borrarItemCarrito);
                    // Mezclamos nodos
                    miNodo.appendChild(miBoton);
                    DOMcarrito.appendChild(miNodo);
                });
                //  precio total 
                DOMtotal.textContent = calcularTotal();
            }

            
            function borrarItemCarrito(evento) {
                // Obtenemos el producto ID que hay en el boton pulsado
                const id = evento.target.dataset.item;
                // Borramos todos los productos
                carrito = carrito.filter((carritoId) => {
                    return carritoId !== id;
                });
                
                renderizarCarrito();
                // ActuaLIZAMOS
                guardarCarritoEnLocalStorage();

            }

            
            function calcularTotal() {
                // Recorremos el array del carrito 
                return carrito.reduce((total, item) => {
                    // De cada elemento obtenemos su precio
                    const miItem = baseDeDatos.filter((itemBaseDatos) => {
                        return itemBaseDatos.id === parseInt(item);
                    });
                    // Los sumamos al total
                    return total + miItem[0].precio;
                }, 0).toFixed(2);
            }

           
            function vaciarCarrito() {
                // Limpiamos los productos guardados
                carrito = [];
                
                renderizarCarrito();
            
                localStorage.clear();

            }

            function guardarCarritoEnLocalStorage () {
                miLocalStorage.setItem('carrito', JSON.stringify(carrito));
            }

            function cargarCarritoDeLocalStorage () {
            
                if (miLocalStorage.getItem('carrito') !== null) {
                    // Carga la información
                    carrito = JSON.parse(miLocalStorage.getItem('carrito'));
                }
            }

            // Eventos
            DOMbotonVaciar.addEventListener('click', vaciarCarrito);

            // Inicio
            cargarCarritoDeLocalStorage();
            renderizarProductos();
            renderizarCarrito();
        });
    
        /*Operadores*/


let firstName = "";
let lastName = "";
let nickName = "TopDrummer";

 /*sweet alert*/
      
Swal.fire({
    title: "Sale #123",
    text: "¿Remove?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
})
.then(resultado => {
    if (resultado.value) {
        // Hicieron click en "Sí"
        console.log("*se elimina la venta*");
    } else {
        // Dijeron que no
        console.log("*NO se elimina la venta*");
    }
});

