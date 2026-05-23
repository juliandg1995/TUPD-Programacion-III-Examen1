// Representa un producto agregado al carrito
export interface CartItem {
  productId: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}
