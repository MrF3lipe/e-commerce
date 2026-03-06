let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const contenedorCarritoVacio = document.querySelector("#contenedor-carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#contenedor-carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#contenedor-carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#contenedor-carrito-comprado");
const botonVaciar = document.querySelector("#boton-vaciar-carrito");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const aside = document.querySelector("aside");

let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
let botonesModificarMas = document.querySelectorAll(".carrito-boton-modificar-mas");
let botonesModificarMenos = document.querySelectorAll(".carrito-boton-modificar-menos");

cargarProductosCarrito();

function cargarProductosCarrito(){
    if(productosEnCarrito == null || productosEnCarrito.length == 0){
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    else {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-nombre">
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    
                    <p>
                        <button id="${producto.id}" class="carrito-boton-modificar-menos">-</button>
                        ${producto.cantidad}
                        <button id="${producto.id}" class="carrito-boton-modificar-mas">+</button>
                    </p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${producto.cantidad*producto.precio}</p>
                </div>
                <button id="${producto.id}" class="carrito-producto-eliminar"><i class="bi bi-trash-fill"></i></button>
            `;  
            contenedorCarritoProductos.append(div);
        });

        actualizarBotones();

        let total = document.querySelector("#total");

        const cantidadTotal=productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad*producto.precio,0);

        total.innerHTML = cantidadTotal;
    }
}

botonVaciar.addEventListener('click', vaciarCarrito);
function vaciarCarrito(){
    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: 'se van a borrar todos los productos del carrito.',
        showCancelButton: true,
        focusConfirm: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if(result.isConfirmed){
            contenedorCarritoProductos.innerHTML = "";
            localStorage.removeItem("productos-en-carrito");
            productosEnCarrito = null;
            cargarProductosCarrito();
        }
    })    
}

function actualizarBotones(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
    botonesModificarMas = document.querySelectorAll(".carrito-boton-modificar-mas")
    botonesModificarMas.forEach(boton => {
        boton.addEventListener("click", SumarAlCarrito);
    });
    botonesModificarMenos = document.querySelectorAll(".carrito-boton-modificar-menos")
    botonesModificarMenos.forEach(boton => {
        boton.addEventListener("click", RestarDelCarrito);
    });
}

function eliminarDelCarrito(e){
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            borderRadius: '1rem',
            background: "linear-gradient(to left, #37346d, #5d58bc)",
            textTransform: 'uppercase',
            fontSize: "0.75rem"
        },
        offset:{
            x: '1.5rem',
            y: '1.5rem'
        },
        onClick: function(){}
    }).showToast();
    const idProducto = e.currentTarget.id;
    const productoEliminado = productosEnCarrito.findIndex(producto => producto.id === idProducto);
    productosEnCarrito.splice(productoEliminado,1);

    
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function SumarAlCarrito(e){
    const idProducto = e.currentTarget.id;
    const productoSumado = productosEnCarrito.find(producto => producto.id === idProducto);

    productoSumado.cantidad++;
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function RestarDelCarrito(e){
    const idProducto = e.currentTarget.id;
    const productoSumado = productosEnCarrito.find(producto => producto.id === idProducto);

    productoSumado.cantidad--;

    if (productoSumado.cantidad == 0) {
        eliminarDelCarrito(e);
    }

    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

botonComprar.addEventListener('click', realizarCompra);
function realizarCompra(){
    contenedorCarritoProductos.innerHTML = "";
    localStorage.removeItem("productos-en-carrito");
    productosEnCarrito = null;
    cargarProductosCarrito();
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}