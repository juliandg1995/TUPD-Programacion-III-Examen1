import type { IUser } from "../types/IUser";
import { getUsers, saveSession } from "./localStorage";

// Buscar un usuario por email y password en el array de "users"
export const loginUser = (email: string, password: string): IUser | null => {
  const users = getUsers();
  const found = users.find(
    (u: IUser) => u.email === email && u.password === password
  );
  if (!found) return null;
  saveSession(found);
  return found;
};
