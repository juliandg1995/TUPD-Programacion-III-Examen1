import { loginUser } from "../../../utils/auth";
import { seedAdmin } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

// Sembrar usuario admin por defecto al cargar el login
seedAdmin();

const form = document.getElementById("form-login") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const email = inputEmail.value.trim();
  const password = inputPassword.value;

  const user = loginUser(email, password);

  if (!user) {
    alert("Email o contrasena incorrectos.");
    return;
  }

  // Redirigir segun el rol del usuario encontrado
  if (user.role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else {
    navigate("/src/pages/store/home/home.html");
  }
});
