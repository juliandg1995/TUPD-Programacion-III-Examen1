import { protegerRuta, logout } from "../../../main";
import { getCart, removeFromCart, clearCart, getCartTotal } from "../../../utils/cart";
import type { CartItem } from "../../../types/cart-item";

// Solo clientes pueden ver el carrito
protegerRuta("client");

// Logout
const btnLogout = document.getElementById("btn-logout") as HTMLAnchorElement;
btnLogout.addEventListener("click", (e: Event) => {
  e.preventDefault();
  logout();
});

// Renderizar el contenido del carrito
const renderizarCarrito = (): void => {
  const contenedor = document.getElementById("contenido-carrito") as HTMLElement;
  const cart = getCart();

  if (cart.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito esta vacio.</p>";
    actualizarTotal();
    return;
  }

  // Armar la tabla con los items del carrito
  let html = `
    <table class="tabla-carrito">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (let i = 0; i < cart.length; i++) {
    const item: CartItem = cart[i];
    const subtotal = item.precio * item.cantidad;
    html += `
      <tr>
        <td>${item.nombre}</td>
        <td>$${item.precio.toLocaleString("es-AR")}</td>
        <td>${item.cantidad}</td>
        <td>$${subtotal.toLocaleString("es-AR")}</td>
        <td><button class="btn-eliminar" data-id="${item.productId}">Eliminar</button></td>
      </tr>
    `;
  }

  html += "</tbody></table>";
  contenedor.innerHTML = html;

  // Agregar eventos a los botones de eliminar
  const botonesEliminar = contenedor.querySelectorAll(".btn-eliminar");
  botonesEliminar.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number((btn as HTMLButtonElement).dataset.id);
      removeFromCart(id);
      renderizarCarrito();
    });
  });

  actualizarTotal();
};

// Mostrar el total del carrito
const actualizarTotal = (): void => {
  const spanTotal = document.getElementById("total-carrito") as HTMLElement;
  const total = getCartTotal();
  spanTotal.textContent = `$${total.toLocaleString("es-AR")}`;
};

// Boton vaciar carrito
const btnVaciar = document.getElementById("btn-vaciar") as HTMLButtonElement;
btnVaciar.addEventListener("click", () => {
  if (confirm("Seguro que queres vaciar el carrito?")) {
    clearCart();
    renderizarCarrito();
  }
});

// Inicializar
renderizarCarrito();
