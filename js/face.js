const video = document.getElementById("video");
const estado = document.getElementById("estado");

// 1. TUS FOTOS
const imagenesReferencia = [
    "./assets/faces/face.jpg",
    "./assets/faces/face0.jpg",       // Tu foto original
    "./assets/faces/face1.jpg",    // Nueva foto
    "./assets/faces/face2.jpg",      // Otra foto
    "./assets/faces/face3.jpg",
    "./assets/faces/face4.jpg",
    "./assets/faces/face5.jpg",
    "./assets/faces/face6.jpg",
    "./assets/faces/face7.jpg", 
];

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("./weights"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./weights"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./weights")
]).then(iniciar);

async function iniciar() {
    estado.innerText = "ACTIVANDO CAMARA...";
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            validarRostro();
        };
    } catch (error) {
        estado.innerText = "ERROR: CAMARA NO DISPONIBLE";
        console.error(error);
    }
}

// === CAMBIO IMPORTANTE AQUÍ ===
// Ahora guardamos cada descriptor con su propio nombre (etiqueta)
async function cargarReferencias() {
    const labeledDescriptors = [];
    estado.innerText = "CARGANDO BASE DE DATOS...";

    // Usamos el índice (i) para saber qué número de foto es
    for (let i = 0; i < imagenesReferencia.length; i++) {
        const rutaImagen = imagenesReferencia[i];
        
        try {
            const img = await faceapi.fetchImage(rutaImagen);
            const deteccion = await faceapi
                .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (deteccion) {
                // En lugar de meterlo a un grupo genérico, le damos nombre propio
                // Ejemplo: "foto_0", "foto_1"
                const nombreEtiqueta = `foto_${i}`; 
                
                const labeledDescriptor = new faceapi.LabeledFaceDescriptors(
                    nombreEtiqueta, 
                    [deteccion.descriptor]
                );
                
                labeledDescriptors.push(labeledDescriptor);
                console.log(`Cargada: ${nombreEtiqueta} (${rutaImagen})`);
            }
        } catch (error) {
            console.log(`Error en imagen ${rutaImagen}`);
        }
    }
    return labeledDescriptors;
}

async function validarRostro() {
    // Obtenemos la lista de etiquetas separadas
    const labeledDescriptors = await cargarReferencias();

    if (labeledDescriptors.length === 0) {
        estado.innerText = "ERROR: NO HAY REFERENCIAS";
        return;
    }

    estado.innerText = "ESCANEO DETALLADO...";

    // Creamos el Matcher con la lista de etiquetas individuales
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

    let contadorAciertos = 0;
    const aciertosNecesarios = 3; // Cuántas veces seguidas debe acertar

    const intervalId = setInterval(async () => {
        const deteccion = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (!deteccion) {
            estado.innerText = "NO VEO ROSTRO...";
            contadorAciertos = 0;
            return;
        }

        // Buscamos la mejor coincidencia
        const resultado = faceMatcher.findBestMatch(deteccion.descriptor);

        // === REPORTE EN CONSOLA (LO QUE PEDISTE) ===
        // Muestra: "Match: foto_1 | Distancia: 0.52"
        console.log(
            `Match: %c${resultado.label}`, 'color: cyan; font-weight: bold;', 
            `| Distancia: ${resultado.distance.toFixed(3)}`
        );

        // === VALIDACIÓN ===
        // Si el resultado NO es desconocido (es decir, es alguna de las fotos)
        // Y la distancia es aceptable
        if (resultado.label !== "unknown" && resultado.distance < 0.5) {
            
            contadorAciertos++;
            estado.innerText = `VERIFICADO CON ${resultado.label.toUpperCase()} (${contadorAciertos}/${aciertosNecesarios})`;
            estado.style.color = "yellow";

            if (contadorAciertos >= aciertosNecesarios) {
                clearInterval(intervalId);
                console.log("ACCESO AUTORIZADO GRACIAS A LA IMAGEN:", resultado.label);
                accesoPermitido();
            }

        } else {
            contadorAciertos = 0;
            estado.innerText = "ROSTRO DESCONOCIDO";
            estado.style.color = "red";
        }

    }, 500);
}

function accesoPermitido() {
    estado.innerText = "ACCESO PERMITIDO ✔";
    estado.style.color = "#00ff00";
    video.style.display = "none";
    
    document.body.innerHTML = `
        <div style="text-align:center; margin-top: 50px;">
            <h1>BIENVENIDO</h1>
        </div>
    `;
    setTimeout(() => { window.location.href = "gift.html"; }, 2000);
}