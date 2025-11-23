const starsContainer = document.getElementById("stars-container");
const starCount = 100; // Cantidad de estrellas

for (let i = 0; i < starCount; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  // Posición aleatoria
  const x = Math.random() * 100;
  const y = Math.random() * 100;

  // Tamaño aleatorio (pequeñas para móviles)
  const size = Math.random() * 2 + 1; // 1px a 3px

  // Animación aleatoria
  const duration = Math.random() * 3 + 2; // 2s a 5s
  const delay = Math.random() * 2;

  star.style.left = `${x}%`;
  star.style.top = `${y}%`;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.setProperty("--duration", `${duration}s`);
  star.style.setProperty("--delay", `${delay}s`);

  starsContainer.appendChild(star);
}

// 2. Lógica de las Lunas
window.onload = () => {
  const scene = document.getElementById("scene");

  // Esperar el tiempo solicitado (3 a 4 segundos)
  setTimeout(() => {
    // Añadir la clase 'merged' inicia la transición CSS
    // Modificamos el estilo inline para asegurar el movimiento al centro

    const topMoon = document.querySelector(".moon-top");
    const bottomMoon = document.querySelector(".moon-bottom");

    // En lugar de clases complejas, forzamos las coordenadas al centro
    // para asegurar que se junten exactamente.

    // Luna de arriba baja al centro
    topMoon.style.top = "50%";
    topMoon.style.transform = "translate(-50%, -50%)";

    // Luna de abajo sube al centro
    bottomMoon.style.bottom = "50%";
    bottomMoon.style.transform = "translate(-50%, 50%)"; // 50% positivo para contrarrestar su altura

    // Truco visual: Cuando se tocan, hacemos que brillen más
    setTimeout(() => {
      topMoon.style.boxShadow = "0 0 120px 60px rgba(255, 255, 255, 0.8)";
      // Ocultamos la de abajo suavemente para que parezca una fusión perfecta
      bottomMoon.style.opacity = "0";
    }, 3000); // Un poco antes de que termine el movimiento de 4s
  }, 1000); // 3000ms = 3 segundos de espera inicial
};

// Función Abrir Carta
function openGift() {
  const card = document.querySelector(".glass-card");
  const btn = document.getElementById("giftBtn");
  const title = document.querySelector(".title-text");

  card.classList.add("expanded");
  //btn.style.opacity = "0";
  btn.style.display = "none";
  btn.style.pointerEvents = "none";
  title.style.transform = "scale(0.8) translateY(-10px)";
  title.style.transition = "all 0.8s ease";

  setTimeout(() => {
    //btn.style.display = "none";
    btn.style.opacity = "0";
  }, 1000);
}