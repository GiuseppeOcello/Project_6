// Global Variables

let keyboard = document.querySelector('#querty');
let phrase = document.querySelector('phrase');
let btn_start = document.querySelector('.btn__reset');

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
   let rand = Math.floor(Math.random() * (arr.lenght - 0) ) + 0;
   


}

