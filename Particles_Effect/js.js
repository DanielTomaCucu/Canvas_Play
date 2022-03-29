const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width= window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse ={
    x: null,
    y: null,
    radius: ((canvas.height/120) * (canvas.width/120))
}
window.addEventListener('mousemove', function (e){
    mouse.x = e.x;
    mouse.y = e.y;
    console.log(mouse);
});

class Particles {
    constructor (x,y,dx,dy, size, color){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
    }
    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2)
        ctx.fillStyle='#000';
        ctx.fill();
    }
    update(){
        if( this.x > canvas.width || this.x < 0){
            this.dx= - this.dx;
        }
        if(this.y > canvas.height || this.y < 0 ){
            this.dy = - this.dy;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance= Math.sqrt(dx * dx + dy* dy);


        if( distance < mouse.radius + this.size){
            if( mouse.x < this.x && this.x < canvas.width - this.size *10){
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size *10){
                this.x -=10;
            }
            if( mouse.y < this.y && this.y < canvas.height - this.size *10){
                this.y += 10;
            }
            if(mouse.y > this.x && this.y > this.size *10){
                this.y -=10;
            }

        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function init(){
    particlesArray =[];
    let numberOfParticles =(canvas.height * canvas.width) / 9000;
    for ( let i = 0; i < numberOfParticles; i++){
        let size = (Math.random() *5) +1;
        let x =(Math.random()* ((innerWidth - size *2) - (size *2)) + size *2);
        let y =(Math.random()* ((innerHeight - size *2) - (size *2)) + size *2);
        let dx = (Math.random() *5) - 2.5;
        let dy = (Math.random() *5) - 2.5;
        let color ='#000';

        particlesArray.push(new Particles(x,y,dx,dy,size,color));
    } 
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for( let i =0; i< particlesArray.length; i++){
        particlesArray[i].update();
    }
    connect();
}



function connect(){
    let opacity = 1;
    for ( let a= 0; a<particlesArray.length; a++){
        for(let b=a; b<particlesArray.length; b ++){
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if( distance < (canvas.width/7) * (canvas.height/7)){
                opacity =1 - (distance/19000);
                ctx.strokeStyle = ' rgba(0,0,0, '+ opacity + ')' ;
                ctx.lineWIdth  = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', () =>{
    canvas.width= window.innerWidth;
   canvas.height = window.innerHeight;    
   mouse.radius = ((canvas.height/120) * (canvas.width/120));
   init();
})
window.addEventListener('mouseout', ()=>{
    mouse.x = undefined;
    mouse.y = undefined;
});
init();
animate();