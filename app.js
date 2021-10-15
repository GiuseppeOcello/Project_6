// Global Variables

let keyboard = document.querySelector('#qwerty');
let phrase = document.querySelector('#phrase ul');
let btn_start = document.querySelector('.btn__reset');
let scoreBoard = document.querySelectorAll('.tries img');
let overlay = document.querySelector("#overlay");
let splitPhrase;
let lettersToShow;
let letters;
let hint;


// Variable used to keep track of the points of the player
let missed = 0;

// Hides the overlay when the start button is clicked and refresh the page if the button says restart
btn_start.addEventListener('click', ()=> {

   btn_start.parentElement.style.display = 'none';
   addPhraseToDisplay(getRandomPhraseAsArray(phrases));
   
   if (btn_start.textContent !== 'Start Game') {

         missed = 0;
         letterFound = 0;
         let chosen = document.querySelectorAll('.chosen');
         
         for (let i = 0; i < scoreBoard.length; i++) {
            scoreBoard[i].src = "images/liveHeart.png";
         }
      
         let child =  phrase.lastElementChild; 
         while (child) {
            phrase.removeChild(child);
            child = phrase.lastElementChild;
         }
      
         for (let i = 0; i < chosen.length; i++) {
            chosen[i].classList.remove('chosen');
            chosen[i].disabled = false;
         }  

         // reset the overlay screen
         overlay.lastChild.remove();
         overlay.classList.remove('win', 'lose');

         // reset global variables
         letters = "";
         clickedButton = "";
         lettersToShow = ''; 
      
         addPhraseToDisplay(getRandomPhraseAsArray(phrases));

   } 
});

// Phrases
const phrases = [
   'Italy has the shape of a boot',
   'The moon is gray',
   'The tallest mountain is Everest',
   'The biggest ocean is the Pacific Ocean',
   'The sun is huge',
   'Europa is the smallest moon orbiting Jupiter',
   'The deepest place on earth is the trench of Mariana',
   'The CPU is the hearth of a computer',
   'The capital of Australia is Camberra',
   'JavaScript is awesome',
   'Computers speak in binary language',
   'The greatest invention in mothern age is the Transistor',
   'Russia is the largest conutry on earth',
   'The Canary Islands are named after dogs'
];

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

// Randomly picks on phrase from the phrases array
function getRandomPhraseAsArray (arr) {
   let PhraseNumber = generateRandomNumber(arr.length); 
   splitPhrase = arr[PhraseNumber].split("");
   return splitPhrase;
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

   letters = document.querySelectorAll('.letter');

   // create a hint button next to the lis
   createNewElement('button','textContent', 'Hint', phrase);
   element.className = "hint";

   hint = document.querySelector(".hint");
   lettersToShow = Math.ceil(arr.length * 0.1);
}

function showHint () {

   let i = 0;

   // Picks few random letters to show and hides the hint button
   while (i < lettersToShow) {
      let randomHint = generateRandomNumber(letters.length);
      letterToShow = letters[randomHint];
      letterToShow.classList.add("show");
      i++;
   }
   hint.style.display = "none";

   // the hint removes one life
   missed += 1;
   scoreBoard[missed-1].src = "images/lostHeart.png";

}

// listens for the click of the hint button
document.addEventListener("click", (e) => {
   if (e.target.className == "hint") {
      showHint();
   }
});


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

   // Checks if the letter clicked by the player matches some of the letter in the phrase and shows them to the screen
   // It also increment the missed variable and changes the icons in the score boards to lost
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
      createNewElement('p','textContent', ` The Phrase was: "${splitPhrase.join("")}"`, overlay);  
   }
}

