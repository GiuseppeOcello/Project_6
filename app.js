// Global Variables

let keyboard = document.querySelector('#qwerty');
let phrase = document.querySelector('#phrase ul');
let btn_start = document.querySelector('.btn__reset');
let scoreBoard = document.querySelectorAll('.tries img');
let overlay = document.querySelector("#overlay");

// Variable used to keep track of the points of the player
let missed = 0;

// Hides the overlay when the start button is clicked and refresh the page if the button says restart
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
   'The sun is huge'
];

// Randomly picks on phrase from the phrases array
function getRandomPhraseAsArray (arr) {
   let PhraseNumber = generateRandomNumber(arr.length); 
   let splitPhrase = arr[PhraseNumber].split("");
   return splitPhrase;
}

// Generates a random numbers given the upper and lower limits
function generateRandomNumber (upper, lower = 0) {
   let randomNumber = Math.floor(Math.random() * (upper - lower) ) + lower;
   return randomNumber;
}


// Reusable function to create new elements and append 
function createNewElement (elementName, property, value, appendTo) {
   element = document.createElement(elementName);
   element[property] = value;
   appendTo.appendChild(element);
}


// Displays the phrase as li blocks on the screen
function addPhraseToDisplay (arr) {
   
   for (let i=0; i <arr.length; i++ ) {
      let letter = arr[i];
      createNewElement('li','textContent', letter, phrase);  

      if (letter !== " ") {
         element.className = "letter";

      } else {
         element.className = "space";
      }
      
   }

   // create a hint button next to the lis
   createNewElement('button','textContent', 'Hint', phrase);
   element.className = "hint";
}

// Calls the functions to randomly select the phrase 
let phraseArray = getRandomPhraseAsArray(phrases);
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

// Checks if the player wins or loses and display the respective overlay screen with the button to restart
function checkWin (missed) {
   let show = document.querySelectorAll('.show');
   let title = document.querySelector(".title");

   // custom text for the overaly screen
   const winningText = 'Yeah, You Won!';
   const losingText = 'Oops, You Lost. Try again.';

   // reusable function that changes the content in the overlay screen
   function output (classToAssign, overlayText) {
      overlay.classList.add(classToAssign);
      title.innerHTML = overlayText;
      btn_start.textContent = 'Restart';
      overlay.style.display = 'flex';
   }

   //  compares if the number of letters with class .letter and .show are equal and define wether the player wins or not
   if (show.length === letters.length) {
      output('win',winningText);
   } else if (missed > 4) {
      output('lose',losingText);
      createNewElement('p','textContent', ` The Phrase was: "${phraseArray.join("")}"`, overlay);  
   }
}

let hint = document.querySelector(".hint");

// listen for clicks to the hint button and show few random letters
hint.addEventListener("click", () => {

      let lettersToShow = Math.ceil(phraseArray.length * 0.1);
      let i = 0;

      // Picks few random letters to show and hides the hint button
      while (i < lettersToShow) {
         let randomHint = generateRandomNumber(letters.length);
         let letterToShow = letters[randomHint];
         letterToShow.classList.add("show");
         i++;
      }
      hint.style.display = "none";

      // the hint remove one life
      missed += 1;
      scoreBoard[missed-1].src = "images/lostHeart.png";
});
