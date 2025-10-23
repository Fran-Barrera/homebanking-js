let usuario = "Francisco"
let saldo = 100000;
const contraseña = "1234";

iniciarSesion();

function iniciarSesion() {
  const pin = prompt("Ingrese su PIN de seguridad:");
  
  if (pin === contraseña) {
    console.log("Bienvenido", usuario, "al Banco Nacion");
    menu();
  } else {
    console.log("PIN incorrecto.");
  }
}

function menu() {
  let opcion;
  do {
    opcion = prompt(
      "Seleccione una opción:\n1. Consultar mi saldo\n2. Depositar dinero\n3. Transferir dinero\n4. Salir"
    );
    switch (opcion) {
      case "1":
        consultarSaldo();
        break;
      case "2":
        depositar();
        break;
      case "3":
        transferir();
        break;
      case "4":
        console.log("Gracias por usar nuestro servicio. ¡Hasta luego!");
        break;
      default:
        console.log("Opción no válida.");
    }
  }  while (opcion !== "4");
}

function consultarSaldo() {
  console.log("Su saldo actual es:", saldo);
}

function depositar() {
  const monto = parseFloat(prompt("Ingrese el monto a depositar:"));
  const confirmar = prompt("Seguro que desea depositar: $" + monto + " ?. si/no")
  if (confirmar == "si"){
    console.log("Depósito exitoso. Usted ha depositado: $", monto);
  } else {
    console.log("Operacion cancelada.");
  }
}

function transferir() {
  const destinatario = prompt("Ingrese alias o CVU del destinatario");
  const monto = parseFloat(prompt("Ingrese el monto a transferir:"));
  const confirmar = prompt("Seguro que desea transferir: $" + monto + " a " + destinatario + " ?. si/no")
  if (monto > saldo) {
    console.log("Fondos insuficientes.");
  } else if (confirmar == "si"){
    console.log("Transferencia exitosa. Usted ha transferido: $", monto, "a", destinatario);
  } else {
    console.log("Operacion cancelada");
  }
}