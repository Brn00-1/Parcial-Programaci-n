//carrito
let carrito = [];
//elementos
const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const categoryFilter = document.getElementById("categoryFilter");
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const finishpurchaseButton = document.getElementById('finishPurchase');
const productsContainer = document.getElementById("productsContainer");

function mostrarCarrito() {

    cartItems.innerHTML = "";

    let total = 0;

    carrito.forEach(producto => {

        total += producto.price * producto.cantidad;

        const item = document.createElement("article");
        item.classList.add("cart-item");

        item.innerHTML = `
    <h3>${producto.title}</h3>
    <p>Cantidad: ${producto.cantidad}</p>
    <p>Subtotal: $${(producto.price * producto.cantidad).toFixed(2)}</p>

   <button class="eliminar"> Eliminar</button>
`;
        const botonEliminar = item.querySelector(".eliminar");

        botonEliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
        });

        cartItems.appendChild(item);
    });

    cartTotal.textContent = total.toFixed(2);
    let cantidad = 0;

    carrito.forEach(producto => {
        cantidad += producto.cantidad;
    });

    cartCount.textContent = cantidad;
}


function agregarAlCarrito(producto) {

    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    guardarCarrito();
    mostrarCarrito();
}
async function cargarProductos() {

    try {

        const respuesta = await fetch("https://fakestoreapi.com/products");
        const productos = await respuesta.json();

        mostrarProductos(productos);

    } catch (error) {
        console.log(error);
    }

}

cargarProductos();

function mostrarProductos(productos) {

    productsContainer.innerHTML = "";

    productos.forEach(producto => {

        const card = document.createElement("article");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p class="category">${producto.category}</p>
            <p class="price">$${producto.price}</p>
            <button>Agregar al carrito</button>
        `;

        const boton = card.querySelector("button");

        boton.addEventListener("click", () => {
            agregarAlCarrito(producto);
        });

        productsContainer.appendChild(card);

    });

}

async function cargarCategorias() {

    const respuesta = await fetch("https://fakestoreapi.com/products/categories");
    const categorias = await respuesta.json();

    categorias.forEach(categoria => {

        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;

        categoryFilter.appendChild(option);

    });

}

cargarCategorias();

categoryFilter.addEventListener("change", filtrarCategoria);

async function filtrarCategoria() {

    const categoria = categoryFilter.value;

    if (categoria === "") {
        cargarProductos();
        return;
    }

    const respuesta = await fetch(
        `https://fakestoreapi.com/products/category/${categoria}`
    );

    const productos = await respuesta.json();

    mostrarProductos(productos);
}
cartIcon.addEventListener("click", () => {

    document.getElementById("carrito").scrollIntoView({
        behavior: "smooth"
    });

});
function eliminarProducto(id) {

    carrito = carrito.filter(producto => producto.id !== id);

    mostrarCarrito();
}

function cargarcarito() {

    const carritoGuardado = localStorage.getItem("carrito");    

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }

}
cargarcarito();


function guardarCarrito() {

    localStorage.setItem("carrito", JSON.stringify(carrito));

}
finishpurchaseButton.addEventListener("click", finalizarCompra);

function finalizarCompra() {

    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    alert("¡Compra realizada con éxito!");

    carrito = [];

    localStorage.removeItem("carrito");

    mostrarCarrito();
}