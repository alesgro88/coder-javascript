const container = document.getElementById("product-container");

let miCarrito = JSON.parse(localStorage.getItem("miCarrito")) || [];
console.log(miCarrito);

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

const loadingContainer = document.createElement("div");
loadingContainer.className = "d-flex justify-content-center";

const loadingSpinner = document.createElement("div");
loadingSpinner.className = "spinner-grow text-success";

container.appendChild(loadingContainer);
loadingContainer.appendChild(loadingSpinner);


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
    deleteProduct.addEventListener('click', (e) => localStorage.removeItem());

    

    modalBody.appendChild(productCart);
    productCart.appendChild(image);
    productCart.appendChild(title);
    productCart.appendChild(priceKg);
    productCart.appendChild(deleteProduct);
}

const botonCarrito = document.getElementById("btn-carrito");
botonCarrito.addEventListener("click", () => verCarrito());

function modalUp() {
    const myModal = document.getElementById('myModal');
    myModal.className = "modal visible";
}

function verCarrito() {
    if (miCarrito.length > 0) {
        modalUp();
        
        miCarrito.forEach(el => {
            crearCarts(el);
            // const title = document.createElement("h5");
            // title.innerText = el.flavorName;
            // modalBody.appendChild(title);
        });
        console.log(miCarrito);

        // limpiarCarrito();

    } else {
        // modalUp();
        console.log(miCarrito);

        // mensajeVacio();
    }
};

document.getElementById("btn-show-pokemon").addEventListener("click", () => {
    console.log(miCarrito)
});

document.getElementById("btn-release-pokemon").addEventListener("click", () => {
    if (miCarrito.length > 0) {
        const totalPokemon = miCarrito.reduce((acc, el) => acc + el.cantidad, 0);
        Swal.fire({
            title: "Estás seguro de liberar tus pokemon?",
            text: `No los vas a recuperar. Esto es irreversible y ya venís capturando ${miCarrito.length} especies diferentes de pokemon y un total de ${totalPokemon}`,
            showDenyButton: true,
            confirmButtonText: "Sí, segurísimo",
            denyButtonText: `No, me arrepentí`,
            icon: "warning"
        }).then(result => {
            if (result.isConfirmed) {
                miCarrito = [];
                localStorage.setItem("miCarrito", JSON.stringify([]));
                Swal.fire({
                    title: "LISTO",
                    text: "Liberaste a todos tus pokemon",
                    icon: "success",
                })
            } else {
                Swal.fire({
                    title: "Perfecto",
                    text: "Si te arrepentís, acá estoy",
                })
            }
        })
    } else {
        Toastify({
            text: "No tenés ningún pokemon que liberar",
            duration: 3000
        }).showToast();
    };
});

function modalDown() {
    const modalDown = document.getElementById('myModal');
    modalDown.className = "d-none";
}
const modalDownBtn = document.getElementById('btnClose');
modalDownBtn.addEventListener("click", () => modalDown());