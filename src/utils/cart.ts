import type { CartItem } from "../types/cart-item";
import type { Product } from "../types/product";

const CART_KEY = "carrito";

// Leer el carrito desde localStorage
export const getCart = (): CartItem[] => {
  const data = localStorage.getItem(CART_KEY);
  if (!data) return [];
  return JSON.parse(data) as CartItem[];
};

// Guardar el carrito en localStorage
const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Agregar un producto al carrito (si ya existe, suma cantidad)
export const addToCart = (producto: Product): void => {
  const cart = getCart();

  const existente = cart.find((item) => item.productId === producto.id);

  if (existente) {
    existente.cantidad = existente.cantidad + 1;
  } else {
    const nuevoItem: CartItem = {
      productId: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1,
    };
    cart.push(nuevoItem);
  }

  saveCart(cart);
};

// Eliminar un item del carrito por su productId
export const removeFromCart = (productId: number): void => {
  const cart = getCart();
  const filtrado = cart.filter((item) => item.productId !== productId);
  saveCart(filtrado);
};

// Vaciar todo el carrito
export const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
};

// Calcular el total del carrito
export const getCartTotal = (): number => {
  const cart = getCart();
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].precio * cart[i].cantidad;
  }
  return total;
};

// Contar cuantos items hay en el carrito
export const getCartCount = (): number => {
  const cart = getCart();
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    count = count + cart[i].cantidad;
  }
  return count;
};
