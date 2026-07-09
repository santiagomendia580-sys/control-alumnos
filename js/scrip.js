const boton = document.getElementById("btnEntrar");

boton.addEventListener("click", function () {
    const usuario = document.getElementById("usuario").value.trim();
    const contraseña = document.getElementById("contraseña").value.trim();

    if (usuario === "Admin" && contraseña === "123456") {
        alert("Bienvenido al sistema de control de alumnos");
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
});
