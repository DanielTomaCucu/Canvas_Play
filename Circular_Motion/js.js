const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth/2,
  y: innerHeight/2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

function randomIntRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Objects
class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y =y;
    this.radius = radius
    this.color = colors [Math.floor(Math.random() * colors.length)];
    this.radians =  Math.random() * Math.PI *2;
    this.velocity = 0.05;
    this.range = randomIntRange (50, 220);
    this.lastMouse = {x:x, y:y};
 

  this.draw = lastPotint => {
    c.beginPath()
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPotint.x, lastPotint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath()
  };

  this.update = () => {
    const lastPotint ={
        x: this.x,
        y: this.y
    }
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    this.radians += this.velocity;
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.range;
    this.y = this.lastMouse.y + Math.sin(this.radians) *  this.range;
    this.draw(lastPotint)
  }
}
};

// Implementation
let particles;
function init() {
  particles = [];

 

  for (let i = 0; i < 100; i++) {
    const radius = (Math.random() *3) +1;
    particles.push(new Particle(canvas.width /2, canvas.height /2, 2, radius));
  }
 
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  
  c.fillStyle   = 'rgba(255, 255, 255, 0.02)';
  c.fillRect(0,0,canvas.width, canvas.height);

  
   particles.forEach(particle => {
   particle.update()
   })
}

init()
animate()