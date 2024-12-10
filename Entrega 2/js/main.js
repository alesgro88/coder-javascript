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
        description: "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño",
        precioKg: 200,
        precioMedioKg: 100,
        precioCuartoKg: 50,
        img: "img/sabores/jengibre.jpg"
    },
    {
        id: 2,
        nombre: "Lechuga",
        description: "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño",
        precioKg: 200,
        precioMedioKg: 100,
        precioCuartoKg: 50,
        img: "img/sabores/jengibre.jpg"
    },
    {
        id: 3,
        nombre: "Arándanos",
        description: "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño",
        precioKg: 200,
        precioMedioKg: 100,
        precioCuartoKg: 50,
        img: "img/sabores/jengibre.jpg"
    },
    {
        id: 4,
        nombre: "Pera",
        description: "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño",
        precioKg: 200,
        precioMedioKg: 100,
        precioCuartoKg: 50,
        img: "img/sabores/jengibre.jpg"
    },
    {
        id: 5,
        nombre: "Banana",
        description: "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño",
        precioKg: 200,
        precioMedioKg: 100,
        precioCuartoKg: 50,
        img: "img/sabores/jengibre.jpg"
    },
    {
        id: 6,
        nombre: "Frutilla",
        description: "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño",
        precioKg: 200,
        precioMedioKg: 100,
        precioCuartoKg: 50,
        img: "img/sabores/jengibre.jpg"
    },
];

function agregarAlCarrito(producto) {
    carrito.push(producto);
    alert(`Agregaste ${producto.nombre} correctamente al carrito`);
};


function crearCard(producto) {
    const cardCol = document.createElement("div");
    cardCol.className = "col-4";

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

    const priceBlock2 = document.createElement("div");
    priceBlock2.className = "price-block";

    const priceBlock3 = document.createElement("div");
    priceBlock3.className = "price-block";

    const priceKg = document.createElement("span");
    priceKg.innerText = `Precio por 1 Kg - $${producto.precioKg}`;
    priceKg.className = "card-price";

    const priceMedioKg = document.createElement("span");
    priceMedioKg.innerText = `Precio por 1/2 Kg - $${producto.precioMedioKg}`;
    priceMedioKg.className = "card-price";

    const priceCuartoKg = document.createElement("span");
    priceCuartoKg.innerText = `Precio por 1/4 Kg - $${producto.precioCuartoKg}`;
    priceCuartoKg.className = "card-price";

    const btnAddKg = document.createElement("button");
    btnAddKg.innerText = "Comprar";
    btnAddKg.className = "btn btn-primary btn-sm";
    btnAddKg.addEventListener("click", () => agregarAlCarrito(producto));

    const btnAddMedioKg = document.createElement("button");
    btnAddMedioKg.innerText = "Comprar";
    btnAddMedioKg.className = "btn btn-primary btn-sm";
    btnAddMedioKg.addEventListener("click", () => agregarAlCarrito(producto));

    const btnAddCuartoKg = document.createElement("button");
    btnAddCuartoKg.innerText = "Comprar";
    btnAddCuartoKg.className = "btn btn-primary btn-sm";
    btnAddCuartoKg.addEventListener("click", () => agregarAlCarrito(producto));
    // btnAdd.onclick = () => agregarAlCarrito(producto);

    // btnAdd.addEventListener("mousedown", () => console.log("CLICK down"))
    // btnAdd.addEventListener("mouseup", () => console.log("CLICK UP"))

    // btnAdd.onmouseover = () => console.log("Mouse over");
    // btnAdd.onmouseout = () => console.log("Mouse out");

    // btnAdd.addEventListener("mousemove", () => console.log("SE MUEVE"));

    // ----------------------

    // const input = document.createElement("input");
    // input.placeholder = "Ingrese algo";

    // input.addEventListener("keydown", () => console.log("PRESIONÓ"))
    // input.addEventListener("keyup", () => console.log("SOLTÓ"))
    // input.addEventListener("change", () => console.log("CAMBIO"))
    // input.addEventListener("input", () => console.log(input.value))

    cardCol.appendChild(card);

    card.appendChild(cardBody);

    cardBody.appendChild(img);
    cardBody.appendChild(title);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(priceBlock1);
    priceBlock1.appendChild(priceKg);
    priceBlock1.appendChild(btnAddKg);

    cardBody.appendChild(priceBlock2);
    priceBlock2.appendChild(priceMedioKg);
    priceBlock2.appendChild(btnAddMedioKg);

    cardBody.appendChild(priceBlock3);
    priceBlock3.appendChild(priceCuartoKg);
    priceBlock3.appendChild(btnAddCuartoKg);

    container.appendChild(cardCol);
};

arrayProductos.forEach(el => {
    crearCard(el);
});

const botonCarrito = document.getElementById("btn-carrito");

botonCarrito.addEventListener("click", () => verCarrito());

// function verCarrito() {
//     console.log("Este es tu carrito");
//     console.log(carrito);
// };

function verCarrito() {

    if (carrito.length > 0) {
        console.log(carrito);
        console.log(producto.nombre);
        console.log(producto.img);

        // const myModal = document.getElementById('myModal');
        // myModal.className = "modal visible";
    
        // const modalBody = document.getElementById('modalBody');
    
        // const productCart = document.createElement("div");
        // productCart.className = "product-cart";
    
        // const img = document.createElement("img");
        // img.src = carrito.img;
        // img.alt = carrito.nombre;
        // img.className = "product-cart-img";
    
        // const title = document.createElement("h5");
        // title.innerText = carrito.nombre;
        // title.className = "product-cart-title";
    
        // const quantity = document.createElement("p");
        // quantity.innerText = `${carrito.description}`;
        // quantity.className = "card-text";
    
        // const productPrice = document.createElement("p");
        // productPrice.innerText = `${carrito.description}`;
        // productPrice.className = "card-text";

        // modalBody.appendChild(productCart);
        // productCart.appendChild(img);
        // productCart.appendChild(title);
        // productCart.appendChild(quantity);
        // productCart.appendChild(productPrice);

    } else {
        console.log("vacio")
        
    }
};