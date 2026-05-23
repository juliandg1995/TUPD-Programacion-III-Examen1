import { protegerRuta, logout } from "../../../main";
import { PRODUCTS, getCategories } from "../../../data/data";
import type { Product } from "../../../types/product";
import { addToCart, getCartCount } from "../../../utils/cart";

// Solo clientes pueden ver la tienda
protegerRuta("client");

// Logout
const btnLogout = document.getElementById("btn-logout") as HTMLAnchorElement;
btnLogout.addEventListener("click", (e: Event) => {
  e.preventDefault();
  logout();
});

// Estado de filtros
let categoriaActual: string = "Todas";
let textoBusqueda: string = "";

// Actualizar el contador del carrito en el nav
const actualizarContadorCarrito = (): void => {
  const linkCarrito = document.getElementById("link-carrito") as HTMLAnchorElement;
  const cantidad = getCartCount();
  linkCarrito.textContent = `Carrito (${cantidad})`;
};

// Renderizar productos filtrados en el contenedor
const renderizarProductos = (lista: Product[]): void => {
  const contenedor = document.getElementById("contenedor-productos") as HTMLElement;
  contenedor.innerHTML = "";

  // Solo mostrar disponibles y no eliminados
  const disponibles = lista.filter((p) => p.disponible && !p.eliminado);

  if (disponibles.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  disponibles.forEach((producto: Product) => {
    const article = document.createElement("article");
    article.className = "card";

    article.innerHTML = `
      <img src="/assets/${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p>Precio: <strong>$${producto.precio.toLocaleString("es-AR")}</strong></p>
      <p class="stock-info">Stock: ${producto.stock}</p>
      <button type="button" class="btn-agregar">Agregar al Carrito</button>
    `;

    const btnAgregar = article.querySelector(".btn-agregar") as HTMLButtonElement;
    btnAgregar.addEventListener("click", () => {
      addToCart(producto);
      actualizarContadorCarrito();
      alert(`Se agrego "${producto.nombre}" al carrito.`);
    });

    contenedor.appendChild(article);
  });
};

// Cargar categorias en el sidebar
const cargarCategorias = (): void => {
  const lista = document.getElementById("lista-categorias") as HTMLUListElement;
  const categorias = getCategories();

  // Opcion "Todas" al inicio
  const liTodas = document.createElement("li");
  const linkTodas = document.createElement("a");
  linkTodas.href = "#";
  linkTodas.textContent = "Todas";
  linkTodas.addEventListener("click", (e: Event) => {
    e.preventDefault();
    categoriaActual = "Todas";
    aplicarFiltros();
  });
  liTodas.appendChild(linkTodas);
  lista.appendChild(liTodas);

  // Resto de categorias
  categorias.forEach((cat) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = cat.nombre;
    link.addEventListener("click", (e: Event) => {
      e.preventDefault();
      categoriaActual = cat.nombre;
      aplicarFiltros();
    });
    li.appendChild(link);
    lista.appendChild(li);
  });
};

// Aplicar filtros de categoria y busqueda
const aplicarFiltros = (): void => {
  let resultado = PRODUCTS;

  // Filtro por categoria
  if (categoriaActual !== "Todas") {
    resultado = resultado.filter((producto) => {
      // Recorrer las categorias del producto para ver si coincide
      for (let i = 0; i < producto.categorias.length; i++) {
        if (producto.categorias[i].nombre === categoriaActual) {
          return true;
        }
      }
      return false;
    });
  }

  // Filtro por texto de busqueda (se pueden combinar los filtros)
  if (textoBusqueda !== "") {
    const busquedaLower = textoBusqueda.toLowerCase();
    resultado = resultado.filter((producto) =>
      producto.nombre.toLowerCase().includes(busquedaLower)
    );
  }

  renderizarProductos(resultado);
};

// Buscador
const formBusqueda = document.getElementById("form-busqueda") as HTMLFormElement;
const inputBusqueda = document.getElementById("busqueda") as HTMLInputElement;

formBusqueda.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  textoBusqueda = inputBusqueda.value.trim();
  aplicarFiltros();
});

// Inicializar la pagina
cargarCategorias();
actualizarContadorCarrito();
aplicarFiltros();
