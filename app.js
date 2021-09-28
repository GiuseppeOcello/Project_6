// Global Variables

let keyboard = document.querySelector('#querty');
let phrase = document.querySelector('phrase');
let btn_start = document.querySelector('.btn__reset');
const ul = document.querySelector("#phrase ul");

let missed = 0;

btn_start.addEventListener('click', ()=> {
   btn_start.parentElement.style.display = 'none';
});

const phrases = [
   'Italy has the shape of a boot',
   'The moon is gray',
   'The tallest mountain is Everest',
   'The biggest ocean is the Pacific Ocean',
   'The sun is bigs'
];

function getRandomPhraseAsArray (arr) {
   let rand = Math.floor(Math.random() * (arr.length - 0) ) + 0;
   let splitArr = arr[rand].split();
   return splitArr;
}

const phraseArray = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay (arr) {
   
   let li = document.createElement("li");
   for (let i=0; i <=arr.lenght; i++ ) {
      let letter = li.textContent;
      letter = arr[i];
      if (letter.indexOf(' ') < 0) {
         li.className = "letter";
      }
      ul.appendChild("li");
   }

}

addPhraseToDisplay(phraseArray);

const buttons = document.querySelectorAll("#querty button");
// for (const button of buttons) {
//    button.addEventListener('click', () => {


//    });
 
function checkLetter (clickedButton) {
   let letters = document.querySelectorAll(".letter");
   for (let i = 0; letters.length; i++) {
      if (letters[i] === 1) {
         letters[i].className = "show";

      }
   }
}
