const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

// Générer des points pour un grand cœur
function generateHeartPoints(n) {
  let points = [];
  for (let i = 0; i < n; i++) {
    let t = (i / n) * Math.PI * 2;
    let x = 16 * Math.pow(Math.sin(t), 3);
    let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    points.push({ x: x, y: y });
  }
  return points;
}

class Particle {
  constructor(x, y, targetX, targetY) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.size = Math.max(15, Math.min(canvas.width, canvas.height) / 40);
    this.speed = 0.02 + Math.random() * 0.03;
  }
  
  draw() {
    ctx.font = `${this.size}px Arial`;
    ctx.fillText("❤️", this.x, this.y);
  }
  
  update() {
    this.x += (this.targetX - this.x) * this.speed;
    this.y += (this.targetY - this.y) * this.speed;
    this.draw();
  }
}

function createParticles() {
  particles = [];
  let heartPoints = generateHeartPoints(250);
  
  let scale = Math.min(canvas.width, canvas.height) / 25;
  let offsetX = canvas.width / 2;
  let offsetY = canvas.height / 2;
  
  for (let i = 0; i < heartPoints.length; i++) {
    // Les cœurs partent du bas à gauche (personnage gauche) ou du bas à droite (personnage droit)
    let startX = Math.random() < 0.5 ? 80 : canvas.width - 80;
    let startY = canvas.height - 100;
    
    let targetX = heartPoints[i].x * scale + offsetX;
    let targetY = heartPoints[i].y * scale + offsetY;
    
    particles.push(new Particle(startX, startY, targetX, targetY));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
  requestAnimationFrame(animate);
}

createParticles();
animate();

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});