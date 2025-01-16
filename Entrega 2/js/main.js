const container = document.getElementById("product-container");

let miCarrito = JSON.parse(localStorage.getItem("miCarrito")) || [];
console.log(miCarrito);

// Agregar al Carrito
function agregarAlCarrito(producto) {

    if (miCarrito.some(el => el.flavorName === producto.flavorName)) {
        let indexProductos = miCarrito.findIndex(el => el.flavorName === producto.flavorName);
        miCarrito[indexProductos].cantidad += 1;
    } else {
        miCarrito.push({
            ...producto,
            cantidad: 1,
        });
    };

    localStorage.setItem("miCarrito", JSON.stringify(miCarrito));

    Toastify({
        text: `Agregaste a ${producto.flavorName} al carrito`,
        backgroundColor: "#e1106f",
        duration: 3000,
        gravity: "bottom",
    }).showToast();
};

// Loading Inicio
const loadingContainer = document.createElement("div");
loadingContainer.className = "d-flex justify-content-center";

const loadingSpinner = document.createElement("div");
loadingSpinner.className = "spinner-grow text-success";

container.appendChild(loadingContainer);
loadingContainer.appendChild(loadingSpinner);

// Render Productos
setTimeout(() => {
    container.removeChild(loadingContainer);

    fetch("https://jellybellywikiapi.onrender.com/api/beans")
        .then(response => response.json())
        .then(data => {
            const todosProductos = data.items;
            todosProductos.forEach((el, index) => {
                const urlBase = el.imageUrl;

                const cardCol = document.createElement("div");
                cardCol.className = "col-3";

                const card = document.createElement("div");
                card.className = "card mb-3";

                const cardBody = document.createElement("div");
                cardBody.className = "card-body";

                const imagen = document.createElement("img");
                imagen.className = "card-img-top";
                imagen.src = urlBase;
                imagen.alt = el.flavorName;

                const nombre = document.createElement("h4");
                nombre.innerText = el.flavorName;
                nombre.className = "card-title my-3";

                const descripcion = document.createElement("p");
                descripcion.innerText = el.description;
                descripcion.className = "card-text";

                const boton = document.createElement("button");
                boton.innerText = "Agregar Paquete";
                boton.className = "btn btn-success btn-gradient-1 w-100"
                boton.addEventListener("click", () => agregarAlCarrito(el));

                cardCol.appendChild(card);
                card.appendChild(cardBody);
                cardBody.appendChild(imagen);
                cardBody.appendChild(nombre);
                cardBody.appendChild(descripcion);
                cardBody.appendChild(boton);

                document.getElementById("product-container").appendChild(cardCol);
            })
            document.getElementById("container").className = "container";
        })
        .catch(err => console.error(err))
}, 2000);

// ELiminar producto del carrito
function deleteItem(carr) {
    let newCarrito = miCarrito.filter(item => item.beanId !== carr.beanId);
    localStorage.setItem("miCarrito", JSON.stringify(newCarrito));

    Toastify({
        text: "Eliminaste el producto del carrito",
        duration: 3000,
        backgroundColor: "#000",
        gravity: "bottom",
    }).showToast();
}

// Crear Carrito
function crearCarts(carrito) {
    const modalBody = document.getElementById('modalBody');

    const productCart = document.createElement("div");
    productCart.className = "product-cart";
    productCart.id = "product-cart";

    const image = document.createElement("img");
    image.src = carrito.imageUrl;
    image.alt = carrito.flavorName;
    image.className = "product-cart-img";

    const title = document.createElement("h5");
    title.innerText = carrito.flavorName;
    title.className = "product-cart-title";

    const productQuantity = document.createElement("p");
    productQuantity.innerText = `${carrito.cantidad} Paquetes`;
    productQuantity.className = "product-cart-quantity";


    const deleteProduct = document.createElement("button");
    deleteProduct.innerText = "Eliminar";
    deleteProduct.className = "btn delete-btn";
    deleteProduct.addEventListener('click', () => deleteItem(carrito));

    modalBody.appendChild(productCart);
    productCart.appendChild(image);
    productCart.appendChild(title);
    productCart.appendChild(productQuantity);
    productCart.appendChild(deleteProduct);
}

// Modal Up & Down
function modalUp() {
    modalBody.innerHTML = "";
    const myModal = document.getElementById('myModal');
    myModal.className = "modal visible";
}

function modalDown() {
    const modalDown = document.getElementById('myModal');
    modalDown.className = "d-none";
}
const modalDownBtn = document.getElementById('btnClose');
modalDownBtn.addEventListener("click", () => modalDown());


// Limpiar Carrito
function limpiarCarrito() {
    const btnContainer = document.getElementById('btn-container');
    const limpiarCarrito = document.createElement("button");
    limpiarCarrito.innerText = "Eliminar Carrito";
    limpiarCarrito.className = "btn delete-btn";

    btnContainer.appendChild(limpiarCarrito);

    limpiarCarrito.addEventListener("click", () => {
        modalDown();
        Swal.fire({
            title: "Esta seguro que quiere eliminar su carrito?",
            showDenyButton: true,
            denyButtonText: "Cancelar",
            confirmButtonText: "Aceptar",
            icon: "warning"
        }).then(result => {
            if (result.isConfirmed) {
                miCarrito = [];
                localStorage.setItem("miCarrito", JSON.stringify([]));
                Swal.fire({
                    title: "Tu carrito está vacío",
                    icon: "success",
                })
            } else {
                verCarrito();
            }
        })
        modalDown();
    });
}

// Checkout Carrito
function checkoutCarrito() {
    const btnContainer = document.getElementById('btn-container');
    const checkoutCarrito = document.createElement("button");
    checkoutCarrito.innerText = "Comprar Carrito";
    checkoutCarrito.className = "btn btn-success btn-gradient-2";
    btnContainer.appendChild(checkoutCarrito);

    checkoutCarrito.addEventListener("click", () => {
        modalDown();
        Swal.fire({
            title: "Su carrito se ha comprado con éxito!",
            confirmButtonText: "Aceptar",
            icon: "success"
        });
        miCarrito = [];
        modalDown();
    });
}

// Btn Ver Carrito
const botonCarrito = document.getElementById("btn-carrito");
botonCarrito.addEventListener("click", () => verCarrito());

// Ver Carrito
function verCarrito() {
    if (miCarrito.length > 0) {
        modalUp();
        miCarrito.forEach(el => {
            crearCarts(el);
        });
        const modalBody = document.getElementById('modalBody');
        const btnContainer = document.createElement("div");
        btnContainer.id = "btn-container";
        btnContainer.className = "btn-container my-3";
        
        modalBody.appendChild(btnContainer);

        limpiarCarrito();
        checkoutCarrito();

    } else {
        Toastify({
            text: "No tenés ningún producto en tu carrito",
            duration: 3000,
            backgroundColor: "#000",
            gravity: "bottom"
        }).showToast();
    }
};