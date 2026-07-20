/* ═══════════════════════════════════════════════
   TOPAZE PRESTIGE — interactions
   ═══════════════════════════════════════════════ */

/* ── Grille tarifaire (à ajuster librement) ──
   priseEnCharge : € au départ
   parKm         : € par kilomètre
   minimum       : prix minimum d'une course */
const TARIFS = {
  "bmw-serie-7":       { priseEnCharge: 30, parKm: 3.0, minimum: 70 },
  "mercedes-classe-v": { priseEnCharge: 25, parKm: 2.8, minimum: 65 },
  "sprinter-vip":      { priseEnCharge: 40, parKm: 3.5, minimum: 100 },
  "gold-wing":         { priseEnCharge: 20, parKm: 2.0, minimum: 40 },
};

/* ── Navigation ── */
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  nav.classList.toggle("nav--scrolled", window.scrollY > 30);
}, { passive: true });

burger.addEventListener("click", () => {
  burger.classList.toggle("nav__burger--open");
  navLinks.classList.toggle("nav__links--open");
});

navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    burger.classList.remove("nav__burger--open");
    navLinks.classList.remove("nav__links--open");
  })
);

/* ── Estimation en direct ── */
const form = document.getElementById("bookingForm");
const vehiculeSelect = document.getElementById("vehicule");
const distanceInput = document.getElementById("distance");
const estimateValue = document.getElementById("estimateValue");
const confirmBox = document.getElementById("bookingConfirm");

function updateEstimate() {
  if (vehiculeSelect.value === "autre") {
    estimateValue.textContent = "Sur devis";
    return;
  }
  const tarif = TARIFS[vehiculeSelect.value];
  const km = parseFloat(distanceInput.value);
  if (!tarif || !km || km <= 0) {
    estimateValue.textContent = "— €";
    return;
  }
  const prix = Math.max(tarif.priseEnCharge + km * tarif.parKm, tarif.minimum);
  estimateValue.textContent = Math.round(prix) + " €";
}

vehiculeSelect.addEventListener("change", updateEstimate);
distanceInput.addEventListener("input", updateEstimate);

/* Date minimale = aujourd'hui */
const dateInput = document.getElementById("date");
dateInput.min = new Date().toISOString().split("T")[0];

/* ── Soumission : récapitulatif par e-mail ── */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const vehiculeLabel = vehiculeSelect.options[vehiculeSelect.selectedIndex].text;

  const lignes = [
    "Bonjour Topaze Prestige,",
    "",
    "Je souhaite réserver une course :",
    "• Départ : " + data.get("depart"),
    "• Arrivée : " + data.get("arrivee"),
    "• Date : " + data.get("date") + " à " + data.get("heure"),
    "• Véhicule : " + vehiculeLabel,
    "• Passagers : " + data.get("passagers"),
    data.get("distance") ? "• Distance estimée : " + data.get("distance") + " km" : null,
    estimateValue.textContent !== "— €" ? "• Estimation affichée : " + estimateValue.textContent : null,
    "",
    "Merci de me confirmer la disponibilité.",
  ].filter(Boolean);

  confirmBox.hidden = false;
  confirmBox.scrollIntoView({ behavior: "smooth", block: "nearest" });

  window.location.href =
    "mailto:topazeprestige@gmail.com" +
    "?subject=" + encodeURIComponent("Réservation VTC — Topaze Prestige") +
    "&body=" + encodeURIComponent(lignes.join("\n"));
});

/* ── Boutons « Réserver ce véhicule » : pré-sélection ── */
document.querySelectorAll("[data-select]").forEach((btn) => {
  btn.addEventListener("click", () => {
    vehiculeSelect.value = btn.dataset.select;
    updateEstimate();
  });
});

/* ── Photos des véhicules : affichées si présentes dans assets/flotte/ ── */
document.querySelectorAll(".car-card__photo").forEach((img) => {
  const activate = () => img.closest(".car-card").classList.add("car-card--has-photo");
  img.addEventListener("load", activate);
  img.addEventListener("error", () => img.remove());
  if (img.complete && img.naturalWidth > 0) activate();
});

/* ── Photo chauffeur : locale → Unsplash → placeholder ── */
const chauffeurPhoto = document.getElementById("chauffeurPhoto");
const PHOTO_FALLBACK =
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop";

chauffeurPhoto.addEventListener("error", () => {
  if (chauffeurPhoto.src !== PHOTO_FALLBACK) {
    chauffeurPhoto.src = PHOTO_FALLBACK;
  } else {
    chauffeurPhoto.closest(".savoir__photo").classList.add("savoir__photo--placeholder");
  }
});

/* ── Apparition au défilement ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal--visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ── Compteurs animés (section savoir-faire) ── */
const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    counterObserver.unobserve(entry.target);

    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const decimals = el.dataset.count.includes(".") ? 1 : 0;
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toLocaleString("fr-FR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}, { threshold: 0.5 });

counters.forEach((el) => counterObserver.observe(el));

/* ── Particules dorées ── */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initParticles() {
  const count = Math.min(Math.floor(window.innerWidth / 18), 90);
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.6 + 0.4,
    vx: (Math.random() - 0.5) * 0.18,
    vy: -Math.random() * 0.25 - 0.05,
    a: Math.random() * 0.5 + 0.15,
    tw: Math.random() * Math.PI * 2,
  }));
}

function drawParticles(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.y < -6) { p.y = canvas.height + 6; p.x = Math.random() * canvas.width; }
    if (p.x < -6) p.x = canvas.width + 6;
    if (p.x > canvas.width + 6) p.x = -6;

    const twinkle = 0.6 + 0.4 * Math.sin(t / 900 + p.tw);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(212, 175, 55, " + (p.a * twinkle).toFixed(3) + ")";
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
resizeCanvas();
if (!reduceMotion) {
  initParticles();
  requestAnimationFrame(drawParticles);
}
window.addEventListener("resize", () => {
  resizeCanvas();
  if (!reduceMotion) initParticles();
});
