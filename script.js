const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
}

const revealElements = document.querySelectorAll(
  ".section, .feature-panel, .stat-box, .soft-card, .project-card, .timeline-card, .skill-card, .hero-side-card, .blog-hero-card, .cyber-profile-card, .design-board-main, .dev-code-card, .visual-card-main, .floating-note, .notice-banner"
);

revealElements.forEach((el) => el.classList.add("reveal"));

function revealOnScroll() {
  revealElements.forEach((el) => {
    const rectTop = el.getBoundingClientRect().top;
    const winHeight = window.innerHeight;

    if (rectTop < winHeight - 90) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ProFTPD slider */
const slider = document.querySelector("[data-slider]");

if (slider) {
  const slides = slider.querySelectorAll(".slide");
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");
  const dots = document.querySelectorAll(".dot");
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    current = index;
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const next = (current + 1) % slides.length;
      showSlide(next);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const prev = (current - 1 + slides.length) % slides.length;
      showSlide(prev);
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.slide);
      showSlide(index);
    });
  });

  showSlide(0);
}
/* ------------------------------------------------------------------ */
/* PAGE LOAD ANIMATIONS                                                */
/* ------------------------------------------------------------------ */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

/* ------------------------------------------------------------------ */
/* DESIGN PAGE :: 3D scene parallax (mouse-driven)                     */
/* ------------------------------------------------------------------ */
const tiltScene = document.querySelector("[data-tilt]");
if (tiltScene) {
  const wrap = tiltScene.parentElement;
  let raf = null;
  let tx = 0, ty = 0;

  function onMove(e) {
    const rect = wrap.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;
    tx = x * 14;
    ty = -y * 14;
    if (!raf) raf = requestAnimationFrame(apply);
  }
  function apply() {
    tiltScene.style.transform = `rotateY(${tx}deg) rotateX(${ty}deg)`;
    raf = null;
  }
  function onLeave() {
    tx = 0; ty = 0;
    if (!raf) raf = requestAnimationFrame(apply);
  }

  wrap.addEventListener("mousemove", onMove);
  wrap.addEventListener("mouseleave", onLeave);
}

/* ------------------------------------------------------------------ */
/* DESIGN PAGE :: per-card tilt for projects                            */
/* ------------------------------------------------------------------ */
document.querySelectorAll("[data-tilt-card]").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) - 0.5;
    const y = ((e.clientY - r.top) / r.height) - 0.5;
    card.style.transform = `translateY(-6px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ------------------------------------------------------------------ */
/* DESIGN PAGE :: bento card hover shine follow                         */
/* ------------------------------------------------------------------ */
document.querySelectorAll(".bento-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    card.style.setProperty("--mx", `${mx}%`);
    card.style.setProperty("--my", `${my}%`);
  });
});

/* ------------------------------------------------------------------ */
/* DEVELOPMENT PAGE :: contribution heatmap generator                   */
/* ------------------------------------------------------------------ */
const heatmap = document.querySelector(".activity-heatmap");
if (heatmap) {
  const cols = 26;
  const rows = 7;
  const total = cols * rows;
  // Pseudo-random but deterministic pattern: more activity in mid-range
  function levelFor(i) {
    const phase = Math.sin(i * 0.31) * 0.5 + Math.sin(i * 0.07 + 1.2) * 0.3 + 0.4;
    const noise = ((i * 9301 + 49297) % 233280) / 233280; // deterministic
    const v = phase + noise * 0.6;
    if (v < 0.45) return 0;
    if (v < 0.70) return 1;
    if (v < 0.90) return 2;
    if (v < 1.05) return 3;
    return 4;
  }
  const frag = document.createDocumentFragment();
  for (let i = 0; i < total; i++) {
    const cell = document.createElement("div");
    const lvl = levelFor(i);
    cell.className = "cell" + (lvl > 0 ? " l" + lvl : "");
    frag.appendChild(cell);
  }
  heatmap.appendChild(frag);
}
