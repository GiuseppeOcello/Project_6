// Global Variables

let keyboard = document.querySelector('#querty');
let phrase = document.querySelector('#phrase ul');
let btn_start = document.querySelector('.btn__reset');
let letters = document.querySelectorAll('.letter');

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
   
   let li = document.createElement("li");
   let letter = li.textContent;
   for (let i=0; i <=arr.lenght; i++ ) {
      
      letter = arr[i];
      if (letter.indexOf(' ') < 0) {
         li.className = "letter";
      }
      phrase.appendChild(li);
   }

}

addPhraseToDisplay(phraseArray);

console.log(phrase);

const buttons = document.querySelectorAll("#querty button");
// for (const button of buttons) {
qwerty.addEventListener('click', (e) => {
let clickedButton = e.target;
clickedButton.className = 'chosen';
clickedButton.disabled = 'true';

console.log(clickedButton.className);

checkLetter(clickedButton);


function checkLetter (clickedButton) {
   
   for (let i = 0; letters.length; i++) {
      if (letters[i].textContent === clickedButton) {
         letters[i].className = "show";

      }
   }
}
});