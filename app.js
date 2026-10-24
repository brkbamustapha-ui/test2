import * as THREE from "three";
import { RoomEnvironment } from "./vendor/RoomEnvironment.js";
import { INFO, MENU } from "./menu.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Contenu ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("info-address").textContent = INFO.address;
document.getElementById("info-hours").textContent = INFO.hours;
document.getElementById("maps-link").href = INFO.mapsUrl;
document.getElementById("maps-link-2").href = INFO.mapsUrl;
document.getElementById("ig-link").href = INFO.instagramUrl;
document.getElementById("map-frame").src = INFO.mapsEmbed;

const tabs = document.getElementById("menu-tabs");
const panel = document.getElementById("menu-panel");
const fmt = new Intl.NumberFormat("fr-FR");

function renderCategory(cat) {
  panel.innerHTML = `
    <div class="menu-cat-head"><h3>${cat.title}</h3><p>${cat.subtitle}</p></div>
    <div class="menu-items">
      ${cat.items.map((it, i) => `
        <div class="menu-item" style="animation-delay:${i * 70}ms">
          <div class="menu-item-top">
            <span class="menu-item-name">${it.name}${it.tag ? `<span class="menu-item-tag">${it.tag}</span>` : ""}</span>
            <span class="menu-item-dots"></span>
            <span class="menu-item-price">${fmt.format(it.price)}<small>${INFO.currency}</small></span>
          </div>
          ${it.desc ? `<p class="menu-item-desc">${it.desc}</p>` : ""}
        </div>`).join("")}
    </div>`;
  [...tabs.children].forEach((b) => b.setAttribute("aria-selected", b.dataset.id === cat.id));
}

MENU.forEach((cat) => {
  const b = document.createElement("button");
  b.className = "menu-tab";
  b.role = "tab";
  b.dataset.id = cat.id;
  b.textContent = cat.title;
  b.addEventListener("click", () => { renderCategory(cat); pulse = 1; });
  tabs.appendChild(b);
});
renderCategory(MENU[0]);

/* ---------- UI : nav, reveal, tilt, curseur ---------- */
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

const finePointer = window.matchMedia("(pointer: fine)").matches;
if (finePointer && !reduceMotion) {
  document.querySelectorAll(".tilt").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.transform = `rotateY(${(x - 0.5) * 14}deg) rotateX(${(0.5 - y) * 14}deg) translateZ(0)`;
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
  const glow = document.querySelector(".cursor-glow");
  window.addEventListener("mousemove", (e) => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; });
}

/* ---------- Scène 3D ---------- */
const GOLD = 0xc9b37e;
const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x123128);
scene.fog = new THREE.FogExp2(0x123128, 0.055);
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
camera.position.set(0, 0, 10);

scene.add(new THREE.AmbientLight(0x2a5a48, 0.6));
const key = new THREE.DirectionalLight(0xfff1cf, 2.2);
key.position.set(4, 5, 6);
scene.add(key);
const rim = new THREE.PointLight(GOLD, 30, 20);
rim.position.set(-4, -2, 3);
scene.add(rim);

const goldMat = new THREE.MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.22, envMapIntensity: 1.4 });

// Emblème du logo : quatre pétales en X, chacun formé de trois arcs imbriqués.
function lensCurve(len, width) {
  const pts = [];
  const n = 48;
  for (let i = 0; i <= n; i++) {
    const t = i / n, a = t * Math.PI;
    pts.push(new THREE.Vector3(Math.sin(a) * width, t * len, Math.sin(a) * width * 0.25));
  }
  for (let i = n - 1; i > 0; i--) {
    const t = i / n, a = t * Math.PI;
    pts.push(new THREE.Vector3(-Math.sin(a) * width, t * len, -Math.sin(a) * width * 0.25));
  }
  return new THREE.CatmullRomCurve3(pts, true);
}

const emblem = new THREE.Group();
const petals = [];
[45, 135, 225, 315].forEach((deg, p) => {
  const petal = new THREE.Group();
  [0.95, 0.62, 0.3].forEach((w, k) => {
    const geo = new THREE.TubeGeometry(lensCurve(2.1 - k * 0.05, w), 220, 0.045, 12, true);
    const mesh = new THREE.Mesh(geo, goldMat);
    mesh.position.z = (k - 1) * 0.06;
    petal.add(mesh);
  });
  petal.rotation.z = THREE.MathUtils.degToRad(deg);
  petal.userData.phase = p;
  petals.push(petal);
  emblem.add(petal);
});
const core = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 32), goldMat);
emblem.add(core);
scene.add(emblem);

// Anneaux flottants
const rings = [];
for (let i = 0; i < 3; i++) {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(3.3 + i * 0.55, 0.008, 8, 200), new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.35 - i * 0.08 }));
  ring.rotation.x = Math.PI / 2 + (i - 1) * 0.35;
  ring.rotation.y = i * 0.6;
  rings.push(ring);
  emblem.add(ring);
}

// Poussière d'or
const COUNT = window.innerWidth < 700 ? 900 : 2200;
const pos = new Float32Array(COUNT * 3), seeds = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  pos[i * 3] = (Math.random() - 0.5) * 30;
  pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
  pos[i * 3 + 2] = (Math.random() - 0.5) * 18 - 2;
  seeds[i] = Math.random();
}
const pGeo = new THREE.BufferGeometry();
pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
pGeo.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));
const pMat = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  uniforms: { uTime: { value: 0 }, uScroll: { value: 0 }, uColor: { value: new THREE.Color(GOLD) }, uPR: { value: renderer.getPixelRatio() } },
  vertexShader: `
    attribute float seed; uniform float uTime, uScroll, uPR; varying float vA;
    void main() {
      vec3 p = position;
      p.y = mod(p.y + uTime * (0.15 + seed * 0.25) + uScroll * 6.0 * (0.4 + seed) + 20.0, 40.0) - 20.0;
      p.x += sin(uTime * 0.5 + seed * 20.0) * 0.3;
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = (6.0 + seed * 14.0) * uPR / -mv.z;
      vA = 0.35 + 0.65 * sin(uTime * (1.0 + seed * 2.0) + seed * 30.0) * 0.5 + 0.3;
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: `
    uniform vec3 uColor; varying float vA;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      float a = smoothstep(0.5, 0.0, d);
      gl_FragColor = vec4(uColor, a * vA * 0.8);
    }`,
});
scene.add(new THREE.Points(pGeo, pMat));

// Interaction
const mouse = new THREE.Vector2(), smooth = new THREE.Vector2();
window.addEventListener("pointermove", (e) => {
  mouse.set(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5);
});
let scrollP = 0, scrollS = 0, pulse = 0, isMobile = false;
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollP = max > 0 ? window.scrollY / max : 0;
}, { passive: true });

function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  isMobile = w < 900;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);
resize();

const clock = new THREE.Clock();
let intro = 0;
function tick() {
  const t = clock.getElapsedTime();
  intro = Math.min(1, intro + 0.008);
  const e = 1 - Math.pow(1 - intro, 3);
  smooth.lerp(mouse, 0.05);
  scrollS += (scrollP - scrollS) * 0.06;
  pulse *= 0.94;

  const speed = reduceMotion ? 0 : 1;
  const baseX = isMobile ? 0 : 2.6;
  const baseY = isMobile ? 2.5 : 0;
  // Trajectoire au défilement : droite → gauche → centre
  const sx = baseX * Math.cos(scrollS * Math.PI * 2.2);
  emblem.position.set(sx, baseY - scrollS * (isMobile ? 2.5 : 1.2) + Math.sin(t * 0.8) * 0.12 * speed, -scrollS * (isMobile ? 16 : 3));
  emblem.rotation.set(
    smooth.y * 0.5 + Math.sin(t * 0.3) * 0.15 * speed,
    smooth.x * 0.8 + scrollS * Math.PI * 2 + t * 0.12 * speed,
    -scrollS * Math.PI * 0.5
  );
  emblem.scale.setScalar((isMobile ? 0.55 : 1) * (0.2 + 0.8 * e) * (1 + pulse * 0.08));

  petals.forEach((p) => {
    const s = 1 + Math.sin(t * 1.2 + p.userData.phase * 1.57) * 0.04 * speed + pulse * 0.15;
    p.scale.set(s, s, s);
  });
  rings.forEach((r, i) => { r.rotation.z += 0.002 * (i + 1) * (i % 2 ? -1 : 1) * speed; });

  rim.position.x = Math.sin(t * 0.6) * 5;
  rim.position.y = Math.cos(t * 0.4) * 3;

  camera.position.x += (smooth.x * 1.2 - camera.position.x) * 0.05;
  camera.position.y += (-smooth.y * 0.8 - camera.position.y) * 0.05;
  camera.lookAt(0, 0, 0);

  pMat.uniforms.uTime.value = t * speed;
  pMat.uniforms.uScroll.value = scrollS;

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();

window.addEventListener("load", () => setTimeout(() => document.body.classList.add("loaded"), 500));
// Filet de sécurité si "load" tarde (iframe de la carte)
setTimeout(() => document.body.classList.add("loaded"), 4000);
