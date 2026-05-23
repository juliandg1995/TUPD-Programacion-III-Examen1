import type { IUser } from "../../../types/IUser";
import { getUsers, saveUserToList } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form-registro") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const email = inputEmail.value.trim();
  const password = inputPassword.value;

  // Verificar que no exista un usuario con el mismo email
  const users = getUsers();
  const existe = users.find((u: IUser) => u.email === email);

  if (existe) {
    alert("Ya existe un usuario con ese email.");
    return;
  }

  // Crear el usuario con rol "client" por defecto
  const nuevoUsuario: IUser = {
    email: email,
    password: password,
    role: "client",
  };

  saveUserToList(nuevoUsuario);
  alert("Registro exitoso. Ahora podes iniciar sesion.");
  navigate("/src/pages/auth/login/login.html");
});
