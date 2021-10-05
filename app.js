// Global Variables

let keyboard = document.querySelector('#querty');
let phrase = document.querySelector('#phrase ul');
let btn_start = document.querySelector('.btn__reset');

// Variable used to keep track of the points of the player
let missed = 0;

// Hides the overlay when the start button is clicked
btn_start.addEventListener('click', ()=> {
   btn_start.parentElement.style.display = 'none';
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
   let rand = Math.floor(Math.random() * (arr.length - 0) ) + 0; 
   let splitArr = arr[rand].split("");
   console.log(splitArr);
   return splitArr;
}
const phraseArray = getRandomPhraseAsArray(phrases);


function addPhraseToDisplay (arr) {
   
   for (let i=0; i <arr.length; i++ ) {
      const li = document.createElement('li');
      let letter = arr[i];
      
      if (letter !== " ") {
         li.className = "letter";
      }

      li.textContent = letter;
      console.log(letter);
      phrase.appendChild(li);
   }

}

addPhraseToDisplay(phraseArray);

console.log(phrase);

const buttons = document.querySelectorAll("#querty button");
// for (const button of buttons) {

//## Listens for Buttom clicks and compares the letters with the random phrase 
qwerty.addEventListener('click', (e) => {
   
   let clickedButton = e.target;

   // It verifies that what is clicked is a button
   if (clickedButton.type === "submit") {
   clickedButton.className = 'chosen';
   clickedButton.disabled = 'true';
   }

   // calling the checkLetter Function
   checkLetter(clickedButton);

   function checkLetter (clickedButton) {
      let letters = document.querySelectorAll('.letter');
      let scoreBoard = document.querySelectorAll('.tries img');
      let letterFound = 0;
      console.log(clickedButton.textContent);
      for (let i = 0; i < letters.length; i++) {
         let letter = letters[i];
      
         if (letter.textContent.toLocaleLowerCase() === clickedButton.textContent) {
            letter.classList.add("show");
            letterFound += 1;
         }       
      }
      console.log(letterFound);
         if (letterFound == 0) {
            letterFound = null;
            missed += 1;
            console.log(scoreBoard[missed-1]);
            console.log(missed);
            scoreBoard[missed-1].src = "images/lostHeart.png";
         }
      // return letterFound;
   }

   
});