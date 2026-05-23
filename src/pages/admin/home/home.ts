import { protegerRuta, logout } from "../../../main";
import { PRODUCTS } from "../../../data/data";
import type { Product } from "../../../types/product";

// Proteger la ruta: solo admins pueden acceder
protegerRuta("admin");

// Boton de logout
const btnLogout = document.getElementById("btn-logout") as HTMLAnchorElement;
btnLogout.addEventListener("click", (e: Event) => {
  e.preventDefault();
  logout();
});

// Renderizar la tabla de productos
const cargarTabla = (): void => {
  const tbody = document.getElementById(
    "tabla-productos"
  ) as HTMLTableSectionElement;

  PRODUCTS.forEach((producto: Product) => {
    const tr = document.createElement("tr");
    const nombreCategoria = producto.categorias.length > 0
      ? producto.categorias[0].nombre
      : "Sin categoria";
    tr.innerHTML = `
      <td>${producto.id}</td>
      <td><img src="/assets/${producto.imagen}" alt="${producto.nombre}" width="60"></td>
      <td>${producto.nombre}</td>
      <td>${nombreCategoria}</td>
      <td>$${producto.precio.toLocaleString("es-AR")}</td>
      <td><a href="#">Editar</a> | <a href="#">Eliminar</a></td>
    `;
    tbody.appendChild(tr);
  });
};

cargarTabla();
