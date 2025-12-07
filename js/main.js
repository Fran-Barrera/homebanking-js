// saldo - tranferencias - nuevo movimiento

let saldoDisponible = 200000;

function actualizarSaldo() {
    const saldoElemento = document.getElementById("saldoInicial");
    saldoElemento.textContent = `$${saldoDisponible.toLocaleString()}`;
}

actualizarSaldo();

const transferenciaForm = document.getElementById("transferenciaForm");
let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

const hoy = new Date().toISOString().split('T')[0];
document.getElementById('fecha').value = hoy;

transferenciaForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const monto = document.getElementById("monto").value;
    const destinatario = document.getElementById("destinatario");
    const descripcion = document.getElementById("descripcion").value;

    if (monto <= 0) {
        Swal.fire({
            icon: "error",
            title: "Ingrese un monto valido",
            showConfirmButton: false,
            timer: 2000
        });
        return;
    } else if (monto > saldoDisponible) {
        Swal.fire({
            icon: "error",
            title: "Saldo insuficiente",
            showConfirmButton: false,
            timer: 1500
        });
        return;
    } else {
        Swal.fire({
            icon: "success",
            title: `Se enviaron $${monto} a ${destinatario.value}`,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Descargar comprobante",
            cancelButtonText: "Finalizar",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Comprobante descargado", "", "success");
            }
        });
    }

    saldoDisponible -= monto;
    actualizarSaldo();

    const nuevoMovimiento = {
        fecha: hoy,
        descripcion: descripcion,
        monto: monto
    };

    movimientos.push(nuevoMovimiento);
    renderizarMovimientos(movimientos);

    transferenciaForm.reset();
    document.getElementById('fecha').value = hoy;
});

// movimientos

const movimientosContenedor = document.getElementById("movimientos");
const URL = "../db/data.json";

function mostrarMovimientos() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            movimientos = data;
            renderizarMovimientos(data)
        })
        .catch(err => console.log("Error al cargar json", err))
        .finally(() => console.log("finalizo la peticion"))
}

function renderizarMovimientos(movimientos) {
    movimientosContenedor.innerHTML = "";
    movimientos.forEach(mov => {
        let lista = document.createElement("div");
        lista.innerHTML = `
                    ${mov.fecha} -
                    ${mov.descripcion} -
                    $${mov.monto}`;
        movimientosContenedor.appendChild(lista);
    });
}

mostrarMovimientos();
