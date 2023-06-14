const BASE_URL = "https://api.themoviedb.org/3";
const APIKey = "api_key=6a5e08c4cc819892da3450490bd7028b";
const API_URL = BASE_URL + "/discover/movie?sort_by-popularity.desc&" + APIKey;

const navBar = document.querySelector(".navbar");
const btnMode = document.querySelector(".btn");
const logo = document.querySelector(".logo");
const content = document.querySelector(".content");
const form = document.querySelector("#form");
const inputText = document.querySelector("#form input");

btnMode.addEventListener("click", () => {
  navBar.classList.toggle("active");
  if (navBar.classList.contains("active")) {
    document.body.style.backgroundColor = "#000";
    logo.style.color = "#fff";
  } else {
    document.body.style.backgroundColor = "#fff";
    logo.style.color = "#000";
  }
});

function getMovies(url) {
  fetch(`${url}`)
    .then((response) => response.json())
    .then((data) => {
      //showData(data.results)

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        content.innerHTML = "";
        let value = inputText.value;
        const dataFiltred = data.results.filter((el) => {
          const vote = parseInt(el.vote_average);
          return vote === +value;
        });
        if (value) {
          showData(dataFiltred);
        } else {
          showData(data.results);
        }

        inputText.value = "";
      });
    })
    .catch((err) => console.log("err"));
}

getMovies(API_URL);

function showData(data) {
  data.forEach((movie) => {
    const { title, poster_path, vote_average } = movie;

    const element = document.createElement("div");
    element.className = "card";
    element.innerHTML = `
               <span class="vote">${vote_average}</span>
               <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
               <h3 class="title">${title}</h3>
            `;
    content.appendChild(element);
  });
}


