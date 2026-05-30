const scenes = [...document.querySelectorAll(".scene")];
const progressFill = document.querySelector(".progress-fill");
const nextButtons = document.querySelectorAll("[data-next]");
const restartButton = document.querySelector("[data-restart]");
const envelopeButton = document.querySelector("[data-open-envelope]");
const heartField = document.querySelector(".heart-field");

// Cambia esta fecha por el dia real en que Amira llego a tu vida.
const relationshipStartDate = "2022-01-01";

// Reemplaza este texto por la carta completa cuando la tengas lista.
const letterText = `
Amira,<br><br>
Para la mujer que cambió algo hermoso dentro de mí

Mi amor,

Hay muchas cosas que quisiera decirte, pero ninguna palabra parece suficiente para expresar todo lo que siento por ti.

Desde que llegaste a mi vida, algo dentro de mí cambió. No fue de repente, ni como en las historias perfectas que cuentan los libros. Fue más profundo. Poco a poco te convertiste en alguien indispensable para mis pensamientos, para mis sonrisas y para mis sueños.

Quiero que sepas algo que tal vez no te digo lo suficiente: tu felicidad es importante para mí.

Me importa cómo te sientes cuando nadie te ve. Me importan tus preocupaciones, tus miedos, tus inseguridades y también esos sueños que guardas en silencio. Me importa todo aquello que forma parte de ti, porque te amo por completo, no solo por tus mejores momentos.

No te amo porque seas perfecta.

Te amo porque eres tú.

Porque detrás de tu sonrisa existe una persona maravillosa, fuerte, sensible y especial. Porque incluso en los días en que dudas de ti misma, sigues teniendo una luz capaz de iluminar la vida de quienes te rodean.

Admiro muchas cosas de ti. Tu forma de pensar. Tu manera de sentir. La pasión que pones en las cosas que te importan. Tu capacidad de seguir adelante incluso cuando las circunstancias no son fáciles.

Y aunque tal vez no lo notes, tú también me has ayudado a crecer.

Me has hecho querer ser una mejor persona. Me has hecho reflexionar sobre quién soy y quién quiero llegar a ser. No porque me lo hayas pedido, sino porque tu presencia en mi vida me inspira a dar lo mejor de mí.

Quiero ser alguien que te dé tranquilidad.

Quiero ser ese lugar donde puedas descansar cuando el mundo te canse.

Quiero ser la persona que te escuche cuando necesites hablar y que permanezca a tu lado cuando no encuentres palabras.

No puedo prometer que todo será perfecto. La vida nunca funciona así.

Pero sí puedo prometerte que mis sentimientos son sinceros.

Que seguiré eligiéndote cada día.

Que seguiré intentando comprenderte.

Que seguiré esforzándome por hacerte sentir querida, valorada y amada.

Porque cuando pienso en el futuro, una de las imágenes más bonitas que aparecen en mi mente es verte sonreír y saber que, de alguna manera, contribuí a esa sonrisa.

Y si algún día llegas a olvidar lo especial que eres, espero que vuelvas a leer esta carta.

Para que recuerdes que existe alguien que ve en ti mucho más de lo que tú misma alcanzas a ver.

Alguien que te admira.

Alguien que cree en ti.

Alguien que desea verte cumplir cada uno de tus sueños.

Y sobre todo, alguien que te ama con todo su corazón.

Je t'aime, Amira, de tout mon cœur. ❤️

Con todo mi amor,

Tu compañero, tu admirador y la persona que siempre deseará verte feliz.<br><br>
Quiero que esta carta guarde algo de lo que siento por ti: la paz que me das,
la ternura con la que iluminas mis días y esa forma tan tuya de hacer que el
mundo se sienta más bonito.<br><br>
Gracias por inspirarme a crecer, por hacerme querer ser mejor y por existir
con esa luz que, entre millones de estrellas, siempre reconocería.
`;

const memories = [
  {
    image: "assets/memory-1.jpg.jpeg",
    title: "Nuestro cielo",
    text: "Un lugar suave para guardar lo bonito."
  },
  {
    image: "assets/memory-2.jpg.jpeg",
    title: "Tu sonrisa",
    text: "Ese detalle pequeño que puede cambiarme el día."
  },
  {
    image: "assets/memory-3.jpg.jpeg",
    title: "Lo que viene",
    text: "Un futuro lleno de calma, cariño y sueños compartidos."
  }
];

let currentScene = 0;
let typedInstance = null;
let memoryIndex = 0;
let heartsStarted = false;

function initParticles() {
  tsParticles.load("tsparticles", {
    fullScreen: { enable: false },
    detectRetina: true,
    particles: {
      number: { value: 105, density: { enable: true, area: 900 } },
      color: { value: ["#ffffff", "#f472b6", "#fb7185"] },
      shape: { type: "circle" },
      opacity: {
        value: { min: 0.18, max: 0.9 },
        animation: { enable: true, speed: 0.7, minimumValue: 0.16 }
      },
      size: { value: { min: 0.7, max: 2.7 } },
      links: {
        enable: true,
        distance: 130,
        color: "#ffffff",
        opacity: 0.08,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.35,
        direction: "none",
        outModes: { default: "out" }
      }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        resize: true
      },
      modes: {
        repulse: { distance: 80, duration: 0.4 }
      }
    }
  });
}

function updateProgress() {
  progressFill.style.width = `${((currentScene + 1) / scenes.length) * 100}%`;
}

function animateSceneIn(scene) {
  const content = scene.querySelector(".scene-content, .letter-wrap");
  gsap.fromTo(
    content,
    { y: 28, opacity: 0, scale: 0.98 },
    { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
  );

  if (scene.classList.contains("scene-cards")) {
    gsap.fromTo(
      ".emotion-card",
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out" }
    );
  }

  if (scene.classList.contains("scene-letter")) {
    startTypedLetter();
  }

  if (scene.classList.contains("scene-counter")) {
    updateDaysCounter();
  }

  if (scene.classList.contains("scene-final")) {
    startHearts();
  }
}

function goToScene(index) {
  const nextIndex = Math.max(0, Math.min(index, scenes.length - 1));
  const previousScene = scenes[currentScene];
  const nextScene = scenes[nextIndex];

  if (previousScene === nextScene) {
    return;
  }

  gsap.to(previousScene, {
    opacity: 0,
    duration: 0.55,
    ease: "power2.inOut",
    onComplete: () => {
      previousScene.classList.remove("is-active");
      nextScene.classList.add("is-active");
      currentScene = nextIndex;
      updateProgress();
      animateSceneIn(nextScene);
    }
  });
}

function startTypedLetter() {
  if (typedInstance) {
    typedInstance.destroy();
  }

  typedInstance = new Typed("#typed-letter", {
    strings: [letterText],
    typeSpeed: 18,
    startDelay: 250,
    showCursor: true,
    cursorChar: "|"
  });
}

function openEnvelope() {
  const envelope = envelopeButton.querySelector(".envelope");
  const flap = envelope.querySelector(".envelope-flap");
  const letter = envelope.querySelector(".letter-preview");
  const seal = envelope.querySelector(".seal");

  playSoftChime();

  gsap.timeline({ defaults: { ease: "power3.out" } })
    .to(seal, { scale: 0, opacity: 0, duration: 0.28 })
    .to(flap, { rotateX: 178, duration: 0.76 }, "<")
    .to(letter, { y: -92, duration: 0.86 }, "-=0.28")
    .to(envelope, { y: -12, scale: 1.03, duration: 0.42 }, "-=0.56")
    .to(envelope, { opacity: 0, y: -42, duration: 0.5, delay: 0.42 })
    .call(() => goToScene(4));
}

function playSoftChime() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    return;
  }

  const context = new AudioContext();
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.14, context.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1.3);
  gain.connect(context.destination);

  [523.25, 659.25, 783.99].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, context.currentTime + index * 0.08);
    oscillator.connect(gain);
    oscillator.start(context.currentTime + index * 0.08);
    oscillator.stop(context.currentTime + 1.2 + index * 0.08);
  });
}

function renderMemory() {
  const memory = memories[memoryIndex];
  const image = document.querySelector("#memory-image");
  const title = document.querySelector("#memory-title");
  const text = document.querySelector("#memory-text");

  gsap.to(".memory-frame", {
    opacity: 0,
    y: 12,
    duration: 0.2,
    onComplete: () => {
      image.src = memory.image;
      title.textContent = memory.title;
      text.textContent = memory.text;
      document.querySelectorAll(".gallery-dots button").forEach((dot, index) => {
        dot.classList.toggle("is-active", index === memoryIndex);
      });
      gsap.to(".memory-frame", { opacity: 1, y: 0, duration: 0.36, ease: "power2.out" });
    }
  });
}

function buildGalleryDots() {
  const dotsWrap = document.querySelector("[data-gallery-dots]");

  memories.forEach((memory, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver recuerdo: ${memory.title}`);
    dot.addEventListener("click", () => {
      memoryIndex = index;
      renderMemory();
    });
    dotsWrap.appendChild(dot);
  });

  renderMemory();
}

function updateDaysCounter() {
  const start = new Date(`${relationshipStartDate}T00:00:00`);
  const today = new Date();
  const diff = today - start;
  const days = Math.max(0, Math.floor(diff / 86400000));
  const countElement = document.querySelector("#days-count");

  gsap.fromTo(
    countElement,
    { textContent: 0 },
    {
      textContent: days,
      duration: 2,
      ease: "power2.out",
      snap: { textContent: 1 }
    }
  );
}

function startHearts() {
  if (heartsStarted) {
    return;
  }

  heartsStarted = true;
  setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = "♡";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${16 + Math.random() * 24}px`;
    heartField.appendChild(heart);

    gsap.to(heart, {
      y: -window.innerHeight - 80,
      x: gsap.utils.random(-45, 45),
      opacity: 0,
      rotate: gsap.utils.random(-18, 18),
      duration: gsap.utils.random(4.2, 7),
      ease: "sine.out",
      onComplete: () => heart.remove()
    });
  }, 420);
}

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    goToScene(currentScene + 1);
  });
});

envelopeButton.addEventListener("click", openEnvelope, { once: true });

restartButton.addEventListener("click", () => {
  currentScene = 0;
  scenes.forEach((scene, index) => {
    scene.classList.toggle("is-active", index === 0);
    gsap.set(scene, { opacity: index === 0 ? 1 : 0 });
  });
  updateProgress();
  animateSceneIn(scenes[0]);
});

document.querySelector("[data-gallery-prev]").addEventListener("click", () => {
  memoryIndex = (memoryIndex - 1 + memories.length) % memories.length;
  renderMemory();
});

document.querySelector("[data-gallery-next]").addEventListener("click", () => {
  memoryIndex = (memoryIndex + 1) % memories.length;
  renderMemory();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && currentScene !== 3) {
    goToScene(currentScene + 1);
  }

  if (event.key === "ArrowLeft") {
    goToScene(currentScene - 1);
  }
});

initParticles();
buildGalleryDots();
updateProgress();
animateSceneIn(scenes[0]);
