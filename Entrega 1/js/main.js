
let arraySabores = ["- Chocolate", "Frutilla", "Vainilla", "Cereza"];

let arrayPedidosPeso = [];
let arrayPedidosSabores = [];

let opciones;

function mostrarSabores() {
    let listaSabores = arraySabores.join("\n - ");
    alert("Los sabores disponibles son:\n" + listaSabores);
};

function agregarPedidoPeso() {
    let nuevoPedidoPeso = prompt("Ingrese el la CANTIDAD de helado que desea en KG:");
    arrayPedidosPeso.push(nuevoPedidoPeso);
    console.log(nuevoPedidoPeso);
};

function agregarPedidosSabores() {
    let nuevoPedidoSabores = prompt("Ingrese los SABORES que desea. \n\n Los sabores disponibles son los siguiente: \n" + arraySabores.join("\n - "));
    arrayPedidosSabores.push(nuevoPedidoSabores);
    console.log(nuevoPedidoSabores);
}

let listaPedidos = arrayPedidosPeso.concat(arrayPedidosSabores);

function mostrarPedido() {
    alert("Tu pedido consiste en " + arrayPedidosPeso + " KG, de los sabores " + arrayPedidosSabores);
    return (arrayPedidosPeso + arrayPedidosSabores);
}

function eliminarPedido() {
    alert("Se ha ELIMINADO tu pedido de " + arrayPedidosPeso + " KG, de los sabores " + arrayPedidosSabores);
    return(arrayPedidosPeso.splice(0));
}


do {
    opciones = parseInt(prompt("Bienvenido a Heladeria CH!  \n Que desea hacer hoy?  \n 1. Realizar un pedido  \n 2. Ver sabores disponibles  \n 3. Mostrar Pedido confirmado \n 4. Eliminar Pedido \n 5. Salir "));

    switch (opciones) {
        case 1:
            if (arrayPedidosPeso.length === 0) {
                agregarPedidoPeso();
                agregarPedidosSabores();
                mostrarPedido();
                break;
            } else {
                alert("Usted ya tiene un pedido en curso. \n Puede eliminarlo en caso de que quiera realizar otro pedido.");
                break;
            }

        case 2:
            mostrarSabores();
            break;

        case 3:
            if (arrayPedidosPeso.length === 0) {
                alert("No hay pedidos realizados aun.");
                break;
            } else {
                mostrarPedido();
                break;
            }
        
        case 4:
            if (arrayPedidosPeso.length === 0) {
                alert("No hay pedidos realizados aun.");
                break;
            } else {
                eliminarPedido();
                break;
            }
        
        case 5:
            alert("Gracias por visitar Helados CH!");
            break;

        default:
            alert("Esta es una opcion incorrecta!");
            break;
    }
} while (opciones !== 5);
