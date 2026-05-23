# Food Store — Evaluación 1 · Programación III

**Alumno:** Julián Daniel Gómez  
**Materia:** Programación III · Tecnicatura Universitaria en Programación (TUP)  
**Año:** 2026

---

## Descripción

Food Store es una aplicación web de tienda de comidas construida con **Vite + TypeScript**. Implementa un flujo completo de usuario que incluye autenticación, catálogo de productos con búsqueda y filtrado por categoría, y un carrito de compras con persistencia en `localStorage`.

El proyecto parte de una base con el sistema de autenticación ya implementado (login, registro y protección de rutas por rol) y extiende esa base con las funcionalidades del parcial.

---

## Video explicativo

> [Ver video en YouTube](https://youtu.be/Yc9GWQKn9EY)

---

## Funcionalidades implementadas

| Historia de usuario | Descripción |
|---|---|
| HU-P1-01 | Búsqueda de productos por nombre (coincidencia parcial, sin distinguir mayúsculas) |
| HU-P1-02 | Filtrado por categoría desde el sidebar (combinable con la búsqueda) |
| HU-P1-03 | Agregar productos al carrito, acumulando cantidades si el producto ya existe |
| HU-P1-04 | Visualización del carrito en tabla con precio unitario, cantidad y subtotal |
| HU-P1-05 | Cálculo del total del carrito, actualizado en tiempo real ante cada cambio |

### Funcionalidades adicionales
- **Persistencia del carrito:** los datos se mantienen al refrescar la página gracias a `localStorage`.
- **Protección de rutas:** redirige al login si el usuario no está autenticado, y al panel correspondiente según el rol (`admin` / `client`).
- **Eliminación individual** de ítems del carrito y **vaciado completo** con confirmación.
- **Usuario admin por defecto** creado automáticamente al cargar la app por primera vez.

---

## Tecnologías utilizadas

| Tecnología | Versión | Rol |
|---|---|---|
| [TypeScript](https://www.typescriptlang.org/) | ~5.8 | Lenguaje principal (tipado estático) |
| [Vite](https://vitejs.dev/) | ^7.1 | Build tool y servidor de desarrollo |
| HTML5 | — | Estructura de las páginas |
| CSS3 | — | Estilos (sin frameworks externos) |
| `localStorage` | API nativa | Persistencia de sesión y carrito |

---

## Arquitectura del proyecto

```
src/
├── main.ts                         ← protegerRuta() y logout() (compartidos por todas las páginas)
├── style.css                       ← Estilos globales
├── vite-env.d.ts
│
├── types/
│   ├── Rol.ts                      ← Type alias: "client" | "admin"
│   ├── IUser.ts                    ← Interface de usuario
│   ├── IProduct.ts                 ← Interface de producto (base)
│   ├── product.ts                  ← Interface Product (con categorías como objetos)
│   ├── category.ts                 ← Interface ICategory
│   └── cart-item.ts                ← Interface CartItem
│
├── data/
│   └── data.ts                     ← Array PRODUCTS (20 productos) y getCategories()
│
├── utils/
│   ├── auth.ts                     ← loginUser()
│   ├── localStorage.ts             ← CRUD de usuarios y sesión en localStorage
│   ├── navigate.ts                 ← Función navigate()
│   └── cart.ts                     ← addToCart, removeFromCart, clearCart, getCartTotal, getCartCount
│
└── pages/
    ├── auth/
    │   ├── login/                  ← Formulario de inicio de sesión
    │   └── registro/               ← Formulario de registro (rol "client" por defecto)
    ├── admin/
    │   └── home/                   ← Panel de administración (tabla de productos)
    ├── client/
    │   └── home/                   ← Redirección automática a store/home
    └── store/
        ├── home/                   ← Catálogo: grid de productos, buscador, sidebar de categorías
        └── cart/                   ← Carrito: tabla de ítems, total, eliminar, vaciar
```

### Flujo de navegación

```
index.html
    └── /src/pages/auth/login/login.html
            ├── rol admin  → /src/pages/admin/home/home.html
            └── rol client → /src/pages/store/home/home.html
                                ├── Sidebar: filtrar por categoría
                                ├── Buscador: filtrar por nombre
                                └── /src/pages/store/cart/cart.html
                                        ├── Tabla de ítems + subtotales
                                        ├── Total acumulado
                                        ├── Eliminar ítem / Vaciar carrito
                                        └── Seguir Comprando → store/home
```

### Decisiones de diseño destacadas

- **`import type`** para importar interfaces: no genera código JS en el bundle final (`verbatimModuleSyntax` activado en `tsconfig.json`).
- **`aplicarFiltros()`** centraliza los dos filtros (categoría + texto) sobre el array original. Se encadenan en lugar de ser independientes, lo que permite combinarlos.
- **`addToCart()`** usa `.find()` para detectar si el producto ya existe en el carrito y suma la cantidad en lugar de duplicar el ítem.
- **`saveCart()` no exportada**: la escritura directa al carrito queda encapsulada; el resto del código solo puede modificar el carrito a través de `addToCart`, `removeFromCart` y `clearCart`.
- **`getCategories()`** en lugar de exportar el array directamente, para poder filtrar categorías eliminadas antes de devolverlas.

---

## Instalación y ejecución

### Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- [npm](https://www.npmjs.com/) (incluido con Node.js) o [pnpm](https://pnpm.io/)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/juliandg1995/TUPD-Programacion-III-Examen1.git
cd TUPD-Programacion-III-Examen1

# 2. Instalar dependencias
npm install
# o con pnpm:
pnpm install

# 3. Iniciar el servidor de desarrollo
npm run dev
# o con pnpm:
pnpm dev

# 4. Abrir en el navegador
# http://localhost:5173
```

### Usuarios de prueba

| Rol | Email | Contraseña |
|---|---|---|
| Admin | `admin@foodstore.com` | `admin123` |
| Cliente | Registrar desde la página de registro | — |

> El usuario admin se crea automáticamente la primera vez que se carga la app.

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción (TypeScript + Vite) |
| `npm run preview` | Vista previa del build de producción |
