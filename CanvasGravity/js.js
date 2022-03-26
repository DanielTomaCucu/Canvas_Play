


const canvas = document.getElementById('canvas');
canvas.width =  window.innerWidth;
canvas.height =  window.innerHeight;
const ctx = canvas.getContext('2d');

let maxNumber = 500;
let gravity = 1;
  const colorArr =[
    '#2c3e50',
    '#e74c3c',
    '#ecf0f1',
    '#3498db',
    '#2980b8'
]  

const mouse ={
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove',(e) =>{
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener('resize', () =>{
    canvas.width =  window.innerWidth;
    canvas.height =  window.innerHeight;
    init();
})

function Bubble (x,y,dx, dy, size){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.color = colorArr [Math.floor(Math.random() * colorArr.length)];
    this.maxS = size;
    this.draw =  function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2, false );
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    this.collision = function(){
        if(this.x + this.size > innerWidth || this.x - this.size < 0){
            this.dx = - this.dx;
        }
        if(this.y + this.size + this.dy> innerHeight || this.y - this.size < 0){
            this.dy = -this.dy * 0.8 ;
        }else{
            this.dy += gravity;
        }
        this.x += this.dx;
        this.y += this.dy;

            if( mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
                if(this.size < 30){
                    this.size += 1;
                }
            }else if(this.size > this.maxS){
                this.size -= 1;
            }
        

        this.draw();
    }
}
console.log(Bubble);


let bubbleArr = [];

function init(){
    bubbleArr = [];
for( let i = 0; i < maxNumber; i++ ){
    let size = Math.random() * 25 +5;
    let x = Math.random() * (innerWidth - size * 2) + size;
    let y = Math.random() * (innerHeight - size * 2) + size;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;
    bubbleArr.push(new Bubble(x,y,dx,dy,size));
}
}


// const bubble = new Bubble( 200, 200, 5, 5, 20);

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);

    for(let i = 0; i< bubbleArr.length; i++){
        bubbleArr[i].collision();
    }
}
init();
animate();
