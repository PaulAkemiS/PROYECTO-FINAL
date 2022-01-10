let lista = [];

//Traemos los productos del json
$.getJSON("productos.json", function (data) {
  data.forEach((elemento) => lista.push(elemento));

  const carrito = localStorage.getItem("carrito")
  if (carrito === null) {
    localStorage.setItem("carrito", "")
  }

  const precioTotal = localStorage.getItem("precioTotal")
  if (precioTotal === null) {
    localStorage.setItem("precioTotal", 0)
  }

  mostrarCarrito();
});

class Producto {
  constructor(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = parseInt(precio);
    this.stock = parseInt(stock);
  }
}

const carrito = [];
let localSt = [];

let producto;

//Agregamos los productos al hmtl
for (let i = 0; i < 6; i++) {
  let btn = $(`#producto${i+1}`);
  btn.click(function (e) {
    let {
      nombre
    } = lista[i];
    e.preventDefault();
    agregarElemento(i);
    localStorage.setItem(`producto${i}`, nombre);

    //Alert de producto agregado al carrito
    swal(`Agregaste ${nombre} a tu carrito`);
    localSt.push(nombre);
  });
}


function agregarElemento(productoID) {
  producto = lista.find(function (producto) {
    if (producto.id == productoID) return true;
    else return false;
  });

  carrito.push(producto);

  mostrarCarrito();
}



function mostrarCarrito() {
  let contenedor = document.getElementById("carrito");
  let precioTotal = 0;

  contenedor.innerHTML = "";
  htmlString = "CARRITO <ul>";
  for (const id in carrito) {
    let producto = carrito[id];
    htmlString += `
            <li class="listaCarrito"> ${producto.nombre}, $ ${producto.precio}
            <button id="carrito_${id}" class="eliminar"> Eliminar</button>
            </li>`;
    precioTotal += producto.precio;
  }

  htmlString += "</ul>";

  contenedor.innerHTML = htmlString;

  let conetendorPrecio = $("#precio");
  conetendorPrecio.html(`TOTAL: $ ${precioTotal}`);

  loadEliminar();
}


//Elimina los productos del carrito
function loadEliminar() {
  let botones = document.getElementsByClassName("eliminar");
  for (const boton of botones) {
    boton.onclick = () => {
      let id = boton.getAttribute("id");
      idNumber = id.split("_")[1];
      carrito.splice(idNumber, 1);
      localStorage.removeItem("producto1");
      localStorage.removeItem("producto2");
      localStorage.removeItem("producto3");
      localStorage.removeItem("producto4");
      localStorage.removeItem("producto5");
      localStorage.removeItem("producto6");

      mostrarCarrito();
    };
  }
}

//Animación del header
$("#header").slideUp(1).slideDown(1600);