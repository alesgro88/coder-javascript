const container = document.getElementById("product-container");

let carrito;

if (JSON.parse(localStorage.getItem("carrito"))) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
} else {
    carrito = [];
};

const arrayProductos = [
    {
        id: 1,
        nombre: "Jengibre",
        description: "HelaDitox de Jengibre, con buenas yerbas para la panza.",
        precioKg: 200,
        img: "img/sabores/jengibre.jpg"
    },
    {
        id: 2,
        nombre: "Lechuga",
        description: "HelaDitox de Lechuga, por que siempre hay que tener un sabor feo.",
        precioKg: 200,
        img: "img/sabores/lechuga.jpg"
    },
    {
        id: 3,
        nombre: "Arándanos",
        description: "HelaDitox de smomthie de Arandanos, para el sistema linfático.",
        precioKg: 200,
        img: "img/sabores/arandanos.jpg"
    },
    {
        id: 4,
        nombre: "Pera",
        description: "HelaDitox de Pera con miel, para las caries.",
        precioKg: 200,
        img: "img/sabores/pera.jpg"
    },
    {
        id: 5,
        nombre: "Banana",
        description: "HelaDitox de Banana con Dulce de Leche, para el buen humor.",
        precioKg: 200,
        img: "img/sabores/banana.jpg"
    },
    {
        id: 6,
        nombre: "Frutilla",
        description: "HelaDitox de Frutilla con crema, para vivir la buena vida por siempre.",
        precioKg: 200,
        img: "img/sabores/frutilla.jpg"
    },
];

function agregarAlCarrito(producto) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`Agregaste 1 Kg ($${producto.precioKg}) de HelaDitox sabor ${producto.nombre} correctamente a tu carrito`);
};


function crearCard(producto) {
    const cardCol = document.createElement("div");
    cardCol.className = "col-3";

    const card = document.createElement("div");
    card.className = "card mb-3";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const img = document.createElement("img");
    img.src = producto.img;
    img.alt = producto.nombre;
    img.className = "card-img-top";

    const title = document.createElement("h5");
    title.innerText = producto.nombre;
    title.className = "card-title my-3";

    const cardDescription = document.createElement("p");
    cardDescription.innerText = `${producto.description}`;
    cardDescription.className = "card-text";

    const priceBlock1 = document.createElement("div");
    priceBlock1.className = "price-block";

    const priceKg = document.createElement("span");
    priceKg.innerText = `Precio por 1 Kg - $${producto.precioKg}`;
    priceKg.className = "card-price";

    const btnAddKg = document.createElement("button");
    btnAddKg.innerText = "Comprar";
    btnAddKg.className = "btn btn-primary btn-sm";
    btnAddKg.addEventListener("click", () => agregarAlCarrito(producto));

    cardCol.appendChild(card);

    card.appendChild(cardBody);

    cardBody.appendChild(img);
    cardBody.appendChild(title);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(priceBlock1);
    priceBlock1.appendChild(priceKg);
    priceBlock1.appendChild(btnAddKg);

    container.appendChild(cardCol);
};

arrayProductos.forEach(el => {
    crearCard(el);
});

const botonCarrito = document.getElementById("btn-carrito");
botonCarrito.addEventListener("click", () => verCarrito());

function modalUp() {
    const myModal = document.getElementById('myModal');
    myModal.className = "modal visible";
}

function deleteProduct(carrito) {
    carrito.localStorage.removeItem();
}

function crearCarts(carrito) {
    modalUp();
    const modalBody = document.getElementById('modalBody');

    const productCart = document.createElement("div");
    productCart.className = "product-cart";

    const img = document.createElement("img");
    img.src = carrito.img;
    img.alt = carrito.nombre;
    img.className = "product-cart-img";

    const title = document.createElement("h5");
    title.innerText = carrito.nombre;
    title.className = "product-cart-title";

    const priceKg = document.createElement("p");
    priceKg.innerText = `Precio por 1 Kg - $${carrito.precioKg}`;
    priceKg.className = "product-cart-price";

    const deleteProduct = document.createElement("button");
    deleteProduct.innerText = "X";
    deleteProduct.className = "btn btn-primary delete-btn";
    // deleteProduct.addEventListener("click", () => deleteProduct(carrito));


    modalBody.appendChild(productCart);
    productCart.appendChild(img);
    productCart.appendChild(title);
    productCart.appendChild(priceKg);
    productCart.appendChild(deleteProduct);
}

function mensajeVacio() {
    const modalBody = document.getElementById('modalBody');
    const mensajeVacio = document.createElement("h5");
    mensajeVacio.innerText = "Su carrito está vacío.";
    mensajeVacio.className = "text-center mensajeVacio";
    modalBody.appendChild(mensajeVacio);
}

function verCarrito() {
    if (carrito.length > 0) {
        carrito.forEach(el => {
            crearCarts(el);
        });
    } else {
        modalUp();
        mensajeVacio();
    }
};

function modalDown() {
    const modalDown = document.getElementById('myModal');
    modalDown.className = "d-none";
}
const modalDownBtn = document.getElementById('btnClose');
modalDownBtn.addEventListener("click", () => modalDown());
