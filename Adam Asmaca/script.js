const word = document.getElementById("word");
const gameInfo = document.getElementById("gameInfo");
const popup = document.getElementById("popup");
const wrongLettersElement = document.getElementById("wrongLettersElement");
const allWordsGet = document.getElementById("allWordsGet");
const allWordsContainer = document.getElementById("allWordsContainer");
const displayAllWords = document.getElementById("displayAllWords");
const addWord = document.getElementById("addWord");


const LocalStorageWords = [
  "javascript",
  "react",
  "angular",
  "vue",
  "node",
  "express",
];

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getLocalRandomWord();

function pushLocalStorage() {
  localStorage.setItem(
    "words",
    JSON.stringify(LocalStorageWords).toLowerCase()
  );
}



function getLocalRandomWord() {
  return JSON.parse(localStorage.getItem("words"))[
    Math.floor(Math.random() * JSON.parse(localStorage.getItem("words")).length)
  ];
}

function displayWord() {
  word.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
      <div class="letter">
        ${correctLetters.includes(letter) ? letter : "*"}
      </div>
    `
      )
      .join("")}
  `; winGame();
    
 

}

function winGame() {
    const innerWord = word.innerText.replace(/\n/g, "");
    if (innerWord === selectedWord) {
      popup.innerHTML = `<h2 id="popupMessageTitle">Tebrikler Kazandınız..</h2>
                <button id="playButton" onclick="location.reload()">Tekrar Oyna</button>
      `;
      popup.style.display = "flex";
    }
}


function gameOver() {
    popup.innerHTML = `<h2 id="popupMessageTitle">Malesef Kaybettiniz..</h2>
    <button id="playButton" onclick="location.reload()">Yeni Oyun</button>
    <h4 id="correctWordMessage">Doğru kelime: ${selectedWord}</h4>
`;
popup.style = "display:flex; background-color:red;";
}

let hp = 5;

function hpUpdate() {

    if (hp > 0) {
      hp--;
        if (hp === 0) {
          gameOver();
        }
        gameInfo.innerHTML = `Kalan Can: ${hp}`;
    }

}


function displayWrongLetters() {
  wrongLettersElement.innerHTML = `
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
}


function keydownEvent(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key.toLowerCase();
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        alert("Bu harfi zaten kullandınız.");
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        displayWrongLetters();
        hpUpdate();
      } else {
        alert("Bu harfi zaten kullandınız.");
      }
    }
  }
}


function displayAllWordsList() {

    displayAllWords.innerHTML = `
        ${JSON.parse(localStorage.getItem("words"))
        .map((word, index) => `${index + 1}. ${word} <button class="deleteWord" onclick="deleteWordfunc(${index})">Delete</button> <button class="editWord" onclick="editWordfunc(${index})">Edit</button>`)
        .join("")}
    `;
    

}

allWordsGet.addEventListener("click", () => {
  allWordsContainer.style.display = "flex";
  displayAllWordsList();
});


function addWordToLocalStorage() {
    const newWord = prompt("Lütfen eklemek istediğiniz kelimeyi girin:");

    if (newWord) {
        LocalStorageWords.push(newWord.toLowerCase());
        pushLocalStorage();
        selectedWord = newWord.toLowerCase();
        displayAllWordsList(); 
        displayWord();
    } else {
        alert("Lütfen bir kelime girin.");
    
    }
    
}


addWord.addEventListener("click", () => {
    addWordToLocalStorage();
    displayWord();
});


function deleteWordfunc(index) {
    if ( index> -1){
        LocalStorageWords.splice(index, 1);
       localStorage.setItem("words", JSON.stringify(LocalStorageWords));
    }
    displayAllWordsList();

}


function editWordfunc(index) {
    const editWord = prompt("Lütfen kelimeyi düzenleyin:");
    if (editWord) {
        LocalStorageWords.splice(index, 1, editWord.toLowerCase());
        pushLocalStorage();
        displayAllWordsList();
    } else {
        alert("Lütfen bir kelime girin.");
    }
}








displayWord();
window.addEventListener("keydown", keydownEvent);


