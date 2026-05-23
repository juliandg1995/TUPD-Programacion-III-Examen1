import type { IUser } from "../types/IUser";

// Obtener el array de usuarios registrados
export const getUsers = (): IUser[] => {
  const data = localStorage.getItem("users");
  if (!data) return [];
  return JSON.parse(data) as IUser[];
};

// Guardar un usuario nuevo en el array de "users"
export const saveUserToList = (user: IUser): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

// Guardar el usuario en sesion activa
export const saveSession = (user: IUser): void => {
  localStorage.setItem("userData", JSON.stringify(user));
};

// Obtener el usuario de la sesion activa
export const getSession = (): IUser | null => {
  const data = localStorage.getItem("userData");
  if (!data) return null;
  return JSON.parse(data) as IUser;
};

// Eliminar la sesion (logout)
export const removeSession = (): void => {
  localStorage.removeItem("userData");
};

// Crear un usuario admin por defecto si no existe ninguno
export const seedAdmin = (): void => {
  const users = getUsers();
  const adminExiste = users.find((u: IUser) => u.role === "admin");
  if (!adminExiste) {
    const admin: IUser = {
      email: "admin@foodstore.com",
      password: "admin123",
      role: "admin",
    };
    users.push(admin);
    localStorage.setItem("users", JSON.stringify(users));
  }
};
