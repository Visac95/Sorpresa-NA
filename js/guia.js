//Codigo inicial
const submitBtn = document.getElementById("submitBtn");
const input = document.getElementById("nameInput");
const message = document.getElementById("message");
const overlay = document.getElementById("overlay");
const mensajeEspera = document.getElementById("mensajeEspera");
var value = "";
var nombreUser = value;
// GENERAR O RECUPERAR ID UNICO POR DISPOSITIVO
var deviceID = localStorage.getItem("deviceID");
var anchoVentana = window.innerWidth;
var altoVentana = window.innerHeight;

function daysUntil(targetDate) {
  const now = new Date();
  const diff = targetDate - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const target = new Date("2025-12-17T00:00:00");
const remainingDays = daysUntil(target);

//Boton de entrar presionado
submitBtn.addEventListener("click", () => {
  value = input.value.trim().toLowerCase();
  if (value === "su nombre") {
    const remainingDays = daysUntil(target);

    // 🔧 Define la fecha de inicio de construcción
    const startDate = new Date("2025-10-29"); // <-- cámbiala si quieres otra
    const today = new Date();

    // 🔢 Calcula cuántos días han pasado desde el inicio
    const msElapsed = today - startDate;
    const daysElapsed = Math.floor(msElapsed / (1000 * 60 * 60 * 24));

    // 🧱 Mensaje final
    message.innerHTML = `Sabidita has sido JAJJAJJ <br><br> ESTA PÁGINA SE ENCUENTRA EN CONSTRUCCIÓN.<br>
    YA LLEVA <b>${daysElapsed}</b> DÍAS DE TRABAJO Y AÚN NO ESTÁ LISTA.<br>
    ⏳ SE DESBLOQUEARÁ EN <b>${remainingDays}</b> DÍAS.
  `;
    overlay.style.display = "none";
    mensajeEspera.style.display = "block";

    cambioVentana("sizeValidation.html");
  } else {
    const remainingDays = daysUntil(target);

    // 🔧 Define la fecha de inicio de construcción
    const startDate = new Date("2025-10-29"); // <-- cámbiala si quieres otra
    const today = new Date();

    // 🔢 Calcula cuántos días han pasado desde el inicio
    const msElapsed = today - startDate;
    const daysElapsed = Math.floor(msElapsed / (1000 * 60 * 60 * 24));

    // 🧱 Mensaje final
    message.innerHTML = `
    🚧 ESTA PÁGINA SE ENCUENTRA EN CONSTRUCCIÓN.<br>
    YA LLEVA <b>${daysElapsed}</b> DÍAS DE TRABAJO Y AÚN NO ESTÁ LISTA.<br>
    ⏳ SE DESBLOQUEARÁ EN <b>${remainingDays}</b> DÍAS.
  `;
    overlay.style.display = "none";
    mensajeEspera.style.display = "block";
  }
  nombreUser = value;
  mostrarDatosUser();

  try {
    enviarDatos(nombreUser, deviceID, fechaActual());
  } catch (error) {
    console.log(error);
  }
});

//Cambiar fondo con flores

let petalCount;
const width = window.innerWidth;

if (width < 600) {
  petalCount = 20; // móvil
} else if (width < 1000) {
  petalCount = 37; // tablet
} else {
  petalCount = 60; // PC
}
function crearPetalos() {
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    document.body.appendChild(petal);

    resetPetal(petal);
  }
}

function resetPetal(petal) {
  const size = 10 + Math.random() * 25;
  const left = Math.random() * 100;
  const duration = 6 + Math.random() * 6;
  const delay = Math.random() * -duration; // empieza en distintos tiempos

  petal.style.width = `${size}px`;
  petal.style.height = `${size * 0.8}px`;
  petal.style.left = `${left}vw`;
  petal.style.animationDuration = `${duration}s`;
  petal.style.animationDelay = `${delay}s`;
}

//GENERA ID
function GenerarID() {
  if (!deviceID) {
    // Generar un ID simple único
    deviceID =
      "device-" +
      fechaActual() +
      "-uid" +
      Math.floor(Math.random() * 10000000) +
      dispositivo();
    localStorage.setItem("deviceID", deviceID);
  }
}

function mostrarDatosUser() {
  nombreUser = value;
  anchoVentana = window.innerWidth;
  altoVentana = window.innerHeight;
  //console.log("Nombre del usuario: ", nombreUser);
  //console.log("ID del dispositivo:", deviceID);
  //console.log("Fecha y hora local:", fechaActual());
}

function fechaActual() {
  // OBTENER FECHA Y HORA LOCAL
  var now = new Date(); // fecha actual
  var year = now.getFullYear();
  var month = String(now.getMonth() + 1).padStart(2, "0"); // meses empiezan en 0
  var day = String(now.getDate()).padStart(2, "0");
  var hours = String(now.getHours()).padStart(2, "0");
  var minutes = String(now.getMinutes()).padStart(2, "0");
  var seconds = String(now.getSeconds()).padStart(2, "0");

  // FORMATO LEIBLE: AAAA-MM-DD HH:MM:SS
  var formattedDate = `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

function dispositivo() {
  anchoVentana = window.innerWidth;
  altoVentana = window.innerHeight;
  if (anchoVentana <= 767) {
    return `-Telefono-${anchoVentana}-${altoVentana}`;
  } else if (anchoVentana <= 1024) {
    return `-Tablet-${anchoVentana}-${altoVentana}`;
  } else {
    return `-PC-${anchoVentana}-${altoVentana}`;
  }
}

window.onload = () => {
  document.title = `Aun faltan ${remainingDays} días`;
  crearPetalos();
  GenerarID();
};

function cambioVentana(ventana) {
  setTimeout(async () => {
    window.location.href = ventana;
  }, 5000);
}

//console.log("ID del dispositivo:", deviceID);
//console.log("Script Funcionando✅");
