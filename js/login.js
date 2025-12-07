// login

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    if (usuario === "fran" && password === "1177") {
        window.location.href = "./pages/home.html";
        return false;
    } else {
        Swal.fire({
            icon: "error",
            title: "Usuario y/o contraseña incorrectos",
            showConfirmButton: false,
            timer: 2000
        });
        return false;
    }
})