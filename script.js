const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl =  document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//array with words
const words = ['sigh','tense','airplane','ball', 'pies','juise', 'war','warlike','bad','north', 'dependent','stret','silver','high','superficial','quince','eight','feeble','admit','drag','loving','stretch','plants','sites','settings','time', 'game','score','button', 'Math','computer','phone','difficulty','storage','words'];


//init word
let randomWord;
//init score
let score = 0;
//init difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
//init time
let time = 10;
//focus on text
text.focus();


const timrInterval = setInterval(updateTime, 1000);


//generate random word from array
function getRandomWord(){
    return words [Math.floor(Math.random() * words.length)];
}

function addWordDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if(time == 0){
        clearInterval(timrInterval);
        gameOver();
    }
}
//game over
function gameOver(){
    endgameEl.innerHTML = `
      <h1> Time ran out</h1>
      <p>Your final score is ${score}</p>
      <button onclick= 'location.reload()'> Reload</button>
    `;
    endgameEl.style.display="flex";
    endgameEl.classList.add('container');
}

addWordDOM();

text.addEventListener('input', e =>{
    const insertedText = e.target.value;
    
    if(insertedText === randomWord){
        addWordDOM();
        updateScore();
        e.target.value ='';
        
        if(difficulty === 'hard'){
            time += 2;
        }else if(difficulty === 'medium'){
            time += 3;
        }else{
            time += 4;
        };

        updateTime();
    }
});
//settings btn click
settingsBtn.addEventListener('click',() =>
settings.classList.toggle('hide'));

settingsForm.addEventListener('change', e =>{
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})