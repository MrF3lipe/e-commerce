let productos = []

fetch("./js/productos.json")
.then(response => response.json())
.then(data =>{
    productos = data;
    cargarProductos(productos);
});

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar")
const numeroCarrito = document.querySelector("#numero-carrito");
const aside = document.querySelector("aside");

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;  
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton =>{
    boton.addEventListener("click", (e)=>{

        botonesCategorias.forEach(boton2 => {
            boton2.classList.remove("active");
            aside.classList.remove("aside-visible");
        });
        e.currentTarget.classList.add("active");

        

        if (e.currentTarget.id === "todos") {
            cargarProductos(productos);
            tituloPrincipal.innerHTML = "Todos Los Productos"
        }
        else{   
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerHTML = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(productos => productos.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }
    });
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar")
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
if(productosEnCarrito == null)productosEnCarrito = [];

actualizarCantidadCarrito();

function agregarAlCarrito(e){
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
    const productoAgregado = productos.find(producto =>producto.id === idProducto);
    
    if(productosEnCarrito.some(producto => producto.id === idProducto)){
        const productoExistente = productosEnCarrito.find(producto => producto.id === idProducto);
        productoExistente.cantidad++;
    }else{
        console.log(productoAgregado);
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarCantidadCarrito();

    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
}

function actualizarCantidadCarrito(){
    if(productosEnCarrito){
        let numero = productosEnCarrito.reduce((acc,producto)=>acc + producto.cantidad, 0);
        numeroCarrito.innerHTML = numero;
    }
    else{
        numeroCarrito.innerHTML = 0;
    }
}



