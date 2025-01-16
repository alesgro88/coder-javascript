const container = document.getElementById("product-container");

let miCarrito = JSON.parse(localStorage.getItem("miCarrito")) || [];
console.log(miCarrito);

// Agregar al Carrito
function agregarAlCarrito(pokemon) {

    if (miCarrito.some(el => el.flavorName === pokemon.flavorName)) {
        let indexPoke = miCarrito.findIndex(el => el.flavorName === pokemon.flavorName);
        miCarrito[indexPoke].cantidad += 1;
    } else {
        miCarrito.push({
            ...pokemon,
            cantidad: 1,
        });
    };

    localStorage.setItem("miCarrito", JSON.stringify(miCarrito));

    Toastify({
        text: `Capturaste a ${pokemon.flavorName}`,
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
            const allPokemon = data.items;
            allPokemon.forEach((el, index) => {
                const urlBase = el.imageUrl;

                const card = document.createElement("div");
                card.className = "card-pokemon";

                const nombre = document.createElement("p");
                nombre.innerText = el.flavorName;

                const imagen = document.createElement("img");
                imagen.className = "img-pokemon";
                imagen.src = urlBase;
                imagen.alt = el.flavorName;

                const boton = document.createElement("button");
                boton.innerText = "Capturar";
                boton.className = "btn btn-secondary"
                boton.addEventListener("click", () => agregarAlCarrito(el));

                card.appendChild(nombre)
                card.appendChild(imagen)
                card.appendChild(boton)

                document.getElementById("container").appendChild(card);
            })
            document.getElementById("container").className = "container-pokemon";
        })
        .catch(err => console.error(err))
}, 2000);

// Crear Carrito
function crearCarts(carrito) {
    const modalBody = document.getElementById('modalBody');

    const productCart = document.createElement("div");
    productCart.className = "product-cart";

    const image = document.createElement("img");
    image.src = carrito.imageUrl;
    image.alt = carrito.flavorName;
    image.className = "product-cart-img";

    const title = document.createElement("h5");
    title.innerText = carrito.flavorName;
    title.className = "product-cart-title";

    const priceKg = document.createElement("p");
    priceKg.innerText = carrito.cantidad;
    priceKg.className = "product-cart-price";

  
    const deleteProduct = document.createElement("button");
    deleteProduct.innerText = "X";
    deleteProduct.className = "btn btn-primary delete-btn";
    deleteProduct.addEventListener('click', () => deleteItem(carrito));

    modalBody.appendChild(productCart);
    productCart.appendChild(image);
    productCart.appendChild(title);
    productCart.appendChild(priceKg);
    productCart.appendChild(deleteProduct);
}


// Modal Up & Down
function modalUp() {
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
    const modalBody = document.getElementById('modalBody');
    const limpiarCarrito = document.createElement("button");
    limpiarCarrito.innerText = "Eliminar carrito";
    limpiarCarrito.className = "btn btn-secondary";
    
    modalBody.appendChild(limpiarCarrito);

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
    const modalBody = document.getElementById('modalBody');
    const checkoutCarrito = document.createElement("button");
    checkoutCarrito.innerText = "Comprar Carrito";
    checkoutCarrito.className = "btn btn-success";
    
    modalBody.appendChild(checkoutCarrito);

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

        myModal.removeChild(miCarrito);

        miCarrito.forEach(el => {
            crearCarts(el);
        });

        limpiarCarrito();

    } else {
        Toastify({
            text: "No tenés ningún producto en tu carrito",
            duration: 3000,
            gravity: "bottom"
        }).showToast();
    }
};

document.getElementById("btn-show-pokemon").addEventListener("click", () => {
    console.log(miCarrito)
});

