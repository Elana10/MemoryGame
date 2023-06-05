const gameContainer = document.getElementById("game");
let scoreTile = document.getElementById('currentScore');
let guess1 = true;
let guess1Class = '';
let guess1Click;
let guess2 = false;
let guess2Class = '';
let guess2Click;
let score = 0;
let bestScoreExists = false;

if(localStorage.bestScore){
  bestScoreExists = true;
}

let bestScore = parseInt(localStorage.bestScore ||0);
let bestScoreDisplay = document.getElementById("bestScore");
bestScoreDisplay.innerText = bestScore;
let button = document.getElementById('restart');
let cardsFlipped = 0;


const IMAGES = [
  "img1",
  "img1",
  "img2",
  "img2",
  "img3",
  "img3",
  "img4",
  "img4",
  "img5",
  "img5",
  "img6",
  "img6",
  "img7",
  "img7",
  "img8",
  "img8",
  "img9",
  "img9",
  "img10",
  "img10",
  "img11",
  "img11",
  "img12",
  "img12"
  
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledImages = shuffle(IMAGES);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForImgs(imgArray) {
  for (let image of imgArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(image);
    newDiv.classList.add('hide');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  let clickedImg = event.target;
  let clickedImgClasses = Array.from(event.target.classList).join('');

  if(guess1 && guess1Class === ''){
    guess1Click = event.target;
    guess1Class = Array.from(event.target.classList).join(' ');
    guess1=false;
    clickedImg.classList.add('image');
    clickedImg.classList.remove('hide');
    score++;
  }
  else{
    if (clickedImgClasses.includes('hide') && guess2Class ===''){
      guess2Class = Array.from(event.target.classList).join(' ');
      clickedImg.classList.add('image');
      clickedImg.classList.remove('hide');
      guess1=true;    
      guess2Click = event.target;
      
      if (guess1Class === guess2Class){
        console.log('match');
        guess1Class ='';
        guess2Class = '';
        guess1 = true;
        cardsFlipped++;
        cardsFlipped++;
      } else {
        setTimeout(function(){
              guess1Click.classList.add('hide');
              guess2Click.classList.add('hide');
              guess1Click.classList.remove('image');
              guess2Click.classList.remove('image');
              guess1Class ='';
              guess2Class = '';
            }, 1000)
            }
    score++;
    }
  }
  
  if (!bestScoreExists){
    if(bestScore<score){
    bestScoreDisplay.innerText = score;
    
  }
  }

  scoreTile.innerText = score;
    // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  console.log(score);

  if(cardsFlipped === IMAGES.length){
    
    alert("Game Over!");
    localStorage.bestScore = score;
  };

  }

button.addEventListener("click", function(e){
  location.reload();
  localStorage.clear();
})
  

// when the DOM loads
createDivsForImgs(shuffledImages);
