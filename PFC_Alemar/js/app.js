// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCUQH8CQj7D26ROXSOERxOKBppuCfDadvU",
    authDomain: "pedidos-frutas.firebaseapp.com",
    projectId: "pedidos-frutas",
    storageBucket: "pedidos-frutas.firebasestorage.app",
    messagingSenderId: "1070652973118",
    appId: "1:1070652973118:web:b1680e38651bef53bc716f",
    measurementId: "G-SP54NFMYYT"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// VARIABLES
let pedidos = [];
let pedidosPorPagina = 5;
let paginaActual = 1;

const frutasDisponibles = ["Naranja", "Banana", "Sandía", "Melón"];
const unidadesDisponibles = ["kg", "cajas", "unidades"];

// ===================== MODALES =====================
function mostrarModal(mensaje, titulo = "Información", callback = null) {
    document.getElementById("modalTexto").innerText = mensaje;
    const modal = document.getElementById("modal");
    modal.style.display = "flex";

    if (callback) {
        document.querySelector("#modal button").onclick = () => {
            cerrarModal();
            callback();
        };
    } else {
        document.querySelector("#modal button").onclick = cerrarModal;
    }
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

function mostrarConfirmModal(mensaje, onConfirm) {
    document.getElementById("confirmTexto").innerText = mensaje;
    document.getElementById("confirmModal").style.display = "flex";

    document.getElementById("confirmAceptar").onclick = () => {
        cerrarConfirmModal();
        onConfirm();
    };
}

function cerrarConfirmModal() {
    document.getElementById("confirmModal").style.display = "none";
}

// ===================== LOGIN =====================
function login() {
    const email = document.getElementById("usuario").value.toLowerCase();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        mostrarModal("Por favor ingresa usuario y contraseña.");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const doc = await db.collection("clientes").doc(user.uid).get();

            if (!doc.exists) {
                mostrarModal("Usuario sin datos.");
                return;
            }

            const data = doc.data();

            const esAdmin = email === "administracion@alemarsl.com";

            if (esAdmin) {
                document.getElementById("admin").style.display = "block";
                document.getElementById("login").style.display = "none";
                escucharPedidosFirestore();
            } else {
                document.getElementById("cliente").style.display = "block";
                document.getElementById("login").style.display = "none";

                document.getElementById("nombre").value = data.nombre;
                document.getElementById("empresa").value = data.empresa;
            }
        })
        .catch(() => mostrarModal("Error login"));
}

// ===================== LOGOUT =====================
function logout() {
    firebase.auth().signOut().then(() => {
        document.getElementById("login").style.display = "block";
        document.getElementById("admin").style.display = "none";
        document.getElementById("cliente").style.display = "none";
    });
}

// ===================== PEDIDOS =====================
async function hacerPedido() {
    const nombre = document.getElementById('nombre').value;
    const empresa = document.getElementById('empresa').value;
    const fechaEntrega = document.getElementById('fechaEntrega').value;

    if (!fechaEntrega) {
        mostrarModal("Falta fecha");
        return;
    }

    await db.collection("pedidos").add({
        nombre,
        empresa,
        fechaEntrega,
        fechaPedido: new Date().toISOString()
    });

    mostrarModal("Pedido realizado");
}

// ===================== FIRESTORE =====================
function escucharPedidosFirestore() {
    db.collection('pedidos').onSnapshot(snapshot => {
        pedidos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        actualizarListaPedidos();
    });
}

// ===================== UI =====================
function actualizarListaPedidos() {
    const contenedor = document.getElementById("listaPedidos");
    contenedor.innerHTML = "";

    pedidos.forEach(p => {
        const div = document.createElement("div");
        div.className = "pedido";
        div.innerHTML = `
            <strong>${p.empresa}</strong>
            <em>${p.fechaEntrega}</em>
        `;
        contenedor.appendChild(div);
    });
}

// ===================== INIT =====================
function init() {
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            document.getElementById("login").style.display = "block";
        }
    });
}

document.addEventListener('DOMContentLoaded', init);