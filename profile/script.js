const searchButton = document.getElementById("searchButton");
const searchWord = document.getElementById("searchWord");
const profileContainer = document.getElementById("profileContainer");
let inputWord;
let searcWordArray = [];

window.onload = function () {
  const storedWords = localStorage.getItem("searchWord");
  if (storedWords) {
    searcWordArray = JSON.parse(storedWords);
    console.log(searcWordArray);
  }
};

searchButton.addEventListener("click", () => {
  inputWord = searchWord.value;
  searcWordArray.push(inputWord);
  console.log(searcWordArray);
  localStorageWords();
  getOneSection(inputWord);
    GetTwoSection(inputWord);
    getSearchHistory();

  oneSection(data);
    twoSection(data);
    
});

function localStorageWords() {
  localStorage.setItem("searchWord", JSON.stringify(searcWordArray));
}

const deleteHistory = document.getElementById("deleteHistory");

function deleteLocalStorage() {
  localStorage.removeItem("searchWord");
  searcWordArray = [];
  console.log(searcWordArray);
}

function getOneSection(inputWord) {
  fetch(`https://api.github.com/users/${inputWord}`)
    .then((Response) => {
      if (Response.ok) {
        return Response.json();

      }
      throw new Error("Bağlantı başarısız.");
    })
    .then((data) => {
      oneSection(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function GetTwoSection(inputWord) {
  fetch(`https://api.github.com/users/${inputWord}/repos`)
    .then((Response) => {
      if (Response.ok) {
        return Response.json();
      }
      throw new Error("Bağlantı başarısız.");
    })
    .then((data) => {
      twoSection(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function twoSection(data) {
    const allRepos = document.getElementById("allRepos");
    allRepos.innerHTML = "";
    data.forEach((element) => {
        allRepos.innerHTML += `
        <a href="${element.html_url}" target="_blank">${element.name}</a>     
        <h3 id="repoStar">Star: ${element.stargazers_count}</h3>
        <h3 id="repoFork">Fork: ${element.forks}</h3>
        

        `;
        

    });
}

function oneSection(data) {
  const userNameAndAvatarContainer = document.getElementById(
    "userNameAndAvatarContainer"
  );
  userNameAndAvatarContainer.innerHTML = ` 
   <img id="avatarImage" src="${data.avatar_url}" alt="Avatar">
   <h1 id="userName">${data.name}</h1>
   <h3 id="realName">${data.login}</h3>
   <h3 id="location">${data.location}</h3>
   <h3 id="email">${data.email}</h3>
   <h3 id="biography">${data.bio}</h3>
   `;
}

function getSearchHistory(){
  const historyContainer = document.getElementById("historyContainer");
  const historyWords = JSON.parse(localStorage.getItem("searchWord"));

  historyContainer.innerHTML = `
  
  
  <ul>
  ${historyWords.map((word) => `<li>${word}</li>`).join("")}
  </ul>

  `;

}


deleteHistory.addEventListener("click", deleteLocalStorage);
