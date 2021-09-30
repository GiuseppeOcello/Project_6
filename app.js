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
   return splitArr;
}
const phraseArray = getRandomPhraseAsArray(phrases);


function addPhraseToDisplay (arr) {
   console.log("I have been called");
   
   
   // let letter = li.textContent;
   for (let i=0; i <=arr.length; i++ ) {
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
qwerty.addEventListener('click', (e) => {
   
   let clickedButton = e.target;
   console.log(clickedButton.textContent);

   // It verifies that what is clicked is a button
   if (clickedButton.type === "submit") {
   clickedButton.className = 'chosen';
   clickedButton.disabled = 'true';
   }

   console.log(clickedButton.className);

   // calling the checkLetter Function
   checkLetter(clickedButton);

   function checkLetter (clickedButton) {
      let letters = document.querySelectorAll('.letter');
      for (let i = 0; letters.length; i++) {
         if (letters[i].textContent === clickedButton.textContent) {
            letters[i].classList.add("show");
            let letterFound = letters[i];
         } else {
            let scoreBoard = document.querySelectorAll('.tries img');
            console.log(scoreBoard);
            letterFound = null;
            missed += 1;
            console.log(missed);
            scoreBoard[missed-1].src = "images/lostHeart.png";

         }
      }
      // return letterFound;
   }

   // const score = document.querySelectorAll('.tries')
   // if (letterFound === null ) {
   //    missed += 1;

   // }

   // function checkWin () {


   // }
});