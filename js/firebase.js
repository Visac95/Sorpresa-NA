// Firebase.js

// Inicializar Firebase
const app = firebase.initializeApp({
  apiKey: "AIzaSyD9NDnhsl6-DNO2U1CfwUd1NPpurPPS7yQ",
  authDomain: "arasgift-3c88a.firebaseapp.com",
  databaseURL: "https://arasgift-3c88a-default-rtdb.firebaseio.com/",
  projectId: "arasgift-3c88a",
  storageBucket: "arasgift-3c88a.appspot.com",
  messagingSenderId: "293449174204",
  appId: "1:293449174204:web:de5c9ac40414c3463854b9",
  measurementId: "G-EL8GZNYZRY",
});

// Referencia a la base de datos
const database = firebase.database();

firebase.auth().signInAnonymously()


// Función global para enviar datos a Firebase
function enviarDatos(nombreUsuario, deviceID, fechaHora) {
  const user = firebase.auth().currentUser;
  if (!user) {
    //console.error("Usuario no autenticado todavía");
    return;
  }
  const nuevoRegistroRef = database.ref("registros").push();
  nuevoRegistroRef
    .set({
      nombre: nombreUsuario,
      deviceID: deviceID,
      fecha: fechaHora,
    })
    .then(() => {
      //console.log("Datos enviados correctamente a Firebase");
    })
    .catch((error) => {
      //console.error("Error al enviar los datos:", error);
    });
}
//console.log("Firebase.js Funcionando ✅");
