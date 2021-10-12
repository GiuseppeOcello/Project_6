// Global Variables

let keyboard = document.querySelector('#qwerty');
let phrase = document.querySelector('#phrase ul');
let btn_start = document.querySelector('.btn__reset');
let scoreBoard = document.querySelectorAll('.tries img');
let overlay = document.querySelector("#overlay");

// Variable used to keep track of the points of the player
let missed = 0;

// Hides the overlay when the start button is clicked and
// refresh the page if the button says restart
btn_start.addEventListener('click', ()=> {

   btn_start.parentElement.style.display = 'none';

   if (btn_start.textContent !== 'Start Game') {
      location.reload();
   } 
});

// Phrases
const phrases = [
   'Italy has the shape of a boot',
   'The moon is gray',
   'The tallest mountain is Everest',
   'The biggest ocean is the Pacific Ocean',
   'The sun is big'
];

// Randomly picks on phrase from the phrases array
function getRandomPhraseAsArray (arr) {
   let randN = Math.floor(Math.random() * (arr.length - 0) ) + 0; 
   let splitArr = arr[randN].split("");
   return splitArr;
}

const phraseArray = getRandomPhraseAsArray(phrases);

// Displays blocks on the screen
function addPhraseToDisplay (arr) {
   
   for (let i=0; i <arr.length; i++ ) {
      const li = document.createElement('li');
      let letter = arr[i]; 
      li.textContent = letter;
      phrase.appendChild(li); 

      if (letter !== " ") {
         li.className = "letter";
      } else {
         li.className = "space";
      }
      
   }
   createHelp();
}

function createHelp () {
   const li = document.createElement('li');
   li.textContent = 'Hint';
   li.className = "hint";
   phrase.appendChild(li); 
}

// Calls the function to display the phrase 
addPhraseToDisplay(phraseArray);
let letters = document.querySelectorAll('.letter');

//## Listens for Buttom clicks and compares the letters with the random phrase 
keyboard.addEventListener('click', (e) => {
   
   let clickedButton = e.target;

   // It verifies that what is clicked is a button
   if (clickedButton.type === "submit") {
   clickedButton.className = 'chosen';
   clickedButton.disabled = 'true';
   }

   // calling the checkLetter Function
   checkLetter(clickedButton);

   function checkLetter (clickedButton) {
      
      let letterFound = 0;

      for (let i = 0; i < letters.length; i++) {
         let letter = letters[i];
      
         if (letter.textContent.toLocaleLowerCase() === clickedButton.textContent) {
            letter.classList.add("show");
            letterFound += 1;
         }       
      }
         if (letterFound == 0  && clickedButton.type == "submit") {
            letterFound = null;
            missed += 1;
            scoreBoard[missed-1].src = "images/lostHeart.png";
         }
   }
   
   checkWin(missed);
});

function checkWin (missed) {
   let show = document.querySelectorAll('.show');
   let title = document.querySelector(".title");

   const winningText = 'Yeah, You Won!';
   const losingText = 'Oops, You Lost. Try again.';

   function output (classN, overlayText) {
      overlay.classList.add(classN);
      title.innerHTML = overlayText;
      btn_start.textContent = 'Restart';
      overlay.style.display = 'flex';
   }

   if (show.length === letters.length) {
      output('win',winningText);
   } else if (missed > 4) {
      output('lose',losingText);
      let p = document.createElement('p');
      p.textContent = ` The Phrase was: "${phraseArray.join("")}"`;
      overlay.appendChild(p);
   }
}

