

const canvas =  document.getElementById('canvas');
canvas.width =  window.innerWidth;
canvas.height =  window.innerHeight;
const ctx = canvas.getContext('2d');

const maxRadius = 40;

const mouse ={
    x: undefined,
    y: undefined
}

//bubbles colors
const colorArr =[
    '#2c3e50',
    '#e74c3c',
    '#ecf0f1',
    '#3498db',
    '#2980b8'
]
window.addEventListener('mousemove', (e) =>{
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener('resize' ,() => {
    canvas.width =  window.innerWidth;
    canvas.height =  window.innerHeight;  
    init();
})

//constructor for bubbles
function Ball (x,y,dx,dy,size){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy; 
    this.size = size;
    this.minRadius = size;
    this.color =  colorArr [Math.floor(Math.random() *colorArr.length)];

    //create bubble
    this.draw= function(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size, 0 , Math.PI *2, false);
        ctx.strokeStyle= 'blue';
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    //wall collision
    this.move= function(){

        if(this.x + this.size > innerWidth || this.x - this.size < 0){
            this.dx = -this.dx;
        }if(this.y + this.size > innerHeight || this.y - this.size < 0){
            this.dy = -this.dy;
        }

        this.x +=this.dx;
        this.y +=this.dy;

        if(mouse.x - this.x < 50  
            && mouse.x - this.x > - 50
            && mouse.y - this.y < 50
            && mouse.y - this.y > -50)
            {
                if(this.size < maxRadius)
                { this.size +=1; }
            }else if(this.size > this.minRadius){
            this.size -=1;
        }
      
        this.draw();
    }
}
let ballArr = [];

//init the bubles every times when the window is resized
function init(){
    ballArr =[];

     //intercativity
     for(let i = 0; i < 900; i++ ){
        let size = Math.random() * 4 + 1;
        let x = Math.random() * (innerWidth - size *2) +size;
        let y = Math.random() * (innerHeight - size *2) +size;
        let dx = (Math.random() -0.5) *3;
        let dy = (Math.random() -0.5) *3;
        ballArr.push(new Ball(x,y,dx,dy,size));
    }
    
}
        

function animate(){
    requestAnimationFrame(animate);
   ctx.clearRect(0,0,innerWidth, innerHeight);
    
    for(let i =0; i < ballArr.length; i++){
        ballArr[i].move();
    }
}
init();
animate();









































