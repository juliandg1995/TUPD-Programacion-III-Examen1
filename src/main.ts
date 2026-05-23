import type { Rol } from "./types/Rol";
import { getSession, removeSession } from "./utils/localStorage";
import { navigate } from "./utils/navigate";

// Protege una pagina verificando sesion activa y rol correcto
export const protegerRuta = (rolRequerido: Rol): void => {
  const user = getSession();

  // Si no hay sesion, redirigir al login
  if (!user) {
    navigate("/src/pages/auth/login/login.html");
    return;
  }

  // Si el rol no coincide, redirigir a la zona correcta
  if (user.role !== rolRequerido) {
    if (user.role === "admin") {
      navigate("/src/pages/admin/home/home.html");
    } else {
      navigate("/src/pages/store/home/home.html");
    }
  }
};

// Cerrar sesion y redirigir al login
export const logout = (): void => {
  removeSession();
  navigate("/src/pages/auth/login/login.html");
};
